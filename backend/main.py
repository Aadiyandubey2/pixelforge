import os
import asyncio
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from routers.convert import router as convert_router
from utils.file_handler import cleanup_old_files, ensure_temp_dir


async def periodic_cleanup():
    """Background task that cleans up old temp files periodically."""
    interval = int(os.getenv("CLEANUP_INTERVAL_MINUTES", 60))
    while True:
        await asyncio.sleep(interval * 60)
        cleanup_old_files(max_age_minutes=interval)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown lifecycle."""
    ensure_temp_dir()
    task = asyncio.create_task(periodic_cleanup())
    yield
    task.cancel()


app = FastAPI(
    title="PixelForge API",
    description="Premium image conversion API — WebP & AVIF",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(convert_router)


@app.get("/")
async def root():
    return {"message": "PixelForge API is running", "version": "1.0.0"}
