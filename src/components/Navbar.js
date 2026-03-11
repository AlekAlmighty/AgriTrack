import React, { useState } from 'react';
import '../styles/Navbar.css';

function Navbar({ activeTab, setActiveTab }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">🌱</span>
          <div className="logo-text">
            <h1>AgriTrack</h1>
            <p>Smart Farm Assistant</p>
          </div>
        </div>

        <button 
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li>
            <button
              className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleTabChange('dashboard')}
            >
              <span className="icon">📊</span>
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeTab === 'farmRecords' ? 'active' : ''}`}
              onClick={() => handleTabChange('farmRecords')}
            >
              <span className="icon">📋</span>
              Farm Records
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => handleTabChange('reports')}
            >
              <span className="icon">📈</span>
              Reports
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeTab === 'alerts' ? 'active' : ''}`}
              onClick={() => handleTabChange('alerts')}
            >
              <span className="icon">🔔</span>
              Alerts
            </button>
          </li>
        </ul>

        <div className="navbar-right">
          <div className="user-profile">GZ</div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
