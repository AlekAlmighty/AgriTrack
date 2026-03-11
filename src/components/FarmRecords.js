import React, { useState } from 'react';
import '../styles/FarmRecords.css';

function FarmRecords() {
  const [records, setRecords] = useState([
    {
      id: 1,
      title: 'Tomato Seedling Transplant',
      field: 'Rice Field A',
      crop: 'Tomato',
      quantity: '500 seedlings',
      date: 'Mar 4',
      notes: 'Transplanted healthy seedlings',
      icon: '✅',
      color: '#c8e6c9'
    },
    {
      id: 2,
      title: 'Drip Irrigation',
      field: 'Rice Field A',
      crop: 'Tomato',
      quantity: '2000 liters',
      date: 'Mar 3',
      notes: 'Morning irrigation session',
      icon: '💧',
      color: '#b3e5fc'
    },
    {
      id: 3,
      title: 'Nitrogen Fertilizer Application',
      field: 'Corn Field B',
      crop: 'Corn',
      quantity: '50 kg',
      date: 'Mar 2',
      notes: 'Applied to promote growth',
      price: '₹2,500',
      icon: '🌿',
      color: '#ffe0b2'
    },
    {
      id: 4,
      title: 'Aphid Control Spray',
      field: 'Vegetable Plot C',
      crop: 'Vegetables',
      quantity: '5 liters',
      date: 'Mar 1',
      notes: 'Organic pesticide used',
      price: '₹800',
      icon: '🐛',
      color: '#ffccbc'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    field: '',
    crop: '',
    quantity: '',
    notes: ''
  });

  const activityTypes = [
    { name: 'Planting', icon: '✅', count: 1, color: '#c8e6c9' },
    { name: 'Irrigation', icon: '💧', count: 1, color: '#b3e5fc' },
    { name: 'Fertilizer', icon: '🌿', count: 1, color: '#ffe0b2' },
    { name: 'Pest', icon: '🐛', count: 1, color: '#ffccbc' },
    { name: 'Harvest', icon: '🌕', count: 0, color: '#f8bbd0' },
    { name: 'Expenses', icon: '💰', count: 0, color: '#e1bee7' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddRecord = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      const newRecord = {
        id: records.length + 1,
        ...formData,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        icon: '📋',
        color: '#e3f2fd'
      };
      setRecords([newRecord, ...records]);
      setFormData({ title: '', field: '', crop: '', quantity: '', notes: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="farm-records">
      <div className="records-header">
        <div>
          <h2>Farm Records</h2>
          <p>Track all your farming activities</p>
        </div>
        <button className="add-record-btn" onClick={() => setShowForm(!showForm)}>
            ➕ Add Record
          </button>
      </div>

      {/* Add Record Form */}
      {showForm && (
        <div className="add-record-form">
          <form onSubmit={handleAddRecord}>
            <div className="form-group">
              <label>Activity Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter activity title"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Field Name</label>
                <input
                  type="text"
                  name="field"
                  value={formData.field}
                  onChange={handleInputChange}
                  placeholder="Field name"
                />
              </div>
              <div className="form-group">
                <label>Crop</label>
                <input
                  type="text"
                  name="crop"
                  value={formData.crop}
                  onChange={handleInputChange}
                  placeholder="Crop name"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Quantity"
              />
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Additional notes"
                rows="3"
              ></textarea>
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">Save Record</button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Activity Types Summary */}
      <div className="activity-summary">
        {activityTypes.map((activity, index) => (
          <div key={index} className="activity-type">
            <span className="activity-icon">{activity.icon}</span>
            <div className="activity-info">
              <div className="activity-name">{activity.name}</div>
              <div className="activity-count">{activity.count}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Records List */}
      <div className="records-section">
        <h3>Activity Records</h3>
        <div className="records-list">
          {records.map((record) => (
            <div key={record.id} className="record-item">
              <div className="record-icon" style={{ backgroundColor: record.color }}>
                {record.icon}
              </div>
              <div className="record-content">
                <h4>{record.title}</h4>
                <div className="record-details">
                  <span>Field: {record.field}</span>
                  <span>Crop: {record.crop}</span>
                  <span>Qty: {record.quantity}</span>
                  {record.price && <span className="price">{record.price}</span>}
                </div>
                {record.notes && <p className="record-notes">{record.notes}</p>}
              </div>
              <div className="record-date">{record.date}</div>
              <div className="record-actions">
                <button className="edit-btn">✏️</button>
                <button className="delete-btn">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FarmRecords;
