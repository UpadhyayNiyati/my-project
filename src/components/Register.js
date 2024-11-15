import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ onRegister }) {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null); // Fixed typo in state variable name

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        onRegister(); // Call the onRegister function to redirect or update state
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleViewUser = async () => {
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/api/user/${formData.email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data); // Set user data correctly
      } else {
        const result = await response.json();
        setError(result.message || 'Failed to fetch user data.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('An error occurred while fetching user data.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
        <button type="submit">Register</button>
        <button type="button" onClick={() => navigate('/login')}>
          Already have an account? Login
        </button>
      </form>
      <button type="button" onClick={handleViewUser}>
        View User
      </button>
      {userData && (
        <div>
          <h3>User Data:</h3>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Add more fields as necessary */}
        </div>
      )}
    </div>
  );
}

export default Register;
