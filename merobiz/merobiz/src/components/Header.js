import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="sales-header">
      <div className="logo" onClick={() => navigate('/')}>SalesPro</div>
      <button className="mobile-menu-button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>☰</button>
      <nav className={`sales-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="/features">Features</a>
        <a href="/pricing">Pricing</a>
        <a href="/resources">Resources</a>
        <a href="/support">Support</a>
        <div className="cta-buttons">
          <button className="btn-secondary" onClick={() => navigate('/login')}>Sign In</button>
          <button className="btn-primary" onClick={() => navigate('/register')}>Get Started</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
