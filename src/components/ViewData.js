// ViewData.js
import React, { useEffect, useState } from 'react';

function ViewData({ userId }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${userId}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <h2>View Data</h2>
      {userData ? (
        <div>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          {/* Add other user details here */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default ViewData;
