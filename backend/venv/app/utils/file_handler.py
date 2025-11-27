from fastapi import UploadFile
import io

async def read_file_bytes(file: UploadFile) -> bytes:
    return await file.read()
