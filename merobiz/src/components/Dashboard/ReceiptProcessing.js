import React, { useState } from "react";
import axios from "axios";
import { useAccessibility } from '../../contexts/AccessibilityContext';

const ReceiptUploader = () => {
  const { accessibilityOn } = useAccessibility();

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const speak = (text) => {
    if (accessibilityOn && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
    setResults([]);
    setError(null);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select PDF files to upload.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    setUploading(true);
    setError(null);
    setResults([]);

    try {
      const response = await axios.post(
        "http://localhost:8000/upload-invoices-pdf/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResults(response.data.results);
      speak(`Upload complete. Processed ${response.data.results.length} file${response.data.results.length !== 1 ? 's' : ''}.`);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Check the console.");
      speak("Upload failed. Please check the console.");
    } finally {
      setUploading(false);
    }
  };

  // Get all unique keys from extracted data objects to form table headers
  const getTableHeaders = () => {
    const keys = new Set();
    results.forEach((res) => {
      if (res.extracted_data) {
        Object.keys(res.extracted_data).forEach((k) => keys.add(k));
      }
    });
    return Array.from(keys);
  };

  return (
    <div style={{ maxWidth: "100%", margin: "auto", padding: 20 }}>
      <h2
        tabIndex={0}
        onFocus={() => speak("Upload Receipts, PDF format")}
        onMouseEnter={() => speak("Upload Receipts, PDF format")}
        aria-label="Upload Receipts in PDF format"
      >
        Upload Receipts (PDF)
      </h2>

      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileChange}
        className="mb-4"
        aria-label="Select PDF files to upload"
        tabIndex={0}
        onFocus={() => speak("Select PDF files to upload")}
        onMouseEnter={() => speak("Select PDF files to upload")}
      />

      {/* Wrapper div for speech on disabled button */}
      <div
        tabIndex={0}
        onFocus={() =>
          speak(
            uploading
              ? "Uploading in progress"
              : files.length === 0
              ? "Upload and process button disabled. Please select files first."
              : "Upload and process"
          )
        }
        onMouseEnter={() =>
          speak(
            uploading
              ? "Uploading in progress"
              : files.length === 0
              ? "Upload and process button disabled. Please select files first."
              : "Upload and process"
          )
        }
        aria-label="Upload and process files button wrapper"
        style={{ display: "inline-block" }}
      >
        <button
          onClick={handleUpload}
          disabled={uploading || files.length === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          aria-label="Upload and process files"
        >
          {uploading ? "Uploading..." : "Upload & Process"}
        </button>
      </div>

      {error && (
        <p
          style={{ color: "red", marginTop: 15 }}
          tabIndex={0}
          onFocus={() => speak(error)}
          onMouseEnter={() => speak(error)}
          aria-live="assertive"
        >
          {error}
        </p>
      )}

      {results.length > 0 && (
        <>
          <h3
            style={{ marginTop: 30, marginBottom: 10 }}
            tabIndex={0}
            onFocus={() =>
              speak(
                `Extracted Data from ${results.length} file${
                  results.length !== 1 ? "s" : ""
                }`
              )
            }
            onMouseEnter={() =>
              speak(
                `Extracted Data from ${results.length} file${
                  results.length !== 1 ? "s" : ""
                }`
              )
            }
          >
            Extracted Data from {results.length} File{results.length > 1 ? "s" : ""}
          </h3>
          {results.map((res, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: 30,
                padding: 15,
                border: "1px solid #ccc",
                borderRadius: 8,
                backgroundColor: "#f9f9f9",
              }}
              tabIndex={0}
              onFocus={() => speak(`Data from file ${res.filename}`)}
              onMouseEnter={() => speak(`Data from file ${res.filename}`)}
            >
              <strong style={{ display: "block", marginBottom: 10 }}>
                {res.filename}
              </strong>

              <div style={{ overflowX: "auto" }}>
                <table
                  className="accessible-table"
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth: 600,
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#e2e8f0" }}>
                      <th
                        style={{
                          border: "1px solid #cbd5e0",
                          padding: "8px 12px",
                          textAlign: "left",
                          minWidth: 150,
                        }}
                      >
                        Field
                      </th>
                      <th
                        style={{
                          border: "1px solid #cbd5e0",
                          padding: "8px 12px",
                          textAlign: "left",
                        }}
                      >
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(res.extracted_data).map(([key, value]) => (
                      <tr key={key} style={{ borderBottom: "1px solid #e2e8f0" }}>
                        <td
                          style={{
                            border: "1px solid #cbd5e0",
                            padding: "8px 12px",
                            verticalAlign: "top",
                            fontWeight: "600",
                            backgroundColor: "#f1f5f9",
                            minWidth: 150,
                          }}
                        >
                          {key}
                        </td>
                        <td
                          style={{
                            border: "1px solid #cbd5e0",
                            padding: "8px 12px",
                            verticalAlign: "top",
                          }}
                        >
                          {value === "" || value === null || value === undefined
                            ? "-"
                            : typeof value === "boolean"
                            ? value
                              ? "Yes"
                              : "No"
                            : value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ReceiptUploader;
