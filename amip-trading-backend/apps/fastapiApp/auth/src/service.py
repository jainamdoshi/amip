import asyncio
import base64
import secrets
from datetime import datetime
from typing import Optional

from apps.fastapiApp.auth.src.auth_config import (
    API_KEY_LENGTH,
    AUTH_PASSWORD,
    AUTH_USERNAME,
)
from apps.fastapiApp.auth.src.dto import APIKeyDoc
from dotenv import load_dotenv
from fastapi import HTTPException, Security
from fastapi.security import APIKeyHeader
from libs.utils.common.custom_logger import CustomLogger
from libs.utils.db.mongodb.src import db_operations
from starlette_context import context

log = CustomLogger("AuthService")
logger, listener = log.get_logger()
listener.start()

load_dotenv()


async def verify_credentials(authorization: str) -> bool:
    _, encoded = authorization.split(" ", 1)
    decoded = base64.b64decode(encoded).decode("ascii")
    request_auth_username, request_auth_password = decoded.split(":", 1)

    if request_auth_username == AUTH_USERNAME and request_auth_password == AUTH_PASSWORD:
        logger.info("Credentials verified")
        return True
    else:
        logger.error("Invalid credentials")
        return False

async def generate_api_key() -> APIKeyDoc:
    """Generate a new API key for the user"""
    api_key = secrets.token_urlsafe(int(API_KEY_LENGTH))
    api_key_doc = APIKeyDoc(api_key=api_key)

    asyncio.create_task(
        db_operations.save_api_key_in_db(
            request_id=context.get("X-Request-ID"),
            api_key=api_key,
            expires_at=api_key_doc.expires_at,
        )
    )

    return api_key_doc

async def get_api_key(api_key: str) -> Optional[APIKeyDoc]:
    """Retrieve API key details from database"""
    api_key_doc = await db_operations.get_api_key_from_db(api_key)

    if not api_key_doc:
        return None

    return APIKeyDoc(**api_key_doc)

async def validate_api_key(api_key: str) -> bool:
    """Validate if API key is valid and not expired"""
    api_key_doc = await get_api_key(api_key)

    if not api_key_doc:
        return False

    if not api_key_doc.is_active:
        return False

    if api_key_doc.expires_at < datetime.utcnow():
        return False

    return True

async def expire_api_key(api_key: str) -> bool:
    """Explicitly expire an API key"""
    return await db_operations.expire_api_key_in_db(api_key)


api_key_header = APIKeyHeader(name="X-API-KEY", auto_error=False)

async def verify_api_key(api_key: str = Security(api_key_header)):
    """Dependency to verify API key in protected routes"""
    if not api_key:
        raise HTTPException(
            status_code=401,
            detail="API key is required"
        )

    if not await validate_api_key(api_key):
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired API key"
        )

    return api_key
