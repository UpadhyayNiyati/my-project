// Header.js
import React from 'react';
import { Link } from 'react-router-dom';


function Header({ user }) {
  return (
    <header style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
      <nav>
        {!user ? (
          <>
            <Link to="/register">
              <button>Register</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/itemEntry">
              <button>Item Entry</button>
            </Link>
            <Link to="/maintenanceEntry">
              <button>Maintenance Entry</button>
            </Link>
            <Link to="/viewData">
              <button>View Data</button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;