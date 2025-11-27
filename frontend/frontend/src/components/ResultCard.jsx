import React from "react";
import "../styles/result.css";

export default function ResultCard({ result }) {
  return (
    <div className="result-card">

      <h2 className="section-title">Summary</h2>
      <p className="summary-text">{result.summary}</p>

      <div className="score-section">
        <div className="score-circle">
          <div className="circle">
            <div className="circle-inner">{result.resumescore}</div>
          </div>
          <p>Resume Score</p>
        </div>

        <div className="score-circle">
          <div className="circle purple">
            <div className="circle-inner">{result.atsScore}</div>
          </div>
          <p>ATS Score</p>
        </div>
      </div>

      <h3 className="section-title">Suggestions</h3>
      <ul className="suggestions-list">
        {result.suggestions.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

    </div>
  );
}
