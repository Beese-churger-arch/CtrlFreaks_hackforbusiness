import React, { useState } from 'react';

const FraudDetection = () => {
  const [form, setForm] = useState({
    category: 'Electronics',
    acc_days: 3,
    failed_logins: 1,
    is_vpn_or_proxy: 0,
    transaction_amount: 2500,
    is_card_blacklisted: 0,
    is_multiple_cards_used: 1,
    items_quantity: 7,
    pages_viewed: 12,
    device_change_during_session: 0,
    purchase_frequency_user: 0.1,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        ...form,
        acc_days: Number(form.acc_days),
        failed_logins: Number(form.failed_logins),
        is_vpn_or_proxy: Number(form.is_vpn_or_proxy),
        transaction_amount: Number(form.transaction_amount),
        is_card_blacklisted: Number(form.is_card_blacklisted),
        is_multiple_cards_used: Number(form.is_multiple_cards_used),
        items_quantity: Number(form.items_quantity),
        pages_viewed: Number(form.pages_viewed),
        device_change_during_session: Number(form.device_change_during_session),
        purchase_frequency_user: Number(form.purchase_frequency_user),
      };

      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Prediction failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.heading}>Fraud Detection System</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Category:
            <select name="category" value={form.category} onChange={handleChange} style={styles.input}>
              <option value="Beauty">Beauty</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Groceries">Groceries</option>
              <option value="Home Appliances">Home Appliances</option>
            </select>
          </label>
          <label style={styles.label}>
            Account Age (days):
            <input type="number" name="acc_days" value={form.acc_days} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Failed Logins:
            <input type="number" name="failed_logins" value={form.failed_logins} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              name="is_vpn_or_proxy"
              checked={form.is_vpn_or_proxy === 1}
              onChange={handleChange}
            />
            Is VPN or Proxy
          </label>
          <label style={styles.label}>
            Transaction Amount:
            <input type="number" name="transaction_amount" value={form.transaction_amount} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              name="is_card_blacklisted"
              checked={form.is_card_blacklisted === 1}
              onChange={handleChange}
            />
            Is Card Blacklisted
          </label>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              name="is_multiple_cards_used"
              checked={form.is_multiple_cards_used === 1}
              onChange={handleChange}
            />
            Is Multiple Cards Used
          </label>
          <label style={styles.label}>
            Items Quantity:
            <input type="number" name="items_quantity" value={form.items_quantity} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Pages Viewed:
            <input type="number" name="pages_viewed" value={form.pages_viewed} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              name="device_change_during_session"
              checked={form.device_change_during_session === 1}
              onChange={handleChange}
            />
            Device Changed During Session
          </label>
          <label style={styles.label}>
            Purchase Frequency:
            <input
              type="number"
              step="0.01"
              name="purchase_frequency_user"
              value={form.purchase_frequency_user}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Checking...' : 'Check Fraud'}
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        {result && (
          <div style={styles.result}>
            <h3>Result:</h3>
            <p>Fraudulent: <strong>{result.fraudulent ? 'Yes' : 'No'}</strong></p>
            <p>
              Confidence: <strong>
                {result.fraudulent
                  ? (result.confidence * 100).toFixed(2)
                  : ((1 - result.confidence) * 100).toFixed(2)}%
              </strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', sans-serif",
    color: '#fff',
    background: 'linear-gradient(120deg,rgb(233, 236, 240)',
  },
  formWrapper: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 600,
    margin: '0 auto',
    padding: '40px 30px',
    background: 'rgba(72, 137, 222, 0.55)', // Bluish and semi-transparent
    borderRadius: '16px',
    marginTop: '60px',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 0 20px rgba(0,0,0,0.4)',
    border: '1.5px solid rgba(80,140,255,0.35)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 28,
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: '500',
    fontSize: '16px',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: '16px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginTop: '4px',
  },
  button: {
    padding: '12px',
    background: '#1f77ff',
    color: 'white',
    fontWeight: '600',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
  error: {
    marginTop: 20,
    color: 'red',
    fontWeight: '500',
  },
  result: {
    marginTop: 30,
    background: '#222',
    padding: 20,
    borderRadius: 10,
    textAlign: 'center',
    border: '1px solid #444',
  },
};

export default FraudDetection;