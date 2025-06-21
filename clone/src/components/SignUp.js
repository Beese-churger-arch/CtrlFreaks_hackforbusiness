
import React, { useState } from 'react';
import styles from './css/SignForm.module.css';

function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('Signup successful!');
      setForm({ name: '', email: '', password: '' });
    } else {
      alert('Signup failed');
    }
  };

  return (
    <>  <div className="page">
      <form className={styles.form} onSubmit={handleSubmit}>
        
        <h2>Sign Up</h2>
        <p>
          <label><b>Name{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</b></label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </p>
        <p>
          <label><b>Email{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</b></label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </p>
        <p>
          <label><b>Password{'\u00A0'}{'\u00A0'}</b></label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            required
          />
        </p>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
        <button type="submit" className={styles['submit-button']}>Sign Up</button>
      </form>

      <footer style={{ background: "#f9f9f9", padding: "2px", marginTop: "4rem" }}>
        <p style={{ textAlign: 'center', color: '#666' }}>© 2025 YourSite. All rights reserved.</p>
      </footer>
      </div>
    </>
  );
}

export default SignUp;
