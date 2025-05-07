import json
import os
from datetime import datetime
from enum import Enum
from json import dumps
from os import getcwd, path

from libs.utils.common.custom_logger.constants import Colors
from libs.utils.common.custom_logger.enums import LogType
from libs.utils.common.date_time import (
    convert_ms_to_readable_format,
    get_execution_time_in_seconds,
)
from pydantic import BaseModel
from starlette.requests import Request
from starlette.responses import JSONResponse, Response
from starlette.routing import Match


def color_string(message, color: Colors = Colors.CYAN):
    return f"{color.value}{str(message)}{Colors.RESET.value}"


def extra_details_for_req(
    inspect,
    cls_name,
    request: Request = None,
    request_body=None,
    response: Response = None,
    response_body=None,
    start_time: datetime = None
):
    frame = inspect.currentframe().f_back
    frame_info = inspect.getframeinfo(frame)

    extra = {
        "fileName": frame_info.filename.split("/")[-1],
        "filePath": path.relpath(frame_info.filename, getcwd()),
        "line": frame_info.lineno,
        "column": frame_info.positions.col_offset,
        "functionName": frame_info.function,
        "className": cls_name,
        "qualname": f"{cls_name}.{frame_info.function}",
    }
    if request:
        routes = request.app.router.routes
        path_params = dict()
        query_params = dict()
        for route in routes:
            match, scope = route.matches(request)
            if match == Match.FULL:
                path_params = scope.get("path_params")
                query_params = scope.get("query_params")

        args = request_body.copy()
        if "user_id" in args:
            args.pop("user_id")

        req_data = {
            "logType": LogType.REQUEST_INIT.value,
            "extraDetails": f"'{request.method} {request.url.path}', {args}",
            "request": {
                "method": request.method,
                "path": request.url.path,
                "headers": dict(request.headers),
                "body": dict(request_body),
                "params": path_params,
                "query": query_params,
                "calleeDetails": {
                    "host": request.client.host,
                    "port": request.client.port,
                },
            },
        }
        extra.update(req_data)

    if response:
        execution_time_ms = get_execution_time_in_seconds(start_time) * 1000
        execution_time = color_string(
            f"({convert_ms_to_readable_format(execution_time_ms)})",
            Colors.BOLD_GOLD,
        )
        res_data = {
            "logType": LogType.REQUEST_END.value,
            "extraDetails": f"{response.status_code} {execution_time}",
            "response": {
                "statusCode": response.status_code,
                "headers": dict(response.headers),
                "body": response_body,
                "executionTimeMs": execution_time_ms,
                "executionTime": execution_time,
            },
        }
        extra.update(res_data)

    return extra


def get_serialized_args(args: any):
    try:
        if isinstance(args, dict):
            return {
                key: (
                    {
                        k: v.value
                        for k, v in value.model_dump().items()
                        if isinstance(v, Enum)
                    }
                    if isinstance(value, BaseModel)
                    else value
                )
                for key, value in args.items()
                if key not in {"user_id"}
            }
        elif isinstance(args, list):
            return dumps(args)
    except Exception as e:
        print(f"Error while serializing args: {e}")
        return str(args)


def get_serialized_kwargs(kwargs: any):
    def remove_sensitive_keys(data):
        if isinstance(data, dict):
            return {
                key: remove_sensitive_keys(value)
                for key, value in data.items()
                if key not in {"user_id"}
            }
        return data

    try:
        if isinstance(kwargs, dict):
            return {
                key: (
                    value.model_dump()
                    if isinstance(value, BaseModel)
                    else remove_sensitive_keys(value)
                )
                for key, value in kwargs.items()
                if key not in ["user_id"]
            }
        elif isinstance(kwargs, list):
            return dumps(kwargs)
    except Exception as e:
        print(f"Error while serializing kwargs: {e}")
        return str(kwargs)


def get_serialized_result(result: any):
    if isinstance(result, dict) or isinstance(result, list):
        # Log as it is if it is a dict or list
        return dumps(result)
    elif isinstance(result, JSONResponse):
        # Log the body decoded to a string
        return result.body.decode("utf-8")
    else:
        return str(result)


def serialize_value(value):
    """Helper function to serialize a value for logging."""
    if isinstance(value, Enum):
        return value.value
    if isinstance(value, BaseModel):
        # Serialize BaseModel by converting Enum fields to their values
        return {
            k: (v.value if isinstance(v, Enum) else v)
            for k, v in value.model_dump().items()
        }
    if hasattr(value, "dict"):
        return value.dict()
    if isinstance(value, dict):
        return {
            k: (v.value if isinstance(v, Enum) else v) for k, v in value.items()
        }
    try:
        dumps({value})
        return value
    except TypeError:
        return str(value)


def serialize_args_kwargs(args, kwargs, params):
    """Serialize function arguments and keyword arguments."""
    args_dict = {
        param: serialize_value(arg)
        for param, arg in zip(params, args)
        if param != "self" and param != "cls"
    }
    kwargs_dict = {key: serialize_value(value) for key, value in kwargs.items()}
    return args_dict, kwargs_dict


def get_callee_class_name(inspect):
    return (
        inspect.stack()[1][0].f_locals["self"].__class__.__name__
        if "self" in inspect.stack()[1][0].f_locals
        else None
    )


def get_frame_info(inspect):
    return inspect.getframeinfo(inspect.currentframe().f_back.f_back)


def convert_logfile_to_json(log_file_path: str):
    with open(log_file_path, "r") as file:
        log_data = file.readlines()

    json_data = [json.loads(line) for line in log_data if line.strip()]

    keys_to_remove = [
        "msg",
        "args",
        "pathname",
        "filename",
        "levelno",
        "levelname",
        "module",
        "exc_info",
        "exc_text",
        "stack_info",
        "lineno",
        "funcName",
        "created",
        "msecs",
        "relativeCreated",
        "thread",
        "threadName",
        "processName",
        "process",
        "taskName",
    ]

    for log in json_data:
        for key in keys_to_remove:
            if key in log:
                del log[key]

    output_json_path = os.path.splitext(log_file_path)[0] + ".json"

    with open(output_json_path, "w") as json_file:
        json.dump(json_data, json_file, indent=4)

    return json_data


if __name__ == "__main__":
    convert_logfile_to_json("logs/TOURISM_ASSISTANT.log.1")
