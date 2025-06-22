// import React, { useState } from 'react';
// import {Link} from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// const Login = ({ setUser }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsSubmitting(true);

//     try {
//       const response = await fetch('http://localhost:5000/auth/login', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();

//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", email);
//         console.log("saved token in localstorage")
//         setUser(email);
//         navigate('/dashboard');
//       } else {
//         setError('Invalid credentials');
//       }
//     } catch {
//       setError('Network error. Please try again later.');
//     }
//     setIsSubmitting(false);
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Sign In</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <label htmlFor="email" style={styles.label}>Email</label>
//         <input
//           id="email"
//           type="email"
//           placeholder="Enter your email address"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           required
//           style={styles.input}
//           aria-invalid={!!error}
//         />

//         <label htmlFor="password" style={styles.label}>Password</label>
//         <input
//           id="password"
//           type="password"
//           placeholder="Enter your password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           required
//           style={styles.input}
//           aria-invalid={!!error}
//         />

//         <button type="submit" style={styles.button} disabled={isSubmitting}>
//           {isSubmitting ? 'Logging in...' : 'Sign In'}
//         </button>
//         {error && <p style={styles.error}>{error}</p>}
//       </form>
//       <a href="#" style={styles.forgot}>Forgot password?</a>
//       <Link to="/register" style={styles.forgot}>
//         Register
//       </Link>
      
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: 360,
//     margin: '50px auto',
//     padding: 24,
//     borderRadius: 8,
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     backgroundColor: '#fff',
//   },
//   title: {
//     textAlign: 'center',
//     marginBottom: 24,
//     color: '#222',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 16,
//   },
//   label: {
//     fontWeight: '600',
//     color: '#444',
//   },
//   input: {
//     height: 38,
//     padding: '0 12px',
//     fontSize: 16,
//     borderRadius: 4,
//     border: '1.5px solid #ccc',
//     outline: 'none',
//   },
//   button: {
//     marginTop: 12,
//     padding: '12px 0',
//     backgroundColor: '#007bff',
//     border: 'none',
//     borderRadius: 4,
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 16,
//     cursor: 'pointer',
//     transition: 'background-color 0.3s ease',
//     disabled: {
//       backgroundColor: '#aaa',
//       cursor: 'not-allowed',
//     }
//   },
//   error: {
//     color: 'crimson',
//     marginTop: 8,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   forgot: {
//     display: 'block',
//     marginTop: 16,
//     textAlign: 'center',
//     color: '#007bff',
//     textDecoration: 'underline',
//     cursor: 'pointer',
//   }
// };

// export default Login;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';

const Login = ({ setUser }) => {
  const { accessibilityOn } = useAccessibility();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const speak = (text) => {
    if (accessibilityOn && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  // ... handleSubmit remains unchanged ...
    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", email);
        console.log("saved token in localstorage")
        setUser(email);
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch {
      setError('Network error. Please try again later.');
    }
    setIsSubmitting(false);
  };


  return (
    <div style={styles.container}>
      <h2
        tabIndex={accessibilityOn ? 0 : -1}
        onFocus={() => speak("Sign In")}
        style={styles.title}
      >
        Sign In
      </h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="email" style={styles.label}>Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={styles.input}
          aria-invalid={!!error}
          onFocus={() => speak("Email input")}
          onMouseEnter={() => speak("Email input")}
        />

        <label htmlFor="password" style={styles.label}>Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={styles.input}
          aria-invalid={!!error}
          onFocus={() => speak("Password input")}
          onMouseEnter={() => speak("Password input")}
        />

        <button
          type="submit"
          style={styles.button}
          disabled={isSubmitting}
          onFocus={() => speak(isSubmitting ? "Logging in" : "Sign In button")}
          onMouseEnter={() => speak(isSubmitting ? "Logging in" : "Sign In button")}
        >
          {isSubmitting ? 'Logging in...' : 'Sign In'}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
      <a
        href="#"
        style={styles.forgot}
        tabIndex={accessibilityOn ? 0 : -1}
        onFocus={() => speak("Forgot password")}
        onMouseEnter={() => speak("Forgot password")}
      >
        Forgot password?
      </a>
      <Link
        to="/register"
        style={styles.forgot}
        tabIndex={accessibilityOn ? 0 : -1}
        onFocus={() => speak("Register")}
        onMouseEnter={() => speak("Register")}
      >
        Register
      </Link>
    </div>
  );
};

// (styles object remains unchanged)
const styles = {
  container: {
    maxWidth: 360,
    margin: '50px auto',
    padding: 24,
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#222',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  label: {
    fontWeight: '600',
    color: '#444',
  },
  input: {
    height: 38,
    padding: '0 12px',
    fontSize: 16,
    borderRadius: 4,
    border: '1.5px solid #ccc',
    outline: 'none',
  },
  button: {
    marginTop: 12,
    padding: '12px 0',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: 4,
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    disabled: {
      backgroundColor: '#aaa',
      cursor: 'not-allowed',
    }
  },
  error: {
    color: 'crimson',
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  forgot: {
    display: 'block',
    marginTop: 16,
    textAlign: 'center',
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer',
  }
};

export default Login;
