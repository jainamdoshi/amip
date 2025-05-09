
from apps.fastapiApp.auth.src.dto import APIKeyOutputModel
from apps.fastapiApp.auth.src.service import (
    expire_api_key,
    generate_api_key,
    validate_api_key,
    verify_credentials,
)
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from libs.utils.common.custom_logger import CustomLogger

log = CustomLogger("AuthRoute")
logger, listener = log.get_logger()
listener.start()

auth_route = APIRouter(prefix="/auth", tags=["Auth Routes"])

security = HTTPBearer()

@auth_route.post("/api-key",response_model=APIKeyOutputModel)
async def create_api_key(request:Request,credentials:HTTPAuthorizationCredentials = Depends(security)):
    """Generate a new API key with 90 days validity"""
    authorization = credentials.credentials
    print("authorization", authorization)

    if not authorization or not authorization.startswith("Basic"):
        logger.error("Invalid or missing Authorization header")
        raise HTTPException(
            status_code=401,
            detail="Invalid or missing Authorization header"
        )

    if not await verify_credentials(authorization):
        logger.error("Invalid credentials")
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    api_key_doc = await generate_api_key()
    logger.info(f"API key generated: {api_key_doc.api_key}")

    api_key_doc=APIKeyOutputModel(
        success=True,
        api_key=api_key_doc.api_key,
        expires_at=api_key_doc.expires_at
    )
    return JSONResponse(
        status_code=200,
        content=api_key_doc.model_dump()
    )


@auth_route.post("/api-key/expire/{api_key}")
async def expire_key(api_key: str):
    """Explicitly expire an API key"""
    if not await validate_api_key(api_key):
        logger.error("API key not found or already expired")
        raise HTTPException(
            status_code=404,
            detail="API key not found or already expired"
        )

    success = await expire_api_key(api_key)

    if not success:
        logger.error("API key not found or already expired")
        raise HTTPException(
            status_code=500,
            detail="Failed to expire API key"
        )

    logger.info(f"API key expired: {api_key}")
    return JSONResponse(
        status_code=200,
        content={
            "success": True,
            "message": "API key expired successfully"
        }
    )
