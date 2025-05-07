import asyncio
from uuid import uuid4

from apps.fastapiApp.platform.modules.catalog.src.dto import (
    CrossSearchInputModel,
    SearchInputModel,
)
from libs.utils.common.custom_logger import CustomLogger
from libs.utils.common.pagination_helpers import get_page_params
from libs.utils.db.mongodb.src import db_operations
from starlette_context import context

log = CustomLogger("AppCatalogService")


@log.track
async def generate_new_user_id():
    user_id = str(uuid4())

    # Save user data in db in a separate thread
    asyncio.create_task(
        db_operations.save_user_id_in_db(
            request_id=context.get("X-Request-ID"),
            success=True,
            user_id=user_id,
            error=None,
        )
    )

    return user_id


@log.track
async def search_and_paginate_data(
    request_data: SearchInputModel, page: int, page_size: int
):
    catalog_data = await db_operations.search_data_in_db(
        catalog_name=request_data.catalog_name,
        product_name=request_data.product_name,
        product_number=request_data.product_number,
    )
    if catalog_data is None:
        return {
            "total": 0,
            "page": page,
            "page_size": page_size,
            "total_pages": 0,
            "products": [],
        }

    total = len(catalog_data)
    total_pages, start, end = get_page_params(total, page, page_size)

    # Slice the catalog data to get paginated result
    paginated_data = catalog_data[start:end]

    # Prepare response
    return {
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": total_pages,
        "products": paginated_data,
    }


@log.track
async def cross_search_and_paginate_data(
    request_data: CrossSearchInputModel, page: int, page_size: int
):
    catalog_data = await db_operations.cross_search_data_in_db(
        catalog_name=request_data.catalog_name, product_mid=request_data.product_mid
    )
    if catalog_data is None:
        return {
            "total": 0,
            "page": page,
            "page_size": page_size,
            "total_pages": 0,
            "products": [],
        }
    total = len(catalog_data)
    total_pages, start, end = get_page_params(total, page, page_size)
    paginated_data = catalog_data[start:end]

    return {
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": total_pages,
        "products": paginated_data,
    }
