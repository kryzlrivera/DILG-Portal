import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('dilgUsers') || '[]');
    const existingUser = users.find((item) => item.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
      setMessage('An account with this email already exists. Please log in instead.');
      return;
    }

    const newUser = {
      fullName,
      email,
      password,
      role,
    };

    users.push(newUser);
    localStorage.setItem('dilgUsers', JSON.stringify(users));
    setMessage('Account created successfully! Redirecting to login...');

    setTimeout(() => {
      navigate('/login');
    }, 1200);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create a new account</h2>
          <p>Register now to access the DILG Portal. Choose your role and save your credentials for next time.</p>
        </div>
        <div className="auth-body">
          {message && <div className="auth-alert">{message}</div>}
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Full name
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Your name"
              />
            </label>
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
                placeholder="Create a password"
              />
            </label>
            <label>
              Confirm password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Repeat your password"
              />
            </label>
            <label>
              Account role
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="admin">Admin</option>
                <option value="super-admin">Super Admin</option>
              </select>
            </label>
            <button type="submit" className="auth-button">Sign up</button>
          </form>
          <div className="auth-footer">
            Already have an account? <Link to="/login">Log in here</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
