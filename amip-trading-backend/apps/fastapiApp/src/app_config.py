import os

from dotenv import load_dotenv

load_dotenv()

FASTAPI_APP_ENVIRONMENT = os.getenv("FASTAPI_APP_ENVIRONMENT", "development")

FASTAPI_APP_HOST = os.getenv("FASTAPI_APP_HOST", "0.0.0.0")
FASTAPI_APP_PORT = int(os.getenv("FASTAPI_APP_PORT", 5000))

FASTAPI_APP_WORKERS = int(os.getenv("FASTAPI_APP_WORKERS", 2))
FASTAPI_APP_THREADS = int(os.getenv("FASTAPI_APP_THREADS", 2))
