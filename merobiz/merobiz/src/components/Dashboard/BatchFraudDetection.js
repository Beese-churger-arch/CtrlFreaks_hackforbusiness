import React, { useState } from 'react';

const BatchFraudDetection = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResults([]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResults([]);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/predict-batch', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Upload failed');
      }

      setResults(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const getTableHeaders = () => {
    if (results.length === 0) return [];
    const keys = new Set();
    results.forEach((row) => {
      Object.keys(row).forEach((key) => keys.add(key));
    });
    return Array.from(keys);
  };

  return (
    <div style={{ maxWidth: "100%", margin: 'auto', padding: 30 }}>
      <h2>Batch Fraud Detection</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ marginBottom: 10 }}
      />
      <br />
      <button
        className="btn-primary"
        onClick={handleUpload}
        disabled={!file || loading}
      >
        {loading ? 'Analyzing...' : 'Upload & Analyze'}
      </button>

      {error && <p style={{ color: 'red', marginTop: 15 }}>{error}</p>}

      {results.length > 0 && (
        <>
          <h3 style={{ marginTop: 30 }}>Fraudulent Transactions</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="accessible-table">
              <thead>
                <tr>
                  {getTableHeaders().map((key) => (
                    <th key={key}>{key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((row, idx) => (
                  <tr key={idx}>
                    {getTableHeaders().map((key) => (
                      <td key={key}>
                        {typeof row[key] === 'boolean'
                          ? row[key] ? 'Yes' : 'No'
                          : key === 'confidence'
                          ? `${(row[key] * 100).toFixed(2)}%`
                          : row[key] ?? '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default BatchFraudDetection;
