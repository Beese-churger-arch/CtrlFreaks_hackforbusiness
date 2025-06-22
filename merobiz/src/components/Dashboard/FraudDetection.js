import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAccessibility } from '../../contexts/AccessibilityContext';

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', sans-serif",
    color: '#fff',
    // background: 'linear-gradient(120deg, rgb(233,236,240) 0%, rgb(72,137,222) 100%)',
  },
  formWrapper: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '600px',
    margin: '0 auto',
    padding: '40px 30px',
    background: 'rgba(72, 137, 222, 0.55)',
    borderRadius: '16px',
    marginTop: '60px',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 0 20px rgba(0,0,0,0.4)',
    border: '1.5px solid rgba(80,140,255,0.35)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '24px',
    fontSize: '28px',
    fontWeight: 600,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 500,
    fontSize: '16px',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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
    fontWeight: 600,
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
  error: {
    marginTop: '20px',
    color: 'red',
    fontWeight: 500,
  },
  result: {
    marginTop: '30px',
    background: '#222',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    border: '1px solid #444',
  },
};

const initialForm = {
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
};

const FraudDetection = () => {
  const { accessibilityOn } = useAccessibility();

  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const speak = (text) => {
    if (accessibilityOn && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const speechHandlers = (text) => ({
    tabIndex: accessibilityOn ? 0 : -1,
    onFocus: () => speak(text),
    onBlur: stopSpeaking,
    onMouseEnter: () => speak(text),
    onMouseLeave: stopSpeaking,
  });

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
        toast.success('Prediction complete!');
        speak(
          `Prediction complete. Result: ${
            data.fraudulent ? 'Fraudulent transaction detected' : 'Transaction is not fraudulent'
          }. Confidence is ${(data.confidence * 100).toFixed(2)} percent.`
        );
      } else {
        setError(data.error || 'Prediction failed');
        speak(data.error || 'Prediction failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      speak('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div style={styles.formWrapper}>
        <h2
          style={styles.heading}
          {...speechHandlers('Fraud Detection System')}
        >
          Fraud Detection System
        </h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label} {...speechHandlers('Select product category')}>
            Product Category
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              style={styles.input}
              aria-label="Product Category"
            >
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
              <option value="Beauty">Beauty</option>
              <option value="Sports">Sports</option>
              <option value="Toys">Toys</option>
              <option value="Automotive">Automotive</option>
            </select>
          </label>
          <label style={styles.label} {...speechHandlers('Account age in days')}>
            Account Age (days)
            <input
              type="number"
              name="acc_days"
              value={form.acc_days}
              onChange={handleChange}
              style={styles.input}
              min={0}
              aria-label="Account Age in days"
            />
          </label>
          <label style={styles.label} {...speechHandlers('Number of failed logins')}>
            Failed Logins
            <input
              type="number"
              name="failed_logins"
              value={form.failed_logins}
              onChange={handleChange}
              style={styles.input}
              min={0}
              aria-label="Failed Logins"
            />
          </label>
          <label style={styles.checkbox} {...speechHandlers('Is VPN or proxy used')}>
            <input
              type="checkbox"
              name="is_vpn_or_proxy"
              checked={!!form.is_vpn_or_proxy}
              onChange={handleChange}
              aria-label="Is VPN or Proxy Used"
            />
            VPN/Proxy Used
          </label>
          <label style={styles.label} {...speechHandlers('Transaction amount')}>
            Transaction Amount
            <input
              type="number"
              name="transaction_amount"
              value={form.transaction_amount}
              onChange={handleChange}
              style={styles.input}
              min={0}
              aria-label="Transaction Amount"
            />
          </label>
          <label style={styles.checkbox} {...speechHandlers('Is card blacklisted')}>
            <input
              type="checkbox"
              name="is_card_blacklisted"
              checked={!!form.is_card_blacklisted}
              onChange={handleChange}
              aria-label="Is Card Blacklisted"
            />
            Card Blacklisted
          </label>
          <label style={styles.checkbox} {...speechHandlers('Are multiple cards used')}>
            <input
              type="checkbox"
              name="is_multiple_cards_used"
              checked={!!form.is_multiple_cards_used}
              onChange={handleChange}
              aria-label="Are Multiple Cards Used"
            />
            Multiple Cards Used
          </label>
          <label style={styles.label} {...speechHandlers('Items quantity')}>
            Items Quantity
            <input
              type="number"
              name="items_quantity"
              value={form.items_quantity}
              onChange={handleChange}
              style={styles.input}
              min={1}
              aria-label="Items Quantity"
            />
          </label>
          <label style={styles.label} {...speechHandlers('Pages viewed')}>
            Pages Viewed
            <input
              type="number"
              name="pages_viewed"
              value={form.pages_viewed}
              onChange={handleChange}
              style={styles.input}
              min={1}
              aria-label="Pages Viewed"
            />
          </label>
          <label style={styles.checkbox} {...speechHandlers('Device change during session')}>
            <input
              type="checkbox"
              name="device_change_during_session"
              checked={!!form.device_change_during_session}
              onChange={handleChange}
              aria-label="Device Change During Session"
            />
            Device Change During Session
          </label>
          <label style={styles.label} {...speechHandlers('Purchase frequency for user')}>
            Purchase Frequency (user)
            <input
              type="number"
              name="purchase_frequency_user"
              value={form.purchase_frequency_user}
              onChange={handleChange}
              style={styles.input}
              min={0}
              step={0.01}
              aria-label="Purchase Frequency for User"
            />
          </label>
          <button
            type="submit"
            style={styles.button}
            disabled={loading}
            {...speechHandlers('Submit form for prediction')}
          >
            {loading ? 'Predicting...' : 'Predict'}
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        {result && (
          <div
            style={styles.result}
            tabIndex={accessibilityOn ? 0 : -1}
            aria-live="polite"
            {...speechHandlers(
              `Result: Transaction is ${
                result.fraudulent ? 'fraudulent' : 'not fraudulent'
              } with confidence ${
                (
                  result.fraudulent
                    ? result.confidence
                    : 1 - result.confidence
                ) * 100
              } percent`
            )}
          >
            <h3>Result:</h3>
            <p>
              Fraudulent: <strong>{result.fraudulent ? 'Yes' : 'No'}</strong>
            </p>
            <p>
              Confidence:{' '}
              <strong>
                {result.fraudulent
                  ? (result.confidence * 100).toFixed(2)
                  : ((1 - result.confidence) * 100).toFixed(2)}
                %
              </strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FraudDetection;
