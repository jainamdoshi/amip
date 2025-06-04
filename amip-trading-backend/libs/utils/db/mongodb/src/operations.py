from datetime import datetime

from bson import ObjectId
from libs.utils.common.custom_logger import CustomLogger
from libs.utils.common.enums import AvailableCatalogs
from libs.utils.common.regex_helper import build_regex_query
from libs.utils.db.mongodb.src.helpers import (
    convert_object_id_to_string,
    get_auth_repository,
    get_data_repository,
    get_user_repository,
)


class DbOperations:
    log = CustomLogger("AnalyticsOperations")
    logger, listener = log.get_logger()
    listener.start()


    @classmethod
    async def save_api_key_in_db(
        cls,
        request_id: str,
        api_key: str,
        expires_at: datetime,
    ):
        try:
            auth_repository = get_auth_repository()
            await auth_repository.insert_one(
                {
                    "api_key": api_key,
                    "expires_at": expires_at,
                    "is_active": True,
                }
            )
        except Exception as error:
            cls.logger.warning(f"Error while saving api_key to db, {error}")

    @classmethod
    async def get_api_key_from_db(
        cls,
        api_key: str,
    ):
        try:
            auth_repository = get_auth_repository()
            return await auth_repository.find_one({"api_key": api_key})
        except Exception as error:
            cls.logger.warning(f"Error while getting api_key from db, {error}")
            return None

    @classmethod
    async def expire_api_key_in_db(
        cls,
        api_key: str,
    ):
        try:
            auth_repository = get_auth_repository()
            result = await auth_repository.update_one({"api_key": api_key}, {"$set": {"is_active": False}})
            return result.modified_count > 0
        except Exception as error:
            cls.logger.warning(f"Error while expiring api_key in db, {error}")
            return False

    @classmethod
    async def save_user_id_in_db(
        cls,
        request_id: str,
        success: bool,
        user_id: str,
        error=None,
    ):
        try:
            users_repository = get_user_repository()
            await users_repository.insert_one(
                {
                    "requestId": request_id,
                    "userId": user_id,
                    "success": success,
                    "error": error,
                }
            )
        except Exception as error:
            cls.logger.warning(f"Error while storing user_id to db, {error}")

    @classmethod
    async def insert_user_id_if_not_exists_in_db(
        cls,
        request_id: str,
        user_id: str,
    ):
        try:
            users_repository = get_user_repository()
            user_doc = await users_repository.find_one({"userId": user_id})
            if user_doc is None:
                cls.logger.info(
                    f"User_id: {user_id} not found in db, inserting it..."
                )
                await cls.save_user_id_in_db(
                    request_id=request_id,
                    user_id=user_id,
                    success=True,
                    error=None,
                )
            return True
        except Exception as error:
            cls.logger.warning(
                f"Error while inserting non-existing user_id in db, {error}."
            )
            return False

    @classmethod
    async def search_products_data_in_db(
            cls,
            catalog_name: AvailableCatalogs,
    ):
        try:
            cls.logger.debug(f"Searching data in db for {catalog_name}...")
            data_repository = get_data_repository(catalog_name)

            pipeline = [
                {
                    "$group": {
                        "_id": "$product_name"
                    }
                },
                {
                    "$project": {
                        "_id": 1,
                        "product_name": "$_id"
                    }
                }
            ]

            cursor = data_repository.aggregate(pipeline)
            cls.logger.info("Received the distinct products data")

            data_docs = [doc["product_name"] async for doc in cursor]
            return data_docs

        except Exception as error:
            cls.logger.error(f"Error while searching data in db, {error}.")
            return None

    @classmethod
    async def search_data_in_db(
        cls,
        catalog_name: AvailableCatalogs,
        product_name: str | None = None,
        product_number: str | None = None,
        page:int = 1,
        page_size:int = 10

    ):
        try:
            cls.logger.debug(f"Searching data in db for {catalog_name}...")
            data_repository = get_data_repository(catalog_name)

            cls.logger.debug(f"Searching for data with product_name: {product_name} and product_number: {product_number}")

            query={}
            if product_name:
                regex_query = build_regex_query(product_name)
                cls.logger.debug(f"Built the regex query for {product_name} - {regex_query}")
                query["product_name"] = regex_query

            elif product_number:
                query["Number"] = product_number

            else:
                cls.logger.warning("Neither product_name nor product_number is provided")
                raise ValueError("Either product_name or product_number must be provided")

            skip = (page - 1) * page_size

            cls.logger.debug(f"Skipping {skip} documents....")
            # Get total count in parallel
            count_task = data_repository.count_documents(query)
            cursor = (await data_repository.find(
                query,
                {"_id": 1,"product_image":1, "product_name": 1, "Number": 1, "Owner":1, "specifications":1 }
            )).skip(skip).limit(page_size)

            data_docs = [doc async for doc in cursor]
            total = await count_task
            return convert_object_id_to_string(data_docs),total

        except Exception as error:
            cls.logger.error(f"Error while searching data in db, {error}.")
            return None

    @classmethod
    async def cross_search_data_in_db(
        cls,
        catalog_name: AvailableCatalogs,
        product_mid: str,
        page: int = 1,
        page_size: int = 10,
    ):
        try:
            cls.logger.debug(f"Searching data in db for {catalog_name}...")
            data_repository = get_data_repository(catalog_name)

            cls.logger.debug(f"Searching for data with product_mid: {product_mid}")
            data_doc = await data_repository.find_one({"_id": ObjectId(product_mid)})

            if not data_doc:
                cls.logger.warning(f"No data found for product_mid: {product_mid}")
                return None

            jinku_product_id = data_doc.get("jinku_product_id")
            if not jinku_product_id:
                cls.logger.warning(f"No jinku_product_id found in document for _id: {product_mid}")
                return None

            query = {"jinku_product_id": jinku_product_id}
            skip = (page - 1) * page_size

            count_task = data_repository.count_documents(query)
            cursor = (await data_repository.find(
                query,
                {"_id": 0, "product_name": 1, "Number": 1, "jinku_product_id": 1, "specifications":1, "product_image":1,"Owner":1,}
            )).skip(skip).limit(page_size)

            data_docs = [doc async for doc in cursor]
            total = await count_task

            return convert_object_id_to_string(data_docs), total

        except Exception as error:
            cls.logger.error(f"Error while searching data in db, {error}.")
            return None


db_operations = DbOperations()
