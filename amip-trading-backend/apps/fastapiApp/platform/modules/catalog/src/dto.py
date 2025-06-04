from libs.utils.common.custom_logger import CustomLogger
from libs.utils.common.enums import AvailableCatalogs
from pydantic import BaseModel, Field, model_validator

log = CustomLogger("CatalogDTO")

logger, listener = log.get_logger()
listener.start()

# class GenerateUserIDInputModel(BaseModel):

class ProductInputModel(BaseModel):
    user_id:str
    catalog_name: AvailableCatalogs | None = AvailableCatalogs.JINKU_CATALOG

class SearchInputModel(BaseModel):
    user_id: str
    catalog_name: AvailableCatalogs | None = AvailableCatalogs.JINKU_CATALOG
    product_name: str | None = None
    product_number: str | None = None


@model_validator(mode="after")
def validate_catalog_name(self):
    if self.product_name is None and self.product_number is None:
        logger.error("Neither product_name nor product_number is provided")
        raise ValueError("Either product_name or product_number must be provided")


class CrossSearchInputModel(BaseModel):
    user_id: str
    catalog_name: AvailableCatalogs | None = AvailableCatalogs.JINKU_CATALOG
    product_mid: str


class Product(BaseModel):
    product_name: str
    product_number: str = Field(alias="Number")
    product_description: str
    jinku_product_id: str
    owner: str = Field(alias="Owner")
    specifications: list[str]
    product_image: str


class PaginatedProducts(BaseModel):
    total: int
    page: int
    page_size: int
    total_pages: int
    products: list[Product]


class SearchOutputModel(BaseModel):
    success: bool
    results: PaginatedProducts
