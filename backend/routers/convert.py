import uuid
import shutil
from pathlib import Path
from typing import List

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse, StreamingResponse

from models.schemas import ConvertResponse, ConvertedFileResult, DownloadAllRequest
from services.converter import convert_image
from utils.file_handler import (
    ensure_temp_dir,
    validate_file_extension,
    validate_file_size,
    get_file_path,
    TEMP_DIR,
)
from utils.zip_handler import create_zip_archive

router = APIRouter(prefix="/api", tags=["convert"])

# In-memory registry of converted files: { file_id: { metadata } }
_file_registry: dict = {}


@router.post("/convert", response_model=ConvertResponse)
async def convert_files(
    files: List[UploadFile] = File(...),
    format: str = Form("webp"),
    quality: int = Form(80),
):
    """
    Upload one or more image files and convert them to WebP or AVIF.
    """
    if format.lower() not in ("webp", "avif"):
        raise HTTPException(status_code=400, detail="Format must be 'webp' or 'avif'")

    if quality < 1 or quality > 100:
        raise HTTPException(status_code=400, detail="Quality must be between 1 and 100")

    ensure_temp_dir()
    results: List[ConvertedFileResult] = []

    for upload_file in files:
        # Validate extension
        if not validate_file_extension(upload_file.filename or "unknown"):
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type: {upload_file.filename}",
            )

        # Save uploaded file to temp dir
        upload_id = str(uuid.uuid4())
        original_ext = Path(upload_file.filename or "file.png").suffix
        input_path = get_file_path(upload_id, original_ext)

        try:
            with open(input_path, "wb") as f:
                content = await upload_file.read()

                # Validate size
                if not validate_file_size(len(content)):
                    raise HTTPException(
                        status_code=413,
                        detail=f"File '{upload_file.filename}' exceeds the 50 MB limit",
                    )

                f.write(content)

            # Convert
            result = convert_image(input_path, upload_file.filename or "image", format, quality)

            # Register for download
            _file_registry[result["id"]] = {
                "output_path": result["output_path"],
                "converted_name": result["converted_name"],
            }

            results.append(
                ConvertedFileResult(
                    id=result["id"],
                    original_name=result["original_name"],
                    converted_name=result["converted_name"],
                    original_size=result["original_size"],
                    converted_size=result["converted_size"],
                    download_url=f"/api/download/{result['id']}",
                )
            )
        finally:
            # Clean up the original upload
            if input_path.exists():
                input_path.unlink()

    return ConvertResponse(results=results)


@router.get("/download/{file_id}")
async def download_file(file_id: str):
    """
    Download a single converted file by its ID.
    """
    entry = _file_registry.get(file_id)
    if not entry:
        raise HTTPException(status_code=404, detail="File expired or not found")

    output_path: Path = entry["output_path"]
    if not output_path.exists():
        raise HTTPException(status_code=404, detail="File expired or not found")

    return FileResponse(
        path=str(output_path),
        filename=entry["converted_name"],
        media_type="application/octet-stream",
    )


@router.post("/download-all")
async def download_all(request: DownloadAllRequest):
    """
    Download multiple converted files as a ZIP archive.
    """
    files_to_zip = []

    for file_id in request.ids:
        entry = _file_registry.get(file_id)
        if entry and entry["output_path"].exists():
            files_to_zip.append((entry["output_path"], entry["converted_name"]))

    if not files_to_zip:
        raise HTTPException(status_code=404, detail="No valid files found")

    zip_buffer = create_zip_archive(files_to_zip)

    return StreamingResponse(
        zip_buffer,
        media_type="application/zip",
        headers={"Content-Disposition": "attachment; filename=converted_images.zip"},
    )
