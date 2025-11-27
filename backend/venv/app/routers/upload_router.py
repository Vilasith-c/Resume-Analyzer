from fastapi import APIRouter, UploadFile, File
from app.utils.pdf_parser import extract_text_from_pdf
from app.ai.ai_service import analyze_resume

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_bytes = await file.read()

        # extract pdf text
        extracted_text = extract_text_from_pdf(file_bytes)

        # analyze once only
        result = analyze_resume(extracted_text)

        return {
            "summary": result.get("summary", "N/A"),
            "resumeScore": result.get("resumeScore", 0),
            "atsScore": result.get("atsScore", 0),
            "suggestions": result.get("suggestions", []),
        }

    except Exception as e:
        return {"error": str(e)}

