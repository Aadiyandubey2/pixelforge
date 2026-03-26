import zipfile
import io
from pathlib import Path
from typing import List, Tuple


def create_zip_archive(files: List[Tuple[Path, str]]) -> io.BytesIO:
    """
    Create a ZIP archive in memory from a list of (file_path, archive_name) tuples.

    Args:
        files: List of tuples containing (absolute_path, name_in_zip)

    Returns:
        BytesIO buffer containing the ZIP archive
    """
    buffer = io.BytesIO()

    with zipfile.ZipFile(buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        for file_path, archive_name in files:
            if file_path.exists():
                zf.write(file_path, archive_name)

    buffer.seek(0)
    return buffer
