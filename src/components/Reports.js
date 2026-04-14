import React, { useState } from 'react';
import '../styles/Reports.css';

// StatCard Component
function StatCard({ label, value, subtitle, icon, bgColor }) {
  return (
    <div className="stat-card-reports">
      <div className="stat-label-reports">{label}</div>
      <div className="stat-value-reports">{value}</div>
      <div className="stat-subtitle-reports">{subtitle}</div>
      <div className={`stat-icon-reports ${bgColor}`}>{icon}</div>
    </div>
  );
}

// Crop Health & Growth Summary Table Component
function CropHealthSummaryTable() {
  const data = [
    { month: 'October 2025', healthScore: '70%', growthRate: '65%', status: 'Good', trend: '📈' },
    { month: 'November 2025', healthScore: '75%', growthRate: '72%', status: 'Good', trend: '📈' },
    { month: 'December 2025', healthScore: '82%', growthRate: '78%', status: 'Very Good', trend: '📈' },
    { month: 'January 2026', healthScore: '85%', growthRate: '83%', status: 'Very Good', trend: '📈' },
    { month: 'February 2026', healthScore: '88%', growthRate: '87%', status: 'Excellent', trend: '📈' },
    { month: 'March 2026', healthScore: '92%', growthRate: '90%', status: 'Excellent', trend: '📈' }
  ];

  return (
    <div className="summary-table-container">
      <div className="summary-header">
        <h3>🌱 6-Month Crop Health & Growth Summary</h3>
        <p>Monthly performance tracking</p>
      </div>
      <table className="summary-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Health Score</th>
            <th>Growth Rate</th>
            <th>Status</th>
            <th>Trend</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.month}</td>
              <td className="score-cell">{item.healthScore}</td>
              <td className="score-cell">{item.growthRate}</td>
              <td>
                <span className={`status-badge-table status-${item.status.toLowerCase().replace(' ', '-')}`}>
                  {item.status}
                </span>
              </td>
              <td className="trend-cell">{item.trend}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Production Summary Component
function ProductionSummary() {
  const crops = [
    { name: 'Tomato', actual: 2500, target: 3000, achievement: 83, status: 'Below Target', variance: -500 },
    { name: 'Rice', actual: 4200, target: 4000, achievement: 105, status: 'Exceeded', variance: 200 },
    { name: 'Corn', actual: 1800, target: 2200, achievement: 82, status: 'Below Target', variance: -400 },
    { name: 'Vegetables', actual: 950, target: 1000, achievement: 95, status: 'On Track', variance: -50 }
  ];

  const getStatusColor = (status) => {
    if (status === 'Below Target') return 'orange';
    if (status === 'Exceeded') return 'green';
    if (status === 'On Track') return 'blue';
    return 'gray';
  };

  const getVarianceColor = (variance) => {
    return variance >= 0 ? 'green' : 'orange';
  };

  return (
    <div className="production-section">
      {/* Production Table */}
      <div className="production-table-container">
        <div className="production-header">
          <h3>⭕ Production Summary by Crop</h3>
          <p>Current season performance</p>
        </div>
        <table className="production-table">
          <thead>
            <tr>
              <th>Crop</th>
              <th>Actual Yield</th>
              <th>Target</th>
              <th>Achievement</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {crops.map((crop, index) => (
              <tr key={index}>
                <td className="crop-name">{crop.name}</td>
                <td className="yield-cell">{crop.actual.toLocaleString()} kg</td>
                <td>{crop.target.toLocaleString()} kg</td>
                <td className="achievement-cell">{crop.achievement}%</td>
                <td>
                  <span className={`status-badge-prod status-${getStatusColor(crop.status).toLowerCase()}`}>
                    {crop.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Harvest Cards Grid */}
      <div className="harvest-cards-grid">
        {crops.map((crop, index) => (
          <div key={index} className="harvest-card">
            <div className="harvest-card-header">
              <div className="harvest-card-title">
                <span className="harvest-icon">🌱</span>
                <div>
                  <h4>{crop.name}</h4>
                  <p>Harvest Summary</p>
                </div>
              </div>
              <span className={`variance-badge variance-${getVarianceColor(crop.variance)}`}>
                {crop.variance > 0 ? '+' : ''}{crop.variance} kg
              </span>
            </div>
            <div className="harvest-card-details">
              <div className="stat-box">
                <span className="stat-label">Actual Yield</span>
                <span className="stat-val">{crop.actual}</span>
                <span className="stat-unit">kg</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Target</span>
                <span className="stat-val">{crop.target}</span>
                <span className="stat-unit">kg</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Achievement</span>
                <span className="stat-val">{crop.achievement}%</span>
                <span className="stat-unit">rate</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Resource Usage Component
function ResourceUsage() {
  const resources = [
    { name: 'Water', january: '2,000 L', february: '2,200 L', march: '2,100 L', total: '6,300 L', avg: '2,100 L/month' },
    { name: 'Fertilizer', january: '150 kg', february: '180 kg', march: '160 kg', total: '490 kg', avg: '163 kg/month' },
    { name: 'Pesticide', january: '20 L', february: '25 L', march: '18 L', total: '63 L', avg: '21 L/month' }
  ];

  return (
    <div className="resource-table-container">
      <div className="resource-header">
        <h3>⚡ 3-Month Resource Usage</h3>
        <p>Water, fertilizer, and pesticide consumption</p>
      </div>
      <table className="resource-table">
        <thead>
          <tr>
            <th>Resource</th>
            <th>January</th>
            <th>February</th>
            <th>March</th>
            <th>Total</th>
            <th>Average/Month</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource, index) => (
            <tr key={index}>
              <td className="resource-name">{resource.name}</td>
              <td>{resource.january}</td>
              <td>{resource.february}</td>
              <td>{resource.march}</td>
              <td className="total-cell">{resource.total}</td>
              <td className="avg-cell">{resource.avg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Expense Breakdown Component
function ExpenseBreakdown() {
  const expenses = [
    { category: 'Seeds & Seedlings', percentage: '15%', amount: '₱12,500', color: 'teal' },
    { category: 'Fertilizers', percentage: '21%', amount: '₱18,200', color: 'green' },
    { category: 'Pesticides', percentage: '10%', amount: '₱8,500', color: 'orange' },
    { category: 'Labor', percentage: '29%', amount: '₱25,000', color: 'purple' },
    { category: 'Water & Irrigation', percentage: '8%', amount: '₱6,500', color: 'cyan' },
    { category: 'Tools & Equipment', percentage: '17%', amount: '₱15,000', color: 'blue' }
  ];

  const getColorClass = (color) => `expense-item-${color}`;

  return (
    <div className="expense-breakdown-container">
      <div className="expense-header">
        <h3>💵 Expense Breakdown</h3>
        <p>Cost allocation by category</p>
      </div>
      <div className="expense-list">
        {expenses.map((expense, index) => (
          <div key={index} className={`expense-item ${getColorClass(expense.color)}`}>
            <div className="expense-info">
              <h4>{expense.category}</h4>
              <p>{expense.percentage} of total budget</p>
            </div>
            <span className="expense-amount">{expense.amount}</span>
          </div>
        ))}
      </div>
      <div className="total-expenses-box">
        <span>Total Expenses</span>
        <span className="total-amount">₱85,700</span>
      </div>
    </div>
  );
}

// Cost Efficiency Component
function CostEfficiency() {
  return (
    <div className="cost-efficiency-container">
      <div className="cost-efficiency-header">
        <h3>📊 Cost Efficiency Metrics</h3>
      </div>
      <div className="metrics-grid">
        <div className="metric-card metric-green">
          <div className="metric-top">
            <span>Cost per Hectare</span>
            <span className="metric-icon">📈</span>
          </div>
          <div className="metric-value">₱16,863</div>
          <div className="metric-desc">Based on 5.1 hectares total</div>
        </div>

        <div className="metric-card metric-blue">
          <div className="metric-top">
            <span>Cost per Kilogram</span>
            <span className="metric-icon">💰</span>
          </div>
          <div className="metric-value">₱9.10</div>
          <div className="metric-desc">Based on 9,450 kg total yield</div>
        </div>

        <div className="metric-card metric-purple">
          <div className="metric-top">
            <span>Efficiency Rating</span>
            <span className="metric-icon">⭐</span>
          </div>
          <div className="metric-value">87%</div>
          <div className="metric-desc">Above industry average</div>
        </div>
      </div>
    </div>
  );
}

// Top Expense Categories Component
function TopExpenseCategories() {
  const topExpenses = [
    { rank: 1, category: 'Labor', amount: '₱25,000', percentage: '29%' },
    { rank: 2, category: 'Fertilizers', amount: '₱18,200', percentage: '21%' },
    { rank: 3, category: 'Tools & Equipment', amount: '₱15,000', percentage: '17%' }
  ];

  return (
    <div className="top-expenses-container">
      <h3>🎆 Top Expense Categories</h3>
      <p>Your biggest cost drivers this season</p>
      <div className="top-expenses-grid">
        {topExpenses.map((expense, index) => (
          <div key={index} className="top-expense-card">
            <div className="rank-badge">{expense.rank}</div>
            <h4>{expense.category}</h4>
            <div className="expense-details">
              <span className="amount">{expense.amount}</span>
              <span className="percentage">{expense.percentage} of budget</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Activities Summary Component
function ActivitiesSummary() {
  const activities = [
    { type: 'Irrigation', count: 42, percentage: 35, lastPerformed: 'March 9, 2026' },
    { type: 'Planting', count: 24, percentage: 20, lastPerformed: 'March 5, 2026' },
    { type: 'Fertilizing', count: 24, percentage: 20, lastPerformed: 'March 8, 2026' },
    { type: 'Pest Control', count: 18, percentage: 15, lastPerformed: 'March 7, 2026' },
    { type: 'Harvesting', count: 12, percentage: 10, lastPerformed: 'March 6, 2026' }
  ];

  const timelineData = [
    { 
      month: 'March 2026', 
      count: 42, 
      color: 'blue',
      activities: [
        { name: 'Irrigation', count: 12 },
        { name: 'Fertilizing', count: 5 },
        { name: 'Pest Control', count: 3 }
      ]
    },
    { 
      month: 'February 2026', 
      count: 38, 
      color: 'green',
      activities: [
        { name: 'Irrigation', count: 10 },
        { name: 'Fertilizing', count: 8 }
      ]
    },
    { 
      month: 'January 2026', 
      count: 35, 
      color: 'purple',
      activities: [
        { name: 'Planting', count: 15 },
        { name: 'Irrigation', count: 8 }
      ]
    }
  ];

  return (
    <div className="activities-section">
      {/* Activities Table */}
      <div className="activities-table-container">
        <div className="activities-header">
          <h3>📊 Farm Activities Summary</h3>
          <p>Activity breakdown for this season</p>
        </div>
        <table className="activities-table">
          <thead>
            <tr>
              <th>Activity Type</th>
              <th>Total Count</th>
              <th>Percentage</th>
              <th>Last Performed</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index}>
                <td className="activity-name">
                  {activity.type}
                </td>
                <td>
                  <span className="count-badge">{activity.count} times</span>
                </td>
                <td>
                  <div className="percentage-bar">
                    <div className="percentage-fill" style={{ width: `${activity.percentage}%` }}></div>
                    <span className="percentage-text">{activity.percentage}%</span>
                  </div>
                </td>
                <td>{activity.lastPerformed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Timeline Section */}
      <div className="timeline-container">
        <h3>📅 Monthly Activity Timeline</h3>
        <div className="timeline">
          {timelineData.map((period, index) => (
            <div key={index} className={`timeline-item timeline-${period.color}`}>
              <div className={`timeline-marker marker-${period.color}`}>📅</div>
              <div className="timeline-content">
                <h4>{period.month}</h4>
                <p className="activity-count">{period.count} activities recorded</p>
                <div className="timeline-activities">
                  {period.activities.map((activity, idx) => (
                    <div key={idx} className="timeline-activity">
                      <span>{activity.name}</span>
                      <span className={`activity-count-badge count-${period.color}`}>
                        {activity.count} times
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Key Insights Component
function KeyInsights() {
  const insights = [
    { icon: '📈', title: 'Steady Growth', description: 'Health score improved by 22% over 6 months', color: 'green' },
    { icon: '✓', title: 'Optimal Conditions', description: 'Current crop health is in excellent range', color: 'blue' },
    { icon: '⭕', title: 'Consistent Improvement', description: 'Growth rate increased every month', color: 'purple' }
  ];

  return (
    <div className="insights-container">
      <h3>⚡ Key Insights</h3>
      <div className="insights-grid">
        {insights.map((insight, index) => (
          <div key={index} className={`insight-card insight-${insight.color}`}>
            <div className="insight-icon">{insight.icon}</div>
            <div className="insight-content">
              <h4>{insight.title}</h4>
              <p>{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Growth Factors Component
function GrowthFactors() {
  const factors = [
    { name: 'Irrigation Management', icon: '💧', percentage: 95, color: 'blue' },
    { name: 'Nutrient Application', icon: '🌿', percentage: 85, color: 'green' },
    { name: 'Pest Management', icon: '🌞', percentage: 75, color: 'orange' }
  ];

  return (
    <div className="growth-factors-container">
      <h3>🚀 Growth Factors Performance</h3>
      <div className="factors-list">
        {factors.map((factor, index) => (
          <div key={index} className={`factor-card factor-${factor.color}`}>
            <div className={`factor-icon-circle icon-${factor.color}`}>{factor.icon}</div>
            <div className="factor-content">
              <h4>{factor.name}</h4>
              <span className="factor-percentage">{factor.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Reports Component
function Reports() {
  const [activeTab, setActiveTab] = useState('Crop Growth');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="reports-container">
      {/* Header */}
      <div className="reports-header-section">
        <div className="header-content">
          <h1>Farm Reports & Analytics</h1>
          <p>Comprehensive performance insights</p>
        </div>
        <button className="print-btn no-print" onClick={handlePrint}>
          🖨️ Print Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard
          label="Total Production"
          value="9,450 kg"
          subtitle="↑ +12% vs last season"
          icon="🌱"
          bgColor="green-bg"
        />
        <StatCard
          label="Total Expenses"
          value="₱85.7k"
          subtitle="This season"
          icon="💰"
          bgColor="orange-bg"
        />
        <StatCard
          label="Active Fields"
          value="3"
          subtitle="All monitored"
          icon="📊"
          bgColor="blue-bg"
        />
        <StatCard
          label="Avg Crop Health"
          value="92%"
          subtitle="Excellent"
          icon="📈"
          bgColor="purple-bg"
        />
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-btn no-print ${activeTab === 'Crop Growth' ? 'active' : ''}`}
          onClick={() => setActiveTab('Crop Growth')}
        >
          Crop Growth
        </button>
        <button
          className={`tab-btn no-print ${activeTab === 'Production' ? 'active' : ''}`}
          onClick={() => setActiveTab('Production')}
        >
          Production
        </button>
        <button
          className={`tab-btn no-print ${activeTab === 'Activities' ? 'active' : ''}`}
          onClick={() => setActiveTab('Activities')}
        >
          Activities
        </button>
        <button
          className={`tab-btn no-print ${activeTab === 'Resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('Resources')}
        >
          Resources
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'Crop Growth' && (
          <div className="tab-pane">
            <CropHealthSummaryTable />
            <div className="insights-row">
              <KeyInsights />
              <GrowthFactors />
            </div>
          </div>
        )}

        {activeTab === 'Production' && (
          <div className="tab-pane">
            <ProductionSummary />
          </div>
        )}

        {activeTab === 'Activities' && (
          <div className="tab-pane">
            <ActivitiesSummary />
          </div>
        )}

        {activeTab === 'Resources' && (
          <div className="tab-pane">
            <ResourceUsage />
            <div className="resources-row">
              <ExpenseBreakdown />
              <CostEfficiency />
            </div>
            <TopExpenseCategories />
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;
