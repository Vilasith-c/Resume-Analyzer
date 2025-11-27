from fastapi import APIRouter, Query, HTTPException
from fastapi.responses import FileResponse
import os

router = APIRouter()

@router.get("/preview")
def preview_file(path: str = Query(..., description="Absolute file path on server (dev only)")):
    if not os.path.isfile(path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(path, media_type="application/pdf", filename=os.path.basename(path))
