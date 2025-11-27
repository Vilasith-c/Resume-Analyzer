import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import "../styles/upload.css";
import "../styles/result.css";
import { uploadResume } from "../services/api";
import "../styles/layout.css";

const Home = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Handle file selection from FileUpload.jsx
  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setResult(null);
    setError(null);
  };

  // Backend call
  const analyzeResume = async () => {
    if (!file) {
      alert("Please upload a PDF first.");
      return;
    }

    setLoading(true);
    setError(null);
    console.log("BACKEND RESPONSE →", result);


    try {
      const response = await uploadResume(file);

      // Validate JSON (avoid blank page)
      if (!response || !response.summary) {
        setError("Invalid response from AI model.");
        setLoading(false);
        return;
      }

      // Standardize missing data
      setResult({
        summary: response.summary || "No summary available.",
        resumeScore: response.score || 0,
        atsScore: response.atsScore || 0, // optional
        suggestions: response.suggestions || [],
      });
    } catch (err) {
      setError("Failed to analyze resume.");
    }

    setLoading(false);
  };

  return (
    <div className="home-container">

      <h1 className="title">AI Resume Analyzer</h1>

      {/* File Upload */}
      <FileUpload onFileSelect={handleFileSelect} />

      {/* Analyze Button */}
      <button
        className="analyze-btn"
        onClick={analyzeResume}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {/* Error message */}
      {error && <p className="error-text">{error}</p>}

      {/* Results */}
      {result && (
        <div className="result-container">
          <h2>Summary</h2>
          <p className="summary">{result.summary}</p>

          <div className="scores">
            <div className="score-circle blue">
              {result.resumeScore}
            </div>
            <div className="score-label">Resume Score</div>

            <div className="score-circle purple">
              {result.atsScore}
            </div>
            <div className="score-label">ATS Score</div>
          </div>

          <h3>Suggestions</h3>
          <ul>
            {result.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
