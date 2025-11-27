import ollama
import json
from app.config import MODEL_NAME

def predict_job_roles(text: str):
    prompt = f"""
You are an AI HR expert. Based on this resume text, identify the top 5 suitable job roles.

Resume:
{text}

Return ONLY valid JSON with:

{{
  "roles": [
    {{
      "title": "Software Engineer",
      "match_score": 85,
      "required_skills": ["Python", "Algorithms", "Git"],
      "missing_skills": ["Docker"],
    }}
  ]
}}
"""

    response = ollama.generate(model=MODEL_NAME, prompt=prompt)
    raw = response["response"]

    start = raw.find("{")
    end = raw.rfind("}") + 1
    cleaned = raw[start:end]

    return json.loads(cleaned)
