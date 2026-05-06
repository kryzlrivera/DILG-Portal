import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('dilgRememberEmail');
    const savedPassword = localStorage.getItem('dilgRememberPassword');
    const savedRemember = localStorage.getItem('dilgRememberMe') === 'true';

    if (savedRemember) {
      setEmail(savedEmail || '');
      setPassword(savedPassword || '');
      setRemember(true);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem('dilgUsers') || '[]');
    const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);

    if (!user) {
      setError('No account found with that email and password. Please register first.');
      return;
    }

    if (remember) {
      localStorage.setItem('dilgRememberMe', 'true');
      localStorage.setItem('dilgRememberEmail', email);
      localStorage.setItem('dilgRememberPassword', password);
    } else {
      localStorage.removeItem('dilgRememberMe');
      localStorage.removeItem('dilgRememberEmail');
      localStorage.removeItem('dilgRememberPassword');
    }

    localStorage.setItem('dilgCurrentUser', JSON.stringify(user));
    navigate(user.role === 'super-admin' ? '/super-admin' : '/admin');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Log in to DILG Portal</h2>
          <p>Access your account securely. New users can register an account below.</p>
        </div>
        <div className="auth-body">
          {error && <div className="auth-alert">{error}</div>}
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Your password"
              />
            </label>
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <button type="submit" className="auth-button">Log in</button>
          </form>
          <div className="auth-footer">
            Don&apos;t have an account? <Link to="/register">Register here</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
