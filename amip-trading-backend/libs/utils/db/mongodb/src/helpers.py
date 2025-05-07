from bson import ObjectId
from libs.fastapiApp.platform.modules.catalog.src.enums import AvailableCatalogs
from libs.utils.db.mongodb.src.base_repository import BaseRepository
from libs.utils.db.mongodb.src.connection import db
from libs.utils.db.mongodb.src.db_config import MONGODB_USERS_COLLECTION_NAME

data_repository_hashmap ={}

def get_user_repository() -> BaseRepository:
    class Repository(BaseRepository):
        def __init__(self, collection):
            super().__init__(collection=collection, timestamps=True)

    return Repository(
        db[MONGODB_USERS_COLLECTION_NAME]
    )

def get_data_repository(catalog_name:AvailableCatalogs) -> BaseRepository:
    return data_repository_hashmap[catalog_name]


def initiate_data_repositories(
    catalog_name: AvailableCatalogs,
) -> None:
    global data_repository_hashmap

    class Repository(BaseRepository):
        def __init__(self, collection):
            super().__init__(collection=collection, timestamps=True)

    data_repository = Repository(
        db[f"{catalog_name.value.lower().replace(' ', '_')}_data"]
    )

    data_repository_hashmap[catalog_name] = data_repository

    return

def convert_object_id_to_string(obj: list) -> list:
    for item in obj:
        keys_to_delete = []

        for key, value in item.items():
            if isinstance(value, ObjectId):
                item[key] = str(value)
            # Mark keys to delete after loop to avoid mutation during iteration
            if key in ("createdAt", "updatedAt"):
                keys_to_delete.append(key)

        # Delete marked keys
        for key in keys_to_delete:
            del item[key]

    return obj
