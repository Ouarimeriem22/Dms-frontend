
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import './Login.css';

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hardcoded users for demo
  const validUsers = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = validUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      dispatch(login({ 
        id: Math.floor(Math.random() * 1000),
        username: user.username, 
        role: user.role 
      }));
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Document Management System</h2>
        <h3>Login</h3>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="demo-credentials">
          <p>Demo Credentials:</p>
          <p>Username: admin, Password: admin123</p>
          <p>Username: user, Password: user123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
