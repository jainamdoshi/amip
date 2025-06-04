from datetime import datetime, timedelta

from apps.fastapiApp.auth.src.auth_config import AUTH_API_KEY_EXPIRATION_DAYS
from pydantic import BaseModel, Field, model_validator


class APIKeyInputModel(BaseModel):
    username: str
    password: str

class APIKeyOutputModel(BaseModel):
    success: bool
    api_key: str
    expires_at: datetime

    @model_validator(mode="after")
    def convert_datetime_to_string(self):
        self.expires_at = self.expires_at.strftime("%Y-%m-%d %H:%M:%S")
        return self

class APIKeyDoc(BaseModel):
    api_key: str
    expires_at: datetime = Field(default_factory=lambda: datetime.utcnow() + timedelta(days=int(AUTH_API_KEY_EXPIRATION_DAYS)))
    is_active: bool = True
