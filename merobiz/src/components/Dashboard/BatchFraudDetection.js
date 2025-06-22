import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAccessibility } from '../../contexts/AccessibilityContext';

const BatchFraudDetection = () => {
  const { accessibilityOn } = useAccessibility();

  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const speak = (text) => {
    if (accessibilityOn && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

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
      toast.success("Batch analysis complete!");
      speak(`Batch analysis complete. ${data.length} fraudulent transactions detected.`);
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
      <ToastContainer position="top-right" autoClose={3000} />

      <h2
        tabIndex={0}
        onFocus={() => speak("Batch Fraud Detection")}
        onMouseEnter={() => speak("Batch Fraud Detection")}
        aria-label="Batch Fraud Detection"
      >
        Batch Fraud Detection
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ marginBottom: 10 }}
        aria-label="Upload CSV file"
        tabIndex={0}
        onFocus={() => speak("Choose a CSV file to analyze")}
        onMouseEnter={() => speak("Choose a CSV file to analyze")}
      />
      <br />
      <div
      tabIndex={0}
      onFocus={() => speak("Upload and analyze")}
      onMouseEnter={() => speak("Upload and analyze")}
      aria-label="Upload and analyze button wrapper"
      style={{ display: 'inline-block' }}
    >
      <button
        className="btn-primary"
        onClick={handleUpload}
        disabled={!file || loading}
        aria-label="Upload and analyze file"
      >
        {loading ? 'Analyzing...' : 'Upload & Analyze'}
      </button>
    </div>

      {error && (
        <p
          style={{ color: 'red', marginTop: 15 }}
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
            style={{ marginTop: 30 }}
            tabIndex={0}
            onFocus={() => speak("Fraudulent Transactions")}
            onMouseEnter={() => speak("Fraudulent Transactions")}
          >
            Fraudulent Transactions
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="accessible-table">
              <thead>
                <tr>
                  {getTableHeaders().map((key) => (
                    <th key={key}>
                      {key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </th>
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
