// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login({ onLoginSuccess }) {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorDetails = await response.text(); // Get error details if available
        throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorDetails}`);
      }
      const result = await response.json();
      onLoginSuccess(result);
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const handleViewUser   = async () => {
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/api/user/${formData.email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        const errorDetails = await response.text(); // Get error details if available
        throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorDetails}`);
      }
      const result = await response.json();
      alert(`User  Data: ${JSON.stringify(result)}`);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user data. Please check your network connection.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <button type="button" onClick={handleViewUser }>
          View User
        </button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <p>New User? <button onClick={() => navigate('/register')}>Register</button></p>
      </div>
    </div>
  );
}

export default Login;