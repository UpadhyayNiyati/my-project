// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header({ user }) {
  return (
    <header>
      <h1>Inventory Management System</h1>
      <nav>
        <Link to="/">Home</Link> {/* Home link */}
        {user ? (
          <>
            <Link to="/itemEntry">Item Entry</Link>
            <Link to="/maintenanceEntry">Maintenance Entry</Link>
            <Link to="/viewUser">View User</Link> {/* Corrected link */}
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <>
            {/* <Link to="/viewuser"></Link> */}
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
