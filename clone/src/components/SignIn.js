import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/SignForm.module.css';

function SignIn({ setIsLoggedIn }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.token) {
        setIsLoggedIn(true);
        navigate('/');
      } else {
        alert(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('An error occurred while logging in.');
    }
  };

  return (
    <div className="page">
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>

        <p>
          <label><b>Email{'\u00A0'.repeat(9)}</b></label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            autoComplete="email"
          />
        </p>

        <p>
          <label><b>Password{'\u00A0'.repeat(6)}</b></label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            autoComplete="current-password"
          />
        </p>

        <button type="submit" className={styles['submit-button']}>
          Login
        </button>
      </form>

      <footer style={{ background: "#f9f9f9", padding: "2px", marginTop: "4rem" }}>
        <p style={{ textAlign: 'center', color: '#666' }}>© 2025 YourSite. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default SignIn;