import os

from dotenv import load_dotenv

load_dotenv()

API_KEY_LENGTH = os.getenv("API_KEY_LENGTH")
AUTH_USERNAME = os.getenv("AUTH_USERNAME")
AUTH_PASSWORD = os.getenv("AUTH_PASSWORD")

AUTH_API_KEY_EXPIRATION_DAYS = os.getenv("AUTH_API_KEY_EXPIRATION_DAYS")
