# app/routers/preview_router.py
from fastapi import APIRouter, Query, HTTPException
from fastapi.responses import FileResponse
import os

router = APIRouter()

@router.get("/preview")
def preview_file(path: str = Query(..., description="Absolute file path on server (dev only)")):
    # DEV only - ensure you understand security implications
    if not os.path.isfile(path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(path, media_type="application/pdf", filename=os.path.basename(path))
