from fastapi import APIRouter
from app.ai.ai_service import analyze_resume

ai_router = APIRouter(prefix="/ai", tags=["AI"])

@ai_router.post("/analyze")
def analyze(data: dict):
    text = data.get("text")
    if not text:
        return {"error": "No text provided"}

    ai_output = analyze_resume(text)
    return {"analysis": ai_output}
