// components/ViewUser.js
import React, { useState } from 'react';
import axios from 'axios';

function ViewUser() {
  const [email, setEmail] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/${email}`);
      setUserInfo(response.data);
      setError('');
    } catch (err) {
      setUserInfo(null);
      setError('User not found. Please check the email.');
    }
  };

  return (
    <div>
      <h2>View User</h2>
      <input
        type="email"
        placeholder="Enter user email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userInfo && (
        <div>
          <h3>User Information</h3>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
        </div>
      )}
    </div>
  );
}

export default ViewUser;
