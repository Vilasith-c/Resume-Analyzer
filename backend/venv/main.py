from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.upload_router import router as upload_router
from app.routers.ai_router import ai_router
from app.routers.job_router import job_router
from app.routers.preview_router import router as preview_router 

app = FastAPI(title="Resume AI Backend")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(upload_router)   
app.include_router(ai_router)
app.include_router(preview_router)
app.include_router(job_router)

@app.get("/")
def root():
    return {"message": "Backend is running (Phase 3)"}
