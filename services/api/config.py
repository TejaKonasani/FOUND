from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:////opt/sandbox/workspace/FOUND/services/api/found.db"
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080
    APP_ENV: str = "development"
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    AI_MODEL: str = "qwen2.5:0.5b"

    # Firebase configuration
    FIREBASE_PROJECT_ID: str = "found-d8728"
    FIREBASE_SERVICE_ACCOUNT_PATH: str = ""  # Path to service account JSON (production)

    @property
    def is_dev(self) -> bool:
        return self.APP_ENV == "development"

    class Config:
        env_file = ".env"
        extra = "ignore"


@lru_cache
def get_settings() -> Settings:
    return Settings()
