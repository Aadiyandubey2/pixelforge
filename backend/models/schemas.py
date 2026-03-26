from pydantic import BaseModel, Field
from typing import List, Optional


class ConvertedFileResult(BaseModel):
    id: str
    original_name: str
    converted_name: str
    original_size: int
    converted_size: int
    download_url: str


class ConvertResponse(BaseModel):
    results: List[ConvertedFileResult]


class DownloadAllRequest(BaseModel):
    ids: List[str]


class ErrorResponse(BaseModel):
    detail: str
