// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import ItemEntry from './components/ItemEntry';
import MaintenanceEntry from './components/MaintenanceEntry';
import ViewUser from './components/ViewUser'; // Ensure correct import
import Home from './components/Home';

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} />
        <div className="content">
          <Routes>
            <Route
              path="/register"
              element={<Register onRegister={() => console.log('User registered')} setUser={setUser} />}
            />
            <Route
              path="/login"
              element={<Login onLoginSuccess={handleLoginSuccess} />}
            />
            <Route
              path="/itemEntry"
              element={user ? <ItemEntry userId={user.id} /> : <p>Please log in to access this page.</p>}
            />
            <Route
              path="/maintenanceEntry"
              element={user ? <MaintenanceEntry /> : <p>Please log in to access this page.</p>}
            />
            <Route
              path="/viewUser"
              element={user ? <ViewUser userId={user.id} /> : <p>Please log in to access this page.</p>}
            />
            <Route path="/" element={<Home />} /> {/* Home route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
