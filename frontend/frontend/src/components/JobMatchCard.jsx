// src/components/JobMatchCard.jsx
import React from "react";
import "../styles/jobmatch.css";

export default function JobMatchCard({ roles }) {
  if (!roles || roles.length === 0) return null;

  return (
    <div className="jobmatch-card">
      <h3>Recommended Job Roles</h3>
      {roles.map((r, idx) => (
        <div className="role-card" key={idx}>
          <div className="role-header">
            <h4>{r.title}</h4>
            <div className="role-score">{r.match_score}/100</div>
          </div>

          <div className="role-body">
            <div className="role-col">
              <h5>Required Skills</h5>
              <ul>{(r.required_skills || []).map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
            <div className="role-col">
              <h5>Missing Skills</h5>
              <ul>{(r.missing_skills || []).map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
