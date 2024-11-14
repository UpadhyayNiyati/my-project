import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import ItemEntry from './components/ItemEntry';
import MaintenanceEntry from './components/MaintenanceEntry';
import ViewData from './components/ViewData';

function App() {
  const [user, setUser ] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser (userData);
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} />
        <div className="content">
          <Routes>
            <Route 
              path="/register" 
              element={<Register onRegister={() => console.log('User  registered')} setUser Data={setUser } />} 
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
              path="/viewData" 
              element={user ? <ViewData userId={user.id} /> : <p>Please log in to access this page.</p>} 
            />
            <Route path="/" element={<h1>Welcome to the App</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;