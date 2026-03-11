import React, { useState } from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import FarmRecords from './components/FarmRecords';
import Reports from './components/Reports';
import Alerts from './components/Alerts';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="app">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'farmRecords' && <FarmRecords />}
        {activeTab === 'reports' && <Reports />}
        {activeTab === 'alerts' && <Alerts />}
      </main>
    </div>
  );
}

export default App;
