from fastapi import APIRouter
from app.services.job_matcher import predict_job_roles

job_router = APIRouter()

@job_router.post("/job-match")
async def job_match(request: dict):
    resume_text = request.get("text", "")
    result = predict_job_roles(resume_text)
    return result
