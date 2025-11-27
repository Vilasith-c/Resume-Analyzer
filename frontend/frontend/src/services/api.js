// src/services/api.js
const API_BASE = "http://127.0.0.1:8000";

export async function uploadResume(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://127.0.0.1:8000/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = await response.json();
  console.log("FRONTEND RECEIVED →", data);

  return {
    summary: data.summary || "",
    score: data.resumeScore ?? data.score ?? 0,   // FIXED
    atsScore: data.atsScore ?? data.atsScore ?? 0, // FIXED
    suggestions: data.suggestions || [],
  };
}
