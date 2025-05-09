from apps.fastapiApp.auth.src.service import verify_api_key
from apps.fastapiApp.platform.modules.catalog.src.dto import (
    CrossSearchInputModel,
    SearchInputModel,
    SearchOutputModel,
)
from apps.fastapiApp.platform.modules.catalog.src.service import (
    cross_search_and_paginate_data,
    generate_new_user_id,
    search_and_paginate_data,
)
from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse
from libs.utils.common.custom_logger import CustomLogger
from slowapi.decorator import limiter

log = CustomLogger("CatalogRoute")

logger, listener = log.get_logger()
listener.start()

catalog_route = APIRouter(prefix="/catalog", tags=["Catalog Routes"],dependencies=[Depends(verify_api_key)])


@catalog_route.get("/")
async def index():
    logger.info("Catalog Route index path...")
    return JSONResponse(
        status_code=200,
        content={
            "message": "Catalog Route index path...",
            "success": True,
        },
    )


@catalog_route.get("/health-check")
async def health_check():
    logger.debug("Catalog Route health check path...")
    return JSONResponse(
        status_code=200,
        content={
            "message": "Catalog Route health check path...",
            "success": True,
        },
    )


@catalog_route.post("/generate-user-id")
@log.track
async def generate_user_id():
    try:
        logger.info("Generating new user id...")
        return JSONResponse(
            content={
                "success": True,
                "user_id": await generate_new_user_id(),
            },
            status_code=200,
        )
    except Exception as error:
        return JSONResponse(
            content={"success": False, "error": str(error)}, status_code=500
        )


@catalog_route.post("/search", response_model=SearchOutputModel)
@limiter.limit("10/minute")
@log.track
async def search_data(
    request: Request, request_data: SearchInputModel, page: int = 1, page_size: int = 10
):
    try:
        logger.info("Searching data...")
        results = await search_and_paginate_data(request_data, page, page_size)

        logger.debug(f"Search results: {results}")
        return JSONResponse(
            content={"success": True, "results": results},
            status_code=200,
        )
    except Exception as error:
        return JSONResponse(
            content={"success": False, "error": str(error)}, status_code=500
        )


@catalog_route.post("/cross-search")
@limiter.limit("10/minute")
@log.track
async def cross_search_data(
    request: Request,
    request_data: CrossSearchInputModel,
    page: int = 1,
    page_size: int = 10,
):
    try:
        return JSONResponse(
            content={
                "success": True,
                "user_id": await cross_search_and_paginate_data(
                    request_data, page, page_size
                ),
            },
            status_code=200,
        )
    except Exception as error:
        return JSONResponse(
            content={"success": False, "error": str(error)}, status_code=500
        )
