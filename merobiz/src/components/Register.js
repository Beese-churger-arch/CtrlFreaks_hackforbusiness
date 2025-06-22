import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [fullname, setFullName]   = useState('');
  const [gender, setGender]       = useState('Male');
  const [error, setError]         = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullname, gender }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || data.error || 'Registration failed.');
      }
    } catch {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Full Name</label>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullName(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          style={styles.input}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>

        <label style={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button
          type="submit"
          style={styles.button}
        >
          Sign Up
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 360,
    margin: '50px auto',
    padding: 24,
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    fontFamily: 'sans-serif',
  },
  title: { textAlign: 'center', marginBottom: 20 },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  label: { fontWeight: 600 },
  input: {
    padding: '10px 14px',
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: 16,
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff', // blue button
    color: '#fff',
    fontWeight: 600,
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 16,
  },
  error: {
    marginTop: 10,
    color: 'crimson',
    textAlign: 'center',
  },
};

export default Register;
