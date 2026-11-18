from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from config import get_settings
from database import engine, Base
import models  # noqa: F401 - register models

settings = get_settings()

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FOUND API",
    description="AI-powered Indian matrimonial platform API",
    version="0.1.0",
    docs_url="/docs" if settings.is_dev else None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"service": "FOUND API", "version": "0.1.0", "status": "running"}


@app.get("/health")
def health():
    return {"status": "healthy"}


from routes import auth, onboarding, firebase

app.include_router(auth.router)
app.include_router(onboarding.router)
app.include_router(firebase.router)


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )
