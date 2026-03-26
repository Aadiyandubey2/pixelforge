import uuid
from pathlib import Path
from PIL import Image

# Register AVIF support
try:
    import pillow_avif  # noqa: F401
except ImportError:
    pass

from utils.file_handler import get_file_path, ensure_temp_dir


SUPPORTED_FORMATS = {"webp", "avif"}


def convert_image(
    input_path: Path,
    original_filename: str,
    target_format: str,
    quality: int = 80,
) -> dict:
    """
    Convert a single image to the target format.

    Args:
        input_path: Path to the uploaded original image on disk.
        original_filename: The original filename from the client.
        target_format: 'webp' or 'avif'.
        quality: Compression quality 1-100.

    Returns:
        dict with id, original_name, converted_name, original_size,
        converted_size, and the output_path.
    """
    if target_format.lower() not in SUPPORTED_FORMATS:
        raise ValueError(f"Unsupported format: {target_format}")

    ensure_temp_dir()

    file_id = str(uuid.uuid4())
    ext = f".{target_format.lower()}"
    output_path = get_file_path(file_id, ext)

    original_size = input_path.stat().st_size

    # Open and convert
    with Image.open(input_path) as img:
        # Convert RGBA to RGB for formats that don't support alpha well
        if img.mode in ("RGBA", "LA", "P"):
            if target_format.lower() == "webp":
                # WebP supports alpha natively
                pass
            else:
                # AVIF supports alpha but some encoders struggle
                pass

        save_kwargs = {"quality": quality}

        if target_format.lower() == "webp":
            save_kwargs["method"] = 4  # balanced speed/compression
            img.save(str(output_path), "WEBP", **save_kwargs)
        elif target_format.lower() == "avif":
            save_kwargs["speed"] = 6  # faster encoding
            img.save(str(output_path), "AVIF", **save_kwargs)

    converted_size = output_path.stat().st_size
    stem = Path(original_filename).stem

    return {
        "id": file_id,
        "original_name": original_filename,
        "converted_name": f"{stem}{ext}",
        "original_size": original_size,
        "converted_size": converted_size,
        "output_path": output_path,
    }
