import os
import time
import shutil
from pathlib import Path

TEMP_DIR = Path(os.getenv("TEMP_DIR", "./tmp"))

ALLOWED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".bmp", ".gif", ".tiff", ".tif"}
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE_MB", 50)) * 1024 * 1024  # bytes


def ensure_temp_dir():
    """Create the temp directory if it doesn't exist."""
    TEMP_DIR.mkdir(parents=True, exist_ok=True)


def get_file_path(file_id: str, extension: str) -> Path:
    """Get the full path for a file given its ID and extension."""
    return TEMP_DIR / f"{file_id}{extension}"


def validate_file_extension(filename: str) -> bool:
    """Check if the file extension is in the allowed set."""
    ext = Path(filename).suffix.lower()
    return ext in ALLOWED_EXTENSIONS


def validate_file_size(size: int) -> bool:
    """Check if file size is within the limit."""
    return size <= MAX_FILE_SIZE


def cleanup_old_files(max_age_minutes: int = 60):
    """Remove temp files older than max_age_minutes."""
    if not TEMP_DIR.exists():
        return

    now = time.time()
    cutoff = now - (max_age_minutes * 60)

    for file_path in TEMP_DIR.iterdir():
        if file_path.is_file() and file_path.stat().st_mtime < cutoff:
            try:
                file_path.unlink()
            except OSError:
                pass
