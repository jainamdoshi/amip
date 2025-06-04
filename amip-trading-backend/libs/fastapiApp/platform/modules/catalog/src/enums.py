from enum import Enum


class SupportedLanguages(Enum):
    ENGLISH = "English"


class Repositories(Enum):
    USERS = "users_repository"
    DATA = "data_repository"


class AvailableCatalogs(Enum):
    JINKU_CATALOG = "JINKU_CATALOG"
