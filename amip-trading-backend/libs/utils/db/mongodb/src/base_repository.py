from datetime import datetime, timezone
from typing import Optional

from libs.utils.db.mongodb.src.connection import check_db_connection
from motor.motor_asyncio import AsyncIOMotorCollection, AsyncIOMotorCursor
from pymongo.results import (
    DeleteResult,
    InsertManyResult,
    InsertOneResult,
    UpdateResult,
)


class BaseRepository:
    def __init__(
        self, collection: AsyncIOMotorCollection, timestamps: bool = False
    ):
        self.collection = collection
        self.timestamps = timestamps

    @staticmethod
    def __check_db_connection():
        check_db_connection()

    async def __add_timestamps(self, doc: dict):
        """Adds createdAt and updatedAt timestamps"""
        if self.timestamps:
            current_time = datetime.now(timezone.utc)
            doc.update({"createdAt": current_time, "updatedAt": current_time})

    async def __update_timestamps(self, doc: dict, upsert: bool):
        """Updates timestamps before update operations"""
        if not self.timestamps:
            return

        current_time = datetime.now(timezone.utc)

        if "$set" in doc:
            doc["$set"].update({"updatedAt": current_time})
        else:
            doc["$set"] = {"updatedAt": current_time}

        if upsert:
            if "$setOnInsert" in doc:
                doc["$setOnInsert"].update({"createdAt": current_time})
            else:
                doc["$setOnInsert"] = {"createdAt": current_time}

    async def insert_one(self, doc: dict) -> InsertOneResult:
        """Inserts a single document asynchronously"""
        self.__check_db_connection()
        await self.__add_timestamps(doc)
        return await self.collection.insert_one(doc)

    async def insert_many(self, docs: list) -> InsertManyResult:
        """Inserts multiple documents asynchronously"""
        self.__check_db_connection()
        for doc in docs:
            await self.__add_timestamps(doc)
        return await self.collection.insert_many(docs)

    async def find_one(
        self, query: dict, projection: Optional[dict] = None
    ) -> Optional[dict]:
        """Finds a single document asynchronously"""
        if projection is None:
            projection = {}
        self.__check_db_connection()
        return await self.collection.find_one(query, projection)

    async def find(
        self,
        query: dict = None,
        projection: dict = None,
        limit: int = 0,
        sort_key: str = None,
        sort_type: int = None,
    ) -> AsyncIOMotorCursor:
        """Finds multiple documents asynchronously"""
        if query is None:
            query = {}
        if projection is None:
            projection = {}
        self.__check_db_connection()
        cursor = self.collection.find(query, projection).limit(limit)
        if sort_key and sort_type:
            cursor = cursor.sort(sort_key, sort_type)

        return cursor

    async def update_one(
        self, query: dict, update: dict, upsert: bool = False
    ) -> UpdateResult:
        """Updates a single document asynchronously"""
        await self.__update_timestamps(update, upsert)
        self.__check_db_connection()
        return await self.collection.update_one(query, update, upsert=upsert)

    async def update_many(
        self, query: dict, update: dict, upsert: bool = False
    ) -> UpdateResult:
        """Updates multiple documents asynchronously"""
        await self.__update_timestamps(update, upsert)
        self.__check_db_connection()
        return await self.collection.update_many(query, update, upsert=upsert)

    async def delete_one(self, query: dict) -> DeleteResult:
        """Deletes a single document asynchronously"""
        self.__check_db_connection()
        return await self.collection.delete_one(query)

    async def delete_many(self, query: dict) -> DeleteResult:
        """Deletes multiple documents asynchronously"""
        self.__check_db_connection()
        return await self.collection.delete_many(query)

    def aggregate(self, pipeline: list):
        """Aggregates documents asynchronously"""
        self.__check_db_connection()
        return self.collection.aggregate(pipeline)
