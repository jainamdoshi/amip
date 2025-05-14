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
    async def search_data_in_db(
        cls,
        catalog_name: AvailableCatalogs,
        product_name: str | None = None,
        product_number: str | None = None
    ):
        try:
            cls.logger.debug(f"Searching data in db for {catalog_name}...")
            data_repository = get_data_repository(catalog_name)

            cls.logger.debug(f"Searching for data with product_name: {product_name} and product_number: {product_number}")

            if product_name:
                regex_query = build_regex_query(product_name)
                cursor = await data_repository.find({"product_name": regex_query})

            elif product_number:
                cursor = await data_repository.find({"Number": product_number})

            else:
                cls.logger.warning("Neither product_name nor product_number is provided")
                raise ValueError("Either product_name or product_number must be provided")

            data_docs = [doc async for doc in cursor]
            return convert_object_id_to_string(data_docs)

        except Exception as error:
            cls.logger.error(f"Error while searching data in db, {error}.")
            return None

    @classmethod
    async def cross_search_data_in_db(
        cls,
        catalog_name: AvailableCatalogs,
        product_mid: str,
    ):
        try:
            cls.logger.debug(f"Searching data in db for {catalog_name}...")
            data_repository = get_data_repository(catalog_name)

            cls.logger.debug(f"Searching for data with product_mid: {product_mid}")
            data_doc = await data_repository.find_one({"_id": ObjectId(product_mid)})

            if data_doc:
                jinku_product_id = data_doc.get("jinku_product_id")
                cursor = await data_repository.find({"jinku_product_id": jinku_product_id})
                data_docs = [doc async for doc in cursor]
                return convert_object_id_to_string(data_docs)
            else:
                cls.logger.warning(f"No data found for product_mid: {product_mid}")
                return None

        except Exception as error:
            cls.logger.error(f"Error while searching data in db, {error}.")
            return None


db_operations = DbOperations()
