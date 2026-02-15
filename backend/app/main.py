from fastapi import FastAPI

from app.core.config import settings
from app.api.v1.health import router as health_router
from app.api.v1.users import router as users_router
from app.api.v1.indicators import router as indicators_router
from app.api.v1.datapoints import router as datapoints_router
from app.api.v1.indicators_sync import router as indicators_sync_router

app = FastAPI(
    title=settings.app_name,
    version=settings.api_version,
    docs_url="/docs",
    redoc_url="/redoc",
)

app.include_router(health_router, prefix="/api/v1")
app.include_router(users_router, prefix="/api/v1")
app.include_router(indicators_router, prefix="/api/v1")
app.include_router(datapoints_router, prefix="/api/v1")
app.include_router(indicators_sync_router, prefix="/api/v1")
