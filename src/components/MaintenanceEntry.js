// MaintenanceEntry.js
import React, { useState } from 'react';

function MaintenanceEntry() {
  const [maintenanceData, setMaintenanceData] = useState({
    item_id: '',
    service_type: 'Repair',
    date_of_service: '',
    cost: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaintenanceData({ ...maintenanceData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(maintenanceData),
      });
      if (response.ok) {
        alert('Maintenance record added successfully');
        setMaintenanceData({ item_id: '', service_type: 'Repair', date_of_service: '', cost: '' });
      } else {
        alert('Error adding maintenance record');
      }
    } catch (error) {
      console.error('Error adding maintenance record:', error);
      alert('Error submitting maintenance record');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="item_id" placeholder="Item ID" value={maintenanceData.item_id} onChange={handleChange} required />
      <input type="date" name="date_of_service" value={maintenanceData.date_of_service} onChange={handleChange} required />
      <button type="submit">Log Task</button>
    </form>
  );
}

export default MaintenanceEntry;
