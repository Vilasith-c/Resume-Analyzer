import ollama
import json
from app.config import MODEL_NAME

def analyze_resume(text: str):
    prompt = f"""
You are an expert resume evaluator.

Analyze the following resume text and return ONLY a JSON object with keys:
- summary (string, 10–20 sentences)
- resumeScore (integer 0–100)
- atsScore (integer 0–100)
- suggestions (list of strings, minimum 5 items)

Resume:
{text}

Return JSON exactly in this format:

{{
  "summary": "",
  "resumeScore": 0,
  "atsScore": 0,
  "suggestions": []
}}

Do NOT include any explanation. Output valid JSON only.
"""

    response = ollama.generate(model=MODEL_NAME, prompt=prompt)
    raw = response["response"].strip()

    # Parse raw JSON safely
    try:
        data = json.loads(raw)
    except:
        start = raw.find("{")
        end = raw.rfind("}") + 1
        data = json.loads(raw[start:end])

    # 🔥 NORMALIZE ALL POSSIBLE KEYS THE MODEL MIGHT RETURN
    normalized = {
        "summary": data.get("summary") or data.get("Summary") or "",
        "resumeScore": (
            data.get("resumeScore")
            or data.get("resume_score")
            or data.get("resume score")
            or data.get("score")
            or 0
        ),
        "atsScore": (
            data.get("atsScore")
            or data.get("ats_score")
            or data.get("ats score")
            or 0
        ),
        "suggestions": (
            data.get("suggestions")
            or data.get("improvements")
            or []
        )
    }

    return normalized
