import requests
from libs.utils.db.mongodb.src.db_config import (
    MONGODB_DATABASE_NAME,
    MONGODB_URI,
)
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import PyMongoError


def connect_db():
    try:
        client = AsyncIOMotorClient(MONGODB_URI)
        return client[MONGODB_DATABASE_NAME]
    except PyMongoError as error:
        raise Exception(
            f'Failed to connect to database: "{MONGODB_DATABASE_NAME}",'
            f"ERROR: {str(error)}"
        )


db = connect_db()


def check_db_connection():
    try:
        global db
        db.command("ismaster")
    except Exception:
        for _ in range(1, 4):
            try:
                _ = requests.get("https://www.google.com", timeout=5)
                return connect_db()
            except Exception as error:
                print(f"Retrying... No internet connection!!, Error: {error}")
        raise Exception("No internet connection!!")
