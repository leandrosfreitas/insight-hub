from fastapi import FastAPI

from app.core.config import settings
from app.api.v1.health import router as health_router

app = FastAPI(
    title=settings.app_name,
    version=settings.api_version,
    docs_url="/docs",
    redoc_url="/redoc",
)

app.include_router(
    health_router,
    prefix="/api/v1"
)
