import React, { useContext } from 'react';
import { Navbar as BSNavbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import './Navbar.css';

function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <BSNavbar bg={isDark ? 'dark' : 'light'} expand="lg" sticky="top" className="navbar-custom">
      <BSNavbar.Brand href="/dashboard" className="fw-bold">
        🚀 Website Launcher
      </BSNavbar.Brand>
      <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BSNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/analytics">Analytics</Nav.Link>
          <Button
            variant="outline-secondary"
            size="sm"
            className="me-2"
            onClick={toggleTheme}
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </Button>
          <Button variant="danger" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </BSNavbar.Collapse>
    </BSNavbar>
  );
}

export default Navbar;