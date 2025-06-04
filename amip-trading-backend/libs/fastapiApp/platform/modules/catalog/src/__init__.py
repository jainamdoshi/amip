from contextlib import asynccontextmanager

from fastapi import FastAPI
from libs.fastapiApp.catalogs.jinku.src import initiate_jinku_catalog


@asynccontextmanager
async def initiate_catalogs(app:FastAPI):
    initiate_jinku_catalog()
    yield
