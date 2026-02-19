from fastapi import FastAPI

from app.core.config import settings

from app.api.v1.health import router as health_router
from app.api.v1.users import router as users_router
from app.api.v1.indicators import router as indicators_router
from app.api.v1.datapoints import router as datapoints_router
from app.api.v1.indicators_sync import router as indicators_sync_router
from app.api.v1.auth import router as auth_router

from app.middlewares.request_id import RequestIDMiddleware
from app.middlewares.logging import LoggingMiddleware
from app.middlewares.exception_handler import global_exception_handler

from app.core.logging import setup_logging

app = FastAPI(
    title=settings.app_name,
    version=settings.api_version,
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(RequestIDMiddleware)
app.add_middleware(LoggingMiddleware)

app.add_exception_handler(Exception, global_exception_handler)

setup_logging()

app.include_router(health_router, prefix="/api/v1")
app.include_router(users_router, prefix="/api/v1")
app.include_router(indicators_router, prefix="/api/v1")
app.include_router(datapoints_router, prefix="/api/v1")
app.include_router(indicators_sync_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1")
