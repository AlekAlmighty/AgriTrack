import React, { useState } from 'react';
import '../styles/Alerts.css';

// StatCard Component for KPIs
function StatCard({ label, value, icon, bgColor }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className={`stat-icon ${bgColor}`}>
        {icon}
      </div>
    </div>
  );
}

// AlertCategory Component
function AlertCategory({ icon, category, activeCount, bgColor }) {
  return (
    <div className="alert-category-card">
      <div className={`category-icon ${bgColor}`}>
        {icon}
      </div>
      <div className="category-content">
        <h4>{category}</h4>
        <p>{activeCount} active</p>
      </div>
    </div>
  );
}

// AlertItem Component
function AlertItem({ alert, onMarkResolved, onDismiss }) {
  const isResolved = alert.status === 'Resolved';

  return (
    <div className={`alert-item ${alert.priority.toLowerCase()}`}>
      <div className="alert-icon-wrapper">
        <div className={`alert-icon ${alert.iconBg}`}>
          {alert.icon}
        </div>
      </div>
      
      <div className="alert-content">
        <div className="alert-header-row">
          <h3>{alert.title}</h3>
          {isResolved ? (
            <span className="resolved-badge">✓ Resolved</span>
          ) : (
            <span className={`priority-badge ${alert.priority.toLowerCase()}`}>
              {alert.priority} Priority
            </span>
          )}
        </div>
        
        <div className="alert-meta">
          <span className="alert-field">📋 {alert.field}</span>
          <span className="alert-crop">🌱 {alert.crop}</span>
          <span className="alert-time">⏱️ {alert.timestamp}</span>
        </div>
        
        <div className="alert-issue">
          <strong>Issue:</strong>
          <p>{alert.issue}</p>
        </div>
        
        <div className="alert-recommendation">
          <strong>✓ AI Recommendation:</strong>
          <p>{alert.recommendation}</p>
        </div>
        
        {!isResolved && (
          <div className="alert-actions">
            <button 
              className="btn-resolved"
              onClick={() => onMarkResolved(alert.id)}
            >
              ✓ Mark as Resolved
            </button>
            <button 
              className="btn-dismiss"
              onClick={() => onDismiss(alert.id)}
            >
              ✗ Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Alerts Component
function Alerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'Urgent: Irrigation Required',
      field: 'Rice Field A',
      crop: 'Tomato',
      timestamp: '2 hours ago',
      icon: '💧',
      iconBg: 'blue-bg',
      priority: 'High',
      issue: 'Based on soil conditions and last irrigation record, soil moisture is critically low.',
      recommendation: 'Irrigate your crops within the next 24 hours to prevent crop stress and wilting.'
    },
    {
      id: 2,
      title: 'Pest Warning: Aphid Risk',
      field: 'Vegetable Plot C',
      crop: 'Vegetables',
      timestamp: '5 hours ago',
      icon: '🐛',
      iconBg: 'red-bg',
      priority: 'Medium',
      issue: 'Weather conditions and crop growth stage are favorable for aphid infestation.',
      recommendation: 'Monitor crops closely for aphid presence. Apply organic pesticide if insects are detected.'
    },
    {
      id: 3,
      title: 'Weather Alert: Heavy Rain Expected',
      field: 'All Fields',
      crop: 'All Crops',
      timestamp: '1 day ago',
      icon: '🌧️',
      iconBg: 'purple-bg',
      priority: 'High',
      issue: 'Heavy rainfall forecasted for the next 48 hours (150-200mm expected).',
      recommendation: 'Ensure proper drainage systems are clear. Delay fertilizer application and pest control sprays.'
    },
    {
      id: 4,
      title: 'Irrigation Scheduled',
      field: 'All Fields',
      crop: 'All Crops',
      timestamp: '3 days ago',
      icon: '💧',
      iconBg: 'blue-bg',
      priority: 'Low',
      issue: 'Regular irrigation is due based on your watering schedule.',
      recommendation: 'Water crops in the early morning or late afternoon to minimize evaporation.',
      status: 'Resolved'
    }
  ]);

  const [filterTab, setFilterTab] = useState('Active');

  const handleMarkResolved = (id) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, status: 'Resolved' } : alert
    ));
  };

  const handleDismiss = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const activeAlerts = alerts.filter(a => !a.status || a.status !== 'Resolved');
  const resolvedAlerts = alerts.filter(a => a.status === 'Resolved');
  const highPriorityAlerts = alerts.filter(a => a.priority === 'High');

  const displayAlerts =
    filterTab === 'Active'
      ? activeAlerts
      : filterTab === 'Resolved'
      ? resolvedAlerts
      : alerts;

  const categories = [
    { icon: '💧', name: 'Irrigation', active: 1, bgColor: 'blue-bg' },
    { icon: '🐛', name: 'Pest', active: 1, bgColor: 'red-bg' },
    { icon: '🌱', name: 'Fertilizer', active: 1, bgColor: 'green-bg' },
    { icon: '☁️', name: 'Weather', active: 1, bgColor: 'purple-bg' },
    { icon: '🦠', name: 'Disease', active: 1, bgColor: 'orange-bg' },
    { icon: '🔔', name: 'General', active: 0, bgColor: 'gray-bg' }
  ];

  return (
    <div className="alerts-container">
      {/* Header */}
      <div className="alerts-header">
        <div className="header-content">
          <h1>Alerts & Recommendations</h1>
          <p>AI-generated alerts for your crops</p>
        </div>
        <div className="header-tags">
          <span className="tag high-priority">{highPriorityAlerts.length} High Priority</span>
          <span className="tag active-count">{activeAlerts.length} Active</span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        <StatCard
          label="Total Alerts"
          value={alerts.length}
          icon="🔔"
          bgColor="blue-bg"
        />
        <StatCard
          label="Active Alerts"
          value={activeAlerts.length}
          icon="⚠️"
          bgColor="orange-bg"
        />
        <StatCard
          label="High Priority"
          value={highPriorityAlerts.length}
          icon="⚠️"
          bgColor="red-bg"
        />
        <StatCard
          label="Resolved"
          value={resolvedAlerts.length}
          icon="✓"
          bgColor="green-bg"
        />
      </div>

      {/* Categories Section */}
      <div className="categories-section">
        <h2>Alert Categories</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <AlertCategory
              key={index}
              icon={category.icon}
              category={category.name}
              activeCount={category.active}
              bgColor={category.bgColor}
            />
          ))}
        </div>
      </div>

      {/* All Alerts Section */}
      <div className="all-alerts-section">
        <div className="alerts-section-header">
          <h2>All Alerts</h2>
          <div className="filter-tabs">
            <button
              className={`filter-btn ${filterTab === 'Active' ? 'active' : ''}`}
              onClick={() => setFilterTab('Active')}
            >
              Active
            </button>
            <button
              className={`filter-btn ${filterTab === 'Resolved' ? 'active' : ''}`}
              onClick={() => setFilterTab('Resolved')}
            >
              Resolved
            </button>
            <button
              className={`filter-btn ${filterTab === 'All' ? 'active' : ''}`}
              onClick={() => setFilterTab('All')}
            >
              All
            </button>
          </div>
        </div>

        <div className="alerts-list">
          {displayAlerts.length > 0 ? (
            displayAlerts.map(alert => (
              <AlertItem
                key={alert.id}
                alert={alert}
                onMarkResolved={handleMarkResolved}
                onDismiss={handleDismiss}
              />
            ))
          ) : (
            <div className="no-alerts">
              <p>No {filterTab.toLowerCase()} alerts</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Alerts;
