import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <Container className="text-center">
          <h1 className="hero-title">🚀 Website Launcher</h1>
          <p className="hero-subtitle">
            Manage, launch, and analyze your websites in one place
          </p>
          <div className="hero-buttons">
            <Link to="/login">
              <Button variant="primary" size="lg" className="me-3">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline-primary" size="lg">
                Register
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      <Container className="features-section py-5">
        <h2 className="text-center mb-5">Features</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <h5>📊 Dashboard</h5>
              <p>View all your websites with real-time statistics</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <h5>🔐 Secure</h5>
              <p>JWT authentication with password hashing</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <h5>📈 Analytics</h5>
              <p>Track visits and monitor website performance</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <h5>🌙 Dark Mode</h5>
              <p>Comfortable dark mode support</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <h5>📥 Export</h5>
              <p>Export your website list to CSV</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <h5>⚡ Fast</h5>
              <p>Built with React and Node.js for speed</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default HomePage;