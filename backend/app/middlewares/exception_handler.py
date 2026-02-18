from fastapi import Request
from fastapi.responses import JSONResponse
import logging

logger = logging.getLogger("app.exceptions")

async def global_exception_handler(request: Request, exc: Exception):
    logger.exception(
        "unhandled_exception",
        extra={
            "path": request.url.path,
            "request_id": getattr(request.state, "request_id", None)
        }
    )

    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )
