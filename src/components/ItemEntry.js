// ItemEntry.js
import React, { useState } from 'react';

function ItemEntry({ userId }) {
  const [formData, setFormData] = useState({
    itemName: '',
    category: 'Electronics',
    purchaseDate: '',
    serialNumber: '',
    image_url: '',
    customer_id: userId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Item added successfully');
        setFormData({ ...formData, itemName: '', purchaseDate: '', serialNumber: '', image_url: '' });
      } else {
        alert('Error adding item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error submitting item');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="itemName" placeholder="Item Name" value={formData.itemName} onChange={handleChange} required />
      <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} required />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default ItemEntry;
