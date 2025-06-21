import React, { useState } from 'react';

const FraudDetection = () => {
  // State for form fields
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

  // For results and loading state
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update form inputs
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
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          // Convert some fields to number type explicitly
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
        }),
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
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Fraud Detection</h2>
      <form onSubmit={handleSubmit}>
        {/* Category select */}
        <label>
          Category:
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="Beauty">Beauty</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Groceries">Groceries</option>
            <option value="Home Appliances">Home Appliances</option>
          </select>
        </label>
        <br />

        {/* Number inputs */}
        <label>Account Age (days):
          <input type="number" name="acc_days" value={form.acc_days} onChange={handleChange} />
        </label>
        <br />

        <label>Failed Logins:
          <input type="number" name="failed_logins" value={form.failed_logins} onChange={handleChange} />
        </label>
        <br />

        {/* Boolean checkboxes */}
        <label>
          Is VPN or Proxy:
          <input
            type="checkbox"
            name="is_vpn_or_proxy"
            checked={form.is_vpn_or_proxy === 1}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>Transaction Amount:
          <input type="number" name="transaction_amount" value={form.transaction_amount} onChange={handleChange} />
        </label>
        <br />

        <label>
          Is Card Blacklisted:
          <input
            type="checkbox"
            name="is_card_blacklisted"
            checked={form.is_card_blacklisted === 1}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Is Multiple Cards Used:
          <input
            type="checkbox"
            name="is_multiple_cards_used"
            checked={form.is_multiple_cards_used === 1}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>Items Quantity:
          <input type="number" name="items_quantity" value={form.items_quantity} onChange={handleChange} />
        </label>
        <br />

        <label>Pages Viewed:
          <input type="number" name="pages_viewed" value={form.pages_viewed} onChange={handleChange} />
        </label>
        <br />

        <label>
          Device Change During Session:
          <input
            type="checkbox"
            name="device_change_during_session"
            checked={form.device_change_during_session === 1}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>Purchase Frequency:
          <input type="number" step="0.01" name="purchase_frequency_user" value={form.purchase_frequency_user} onChange={handleChange} />
        </label>
        <br />

        <button type="submit" disabled={loading}>{loading ? 'Checking...' : 'Check Fraud'}</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Result:</h3>
          <p>Fraudulent: {result.fraudulent ? 'Yes' : 'No'}</p>
          <p>
            Confidence: {result.fraudulent 
                ? (result.confidence * 100).toFixed(2) 
                : ((1 - result.confidence) * 100).toFixed(2)
            }%
            </p>
        </div>
      )}
    </div>
  );
};

export default FraudDetection;
