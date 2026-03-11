import React from 'react';
import '../styles/Dashboard.css';


function Dashboard() {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const statsData = [
    {
      id: 1,
      label: 'Active Fields',
      value: '3',
      description: 'All monitored',
      borderColor: '#2196f3'
    },
    {
      id: 2,
      label: 'Crop Health',
      value: '92%',
      description: 'Excellent condition',
      borderColor: '#4caf50'
    },
    {
      id: 3,
      label: 'Pending Alerts',
      value: '2',
      description: 'Requires attention',
      borderColor: '#ff9800'
    },
    {
      id: 4,
      label: 'Total Production',
      value: '9.5k kg',
      description: '+12% vs last season',
      borderColor: '#9c27b0'
    }
  ];

  const weatherData = {
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 8,
    rainfall: 12,
    tip: 'Good day for irrigation. Soil moisture levels are optimal.'
  };

  const cropStatusData = [
    { name: 'Tomato', percentage: 95, color: '#4caf50' },
    { name: 'Rice', percentage: 92, color: '#4caf50' },
    { name: 'Corn', percentage: 88, color: '#2196f3' }
  ];

  const recentActivitiesData = [
    { type: 'Irrigation', count: 12, date: 'March 9', icon: '💧', color: '#2196f3' },
    { type: 'Fertilizing', count: 5, date: 'March 8', icon: '🌱', color: '#4caf50' },
    { type: 'Pest Control', count: 3, date: 'March 7', icon: '🐛', color: '#ff9800' },
    { type: 'Harvesting', count: 2, date: 'March 6', icon: '🌾', color: '#9c27b0' }
  ];

  return (
    <div className="dashboard">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <h2>Welcome back, Farmer!</h2>
          <p>{dateString}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statsData.map((stat) => (
          <div key={stat.id} className="stat-card" style={{ borderLeftColor: stat.borderColor }}>
            <div className="stat-inner">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-description">{stat.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="main-grid">
        {/* Weather Card */}
        <div className="weather-card">
          <h3>Today's Weather</h3>
          <div className="weather-content">
            <div className="weather-main">
              <div className="temperature">
                <span className="temp-value">{weatherData.temperature}°C</span>
                <span className="condition">{weatherData.condition}</span>
              </div>
              <div className="weather-icon">☁️</div>
            </div>

            <div className="weather-metrics">
              <div className="metric">
                <span className="metric-icon">💧</span>
                <div className="metric-content">
                  <div className="metric-label">Humidity</div>
                  <div className="metric-value">{weatherData.humidity}%</div>
                </div>
              </div>
              <div className="metric">
                <span className="metric-icon">💨</span>
                <div className="metric-content">
                  <div className="metric-label">Wind Speed</div>
                  <div className="metric-value">{weatherData.windSpeed} km/h</div>
                </div>
              </div>
              <div className="metric">
                <span className="metric-icon">🌧️</span>
                <div className="metric-content">
                  <div className="metric-label">Rainfall</div>
                  <div className="metric-value">{weatherData.rainfall}mm</div>
                </div>
              </div>
            </div>

            <div className="farming-tip">
              <p><strong>Farming Tip:</strong> {weatherData.tip}</p>
            </div>
          </div>
        </div>

        {/* Crop Status Overview */}
        <div className="crop-status-card">
          <h3>Crop Status Overview</h3>
          <div className="crop-status-list">
            {cropStatusData.map((crop, index) => (
              <div key={index} className="crop-status-item">
                <div className="crop-info">
                  <span className="crop-name">{crop.name}</span>
                  <span className="crop-percentage">{crop.percentage}%</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${crop.percentage}%`, backgroundColor: crop.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Farm Activities */}
      <div className="recent-activities-section">
        <h3>Recent Farm Activities</h3>
        <div className="activities-grid">
          {recentActivitiesData.map((activity, index) => (
            <div key={index} className="activity-card">
              <div className="activity-header">
                <div className="activity-icon" style={{ backgroundColor: activity.color }}>
                {activity.icon}
              </div>
                <div className="activity-title">
                  <div className="activity-type">{activity.type}</div>
                  <div className="activity-date">{activity.date}</div>
                </div>
              </div>
              <div className="activity-footer">
                <div className="activity-count">{activity.count}</div>
                <div className="activity-label">times</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
