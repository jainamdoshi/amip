from fastapi import APIRouter
from fastapi.responses import JSONResponse
from libs.utils.common.custom_logger import CustomLogger

log = CustomLogger("BackendCoreRoute")

logger, listener = log.get_logger()
listener.start()

core_route = APIRouter(tags=["Core Routes"])


@core_route.get("/")
def root():
    logger.info("Backend app root endpoint accessed")
    return JSONResponse(
        status_code=200,
        content={"success": True, "message": "Server is up and running 🚀🚀🚀"},
    )
