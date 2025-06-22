import React, { useState } from "react";
import axios from "axios";

const ReceiptUploader = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
    setResults([]);
    setError(null);
  };

  const handleUpload = async () => {
    if (files.length === 0) return alert("Please select PDF files to upload.");

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
    } catch (err) {
      console.error(err);
      setError("Upload failed. Check the console.");
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
      <h2 className="text-2xl font-bold mb-4">Upload Receipts (PDF)</h2>

      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload & Process"}
      </button>

      {error && <p style={{ color: "red", marginTop: 15 }}>{error}</p>}

      {results.length > 0 && (
        <>
          <h3 style={{ marginTop: 30, marginBottom: 10 }}>
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
