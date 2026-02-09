from pydantic import BaseModel

class Settings(BaseModel):
    app_name: str = "InsightHub API"
    api_version: str = "v1"

settings = Settings()
