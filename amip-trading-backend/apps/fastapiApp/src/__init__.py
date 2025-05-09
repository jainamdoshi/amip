import os
from pathlib import Path

import uvicorn
from apps.fastapiApp.auth.src import auth_route, middlewares
from apps.fastapiApp.platform.modules.catalog.src import catalog_route
from apps.fastapiApp.platform.modules.core.src import core_route
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from libs.utils.common.custom_logger import CustomLogger, LogType
from libs.utils.common.custom_logger.constants import Colors
from libs.utils.common.custom_logger.helper import color_string

load_dotenv()

log = CustomLogger("Amip Trading Backend App", queue_logger=False, is_request=False)
logger = log.get_logger()

amip_trading_backend_app = FastAPI(
    title="Application: Amip Trading Backend App",
    version="0.3.1",
    docs_url="/docs",
    redoc_url="/redoc",
    middleware=middlewares,
)


amip_trading_backend_app.include_router(core_route)
amip_trading_backend_app.include_router(catalog_route)
amip_trading_backend_app.include_router(auth_route)


def start_server(
    host: str,
    port: int,
    reload: bool = True,
    workers: int = 8,
    threads: int = 10,
    environment: str = "development"
):
    if environment == "development":
        logger.info(
            color_string(
                f"Starting server on http://{host}:{port} with "
                f"{workers} workers, environment: {environment}, "
                f"reload: {reload}.",
                Colors.BOLD_RED,
            ),
            extra={"logType": LogType.STARTUP.value},
        )
        uvicorn.run(
            "apps.fastapiApp.src:amip_trading_backend_app",
            host=host,
            port=port,
            reload=reload,
            log_level="error",
            workers=workers,
        )
    elif environment == "production":
        logger.info(
            color_string(
                f"Deploying server on http://{host}:{port} with "
                f"{workers} workers, {threads} threads",
                Colors.BOLD_RED,
            ),
            extra={"logType": LogType.STARTUP.value},
        )
        os.environ["PYTHONPATH"] = str(Path(__file__).resolve().parent.parent.parent.parent)
        os.system(
            f"PYTHONPATH={os.environ['PYTHONPATH']} gunicorn "
            f"-w {workers} "
            f"--threads {threads} "
            f"-k uvicorn.workers.UvicornWorker "
            f"-b {host}:{port} apps.fastapiApp.src:amip_trading_backend_app"
        )
    else:
        raise ValueError(f"Invalid environment: {environment}, check env file!")
