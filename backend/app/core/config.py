from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "InsightHub API"
    api_version: str = "v1"
    SECRET_KEY: str = "CHANGE_ME"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    class Config:
        env_file = ".env"

settings = Settings()
