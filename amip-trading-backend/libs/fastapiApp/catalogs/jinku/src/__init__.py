from libs.utils.common.custom_logger import (
    Colors,
    CustomLogger,
    LogType,
    color_string,
)
from libs.utils.common.enums import AvailableCatalogs
from libs.utils.db.mongodb.src.helpers import initiate_data_repositories

log = CustomLogger(
    "JinkuCatalog",
    queue_logger=False,
    is_request=False
)
logger = log.get_logger()


def initiate_jinku_catalog():
    catalog_name = AvailableCatalogs.JINKU_CATALOG

    initiate_data_repositories(catalog_name=catalog_name)

    logger.info(
        f"Successfully initiated "
        f"{color_string(catalog_name.value, Colors.BRIGHT_GREEN)} "
        f"catalog.", extra={"logType": LogType.STARTUP.value}
    )
