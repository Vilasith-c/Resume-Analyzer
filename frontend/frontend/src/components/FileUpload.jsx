import React, { useState } from "react";
import "../styles/upload.css";

const FileUpload = ({ onFileSelect }) => {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleFile = (file) => {
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      onFileSelect(file);
    } else {
      alert("Please upload a PDF file only.");
    }
  };

  return (
    <div
      className={`upload-box ${dragOver ? "drag-over" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files[0]);
      }}
    >
      <input
        type="file"
        className="file-input"
        accept=".pdf"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      <div className="upload-content">
        <p className="upload-title">
          {fileName ? fileName : "Drop your resume here"}
        </p>
        <p className="upload-subtitle">or click to browse (PDF only)</p>
      </div>
    </div>
  );
};

export default FileUpload;
