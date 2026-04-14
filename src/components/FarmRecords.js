import React, { useState } from 'react';
import '../styles/FarmRecords.css';

function FarmRecords() {
  const [crops, setCrops] = useState([
    {
      id: 1,
      name: 'Tomato',
      field: 'Rice Field A',
      stock: { amount: 500, unit: 'seedlings' },
      color: '#c8e6c9'
    },
    {
      id: 2,
      name: 'Corn',
      field: 'Corn Field B',
      stock: { amount: 120, unit: 'kg' },
      color: '#ffe0b2'
    },
    {
      id: 3,
      name: 'Vegetables',
      field: 'Vegetable Plot C',
      stock: { amount: 50, unit: 'kg' },
      color: '#ffccbc'
    }
  ]);

  const [records, setRecords] = useState([
    {
      id: 1,
      title: 'Tomato Seedling Transplant',
      field: 'Rice Field A',
      crop: 'Tomato',
      quantity: { amount: 500, unit: 'seedlings' },
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
      quantity: { amount: 2000, unit: 'liters' },
      date: 'Mar 3',
      notes: 'Morning irrigation session',
      icon: '💧',
      color: '#b3e5fc'
    },
    {
      id: 3,
      title: 'Fertilizer Application',
      field: 'Corn Field B',
      crop: 'Corn',
      quantity: { amount: 50, unit: 'kg' },
      date: 'Mar 2',
      notes: 'Promoting healthy growth',
      icon: '🌿',
      color: '#ffe0b2'
    }
  ]);

  const [selectedCrop, setSelectedCrop] = useState('All Crops');
  const [showCropForm, setShowCropForm] = useState(false);
  const [showRecordForm, setShowRecordForm] = useState(false);
  const [cropForm, setCropForm] = useState({ name: '', field: '', stock: '' });
  const [recordForm, setRecordForm] = useState({ title: '', field: '', crop: '', quantity: '', notes: '' });
  const [editCropId, setEditCropId] = useState(null);
  const [editRecordId, setEditRecordId] = useState(null);

  const parseQuantity = (value) => {
    const match = String(value).trim().match(/^([0-9,.]+)\s*(.*)$/);
    const amount = match ? parseFloat(match[1].replace(/,/g, '')) : 0;
    const unit = match ? match[2].trim() : '';
    return { amount: Number.isNaN(amount) ? 0 : amount, unit };
  };

  const formatQuantity = (quantity) => {
    if (!quantity) return '';
    const { amount, unit } = quantity;
    return `${amount}${unit ? ` ${unit}` : ''}`.trim();
  };

  const changeQuantities = (base, delta) => {
    if (!base && !delta) return { amount: 0, unit: '' };
    if (!base) return delta;
    if (!delta || delta.amount === 0) return base;

    const baseUnit = base.unit?.toLowerCase() || '';
    const deltaUnit = delta.unit?.toLowerCase() || baseUnit;
    if (!baseUnit || !deltaUnit || baseUnit === deltaUnit) {
      return {
        amount: Math.max(0, base.amount + delta.amount),
        unit: base.unit || delta.unit
      };
    }
    return base;
  };

  const addQuantities = (base, additional) => changeQuantities(base, additional);
  const subtractQuantities = (base, reduction) => changeQuantities(base, { ...reduction, amount: reduction.amount * -1 });

  const cropNames = Array.from(new Set(crops.map((crop) => crop.name)));
  const visibleRecords = selectedCrop === 'All Crops'
    ? records
    : records.filter((record) => record.crop === selectedCrop);

  const handleCropInputChange = (e) => {
    const { name, value } = e.target;
    setCropForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecordInputChange = (e) => {
    const { name, value } = e.target;
    setRecordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveCrop = (e) => {
    e.preventDefault();
    if (!cropForm.name.trim()) return;

    const parsedStock = parseQuantity(cropForm.stock);
    if (editCropId) {
      setCrops((prev) => prev.map((crop) => (
        crop.id === editCropId ? { ...crop, ...cropForm, stock: parsedStock } : crop
      )));
    } else {
      setCrops((prev) => [
        {
          id: prev.length ? Math.max(...prev.map((item) => item.id)) + 1 : 1,
          color: '#e3f2fd',
          ...cropForm,
          stock: parsedStock
        },
        ...prev
      ]);
    }

    setCropForm({ name: '', field: '', stock: '' });
    setEditCropId(null);
    setShowCropForm(false);
  };

  const handleSaveRecord = (e) => {
    e.preventDefault();
    if (!recordForm.title.trim()) return;
    if (!recordForm.crop) return;

    const parsedQuantity = parseQuantity(recordForm.quantity);
    const newRecord = {
      ...recordForm,
      quantity: parsedQuantity,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      icon: '📋',
      color: '#e3f2fd'
    };

    if (editRecordId) {
      const previousRecord = records.find((record) => record.id === editRecordId);
      setRecords((prev) => prev.map((record) => (
        record.id === editRecordId ? { ...record, ...newRecord, id: editRecordId } : record
      )));

      if (previousRecord) {
        setCrops((prev) => prev.map((crop) => {
          if (crop.name === previousRecord.crop && crop.name === recordForm.crop) {
            const difference = {
              amount: parsedQuantity.amount - (previousRecord.quantity?.amount || 0),
              unit: parsedQuantity.unit || previousRecord.quantity?.unit || ''
            };
            return { ...crop, stock: changeQuantities(crop.stock, difference) };
          }

          if (crop.name === previousRecord.crop && crop.name !== recordForm.crop) {
            return { ...crop, stock: subtractQuantities(crop.stock, previousRecord.quantity) };
          }

          if (crop.name === recordForm.crop && crop.name !== previousRecord.crop) {
            return { ...crop, stock: addQuantities(crop.stock, parsedQuantity) };
          }

          return crop;
        }));
      }
    } else {
      setRecords((prev) => [
        {
          id: prev.length ? Math.max(...prev.map((item) => item.id)) + 1 : 1,
          ...newRecord
        },
        ...prev
      ]);

      setCrops((prev) => prev.map((crop) => (
        crop.name === recordForm.crop
          ? { ...crop, stock: addQuantities(crop.stock, parsedQuantity) }
          : crop
      )));
    }

    if (recordForm.crop) {
      setSelectedCrop(recordForm.crop);
    }

    setRecordForm({ title: '', field: '', crop: '', quantity: '', notes: '' });
    setEditRecordId(null);
    setShowRecordForm(false);
  };

  const handleEditCrop = (crop) => {
    setCropForm({ name: crop.name, field: crop.field, stock: formatQuantity(crop.stock) });
    setEditCropId(crop.id);
    setShowCropForm(true);
  };

  const handleDeleteCrop = (cropId) => {
    const cropToDelete = crops.find((crop) => crop.id === cropId);
    if (!cropToDelete) return;

    setCrops((prev) => prev.filter((crop) => crop.id !== cropId));
    setRecords((prev) => prev.filter((record) => record.crop !== cropToDelete.name));

    if (selectedCrop === cropToDelete.name) {
      setSelectedCrop('All Crops');
    }
  };

  const handleEditRecord = (record) => {
    setRecordForm({
      title: record.title,
      field: record.field,
      crop: record.crop,
      quantity: formatQuantity(record.quantity),
      notes: record.notes
    });
    setEditRecordId(record.id);
    setShowRecordForm(true);
  };

  const handleDeleteRecord = (recordId) => {
    const recordToDelete = records.find((record) => record.id === recordId);
    if (recordToDelete) {
      setCrops((prev) => prev.map((crop) => (
        crop.name === recordToDelete.crop
          ? { ...crop, stock: subtractQuantities(crop.stock, recordToDelete.quantity) }
          : crop
      )));
    }

    setRecords((prev) => prev.filter((record) => record.id !== recordId));
  };

  const handleCropFilter = (name) => {
    setSelectedCrop(name);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="farm-records">
      <div className="records-header">
        <div>
          <h2>Crop Inventory</h2>
          <p>Manage crop items and related activity records separately.</p>
        </div>
        <button className="print-btn no-print" onClick={handlePrint}>
          🖨️ Print Summary
        </button>
      </div>

      <div className="records-layout">
        <section className="section-card inventory-panel">
          <div className="section-title-row">
            <div>
              <h3>Crop Inventory</h3>
              <p className="inventory-description">Simple crop list with stock totals only.</p>
            </div>
            <button className="secondary-btn no-print" onClick={() => {
              setShowCropForm(!showCropForm);
              setShowRecordForm(false);
              setEditCropId(null);
              setCropForm({ name: '', field: '', stock: '' });
            }}>
              + Add Crop
            </button>
          </div>

          {showCropForm && (
            <div className="add-record-form">
              <form onSubmit={handleSaveCrop}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Crop Name</label>
                    <input
                      type="text"
                      name="name"
                      value={cropForm.name}
                      onChange={handleCropInputChange}
                      placeholder="Tomato"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Field</label>
                    <select
                      name="field"
                      value={cropForm.field}
                      onChange={handleCropInputChange}
                      required
                    >
                      <option value="">Select Field</option>
                      <option value="Rice Field A">Rice Field A</option>
                      <option value="Rice Field B">Rice Field B</option>
                      <option value="Rice Field C">Rice Field C</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Stock</label>
                    <input
                      type="text"
                      name="stock"
                      value={cropForm.stock}
                      onChange={handleCropInputChange}
                      placeholder="500 seedlings"
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-btn">{editCropId ? 'Update Crop' : 'Save Crop'}</button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowCropForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="crop-list">
            {crops.map((crop) => (
              <div key={crop.id} className="crop-card">
                <div className="crop-card-details">
                  <div className="crop-name">{crop.name}</div>
                  <div className="crop-meta">Field: {crop.field}</div>
                  <div className="crop-meta">Stock: {formatQuantity(crop.stock)}</div>
                </div>
                <div className="crop-actions">
                  <button className="icon-btn edit-btn no-print" onClick={() => handleEditCrop(crop)}>✏️</button>
                  <button className="icon-btn delete-btn no-print" onClick={() => handleDeleteCrop(crop.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-card records-panel">
          <div className="section-title-row">
            <div>
              <h3>Activity Records</h3>
              <p>CRUD operations for each crop record.</p>
            </div>
            <button className="secondary-btn no-print" onClick={() => {
              setShowRecordForm(!showRecordForm);
              setShowCropForm(false);
              setEditRecordId(null);
              setRecordForm({ title: '', field: '', crop: '', quantity: '', notes: '' });
            }}>
              + Add Record
            </button>
          </div>

          <div className="filter-row">
            <button
              className={`filter-btn no-print ${selectedCrop === 'All Crops' ? 'active' : ''}`}
              onClick={() => handleCropFilter('All Crops')}
            >
              All Crops
            </button>
            {cropNames.map((name) => (
              <button
                key={name}
                className={`filter-btn no-print ${selectedCrop === name ? 'active' : ''}`}
                onClick={() => handleCropFilter(name)}
              >
                {name}
              </button>
            ))}
          </div>

          {showRecordForm && (
            <div className="add-record-form">
              <form onSubmit={handleSaveRecord}>
                <div className="form-group">
                  <label>Record Title</label>
                  <input
                    type="text"
                    name="title"
                    value={recordForm.title}
                    onChange={handleRecordInputChange}
                    placeholder="Enter record title"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Field Name</label>
                    <select
                      name="field"
                      value={recordForm.field}
                      onChange={handleRecordInputChange}
                      required
                    >
                      <option value="">Select Field</option>
                      <option value="Rice Field A">Rice Field A</option>
                      <option value="Rice Field B">Rice Field B</option>
                      <option value="Rice Field C">Rice Field C</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Crop</label>
                    <select
                      name="crop"
                      value={recordForm.crop}
                      onChange={handleRecordInputChange}
                      required
                    >
                      <option value="">Select Crop</option>
                      {cropNames.map((name) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="text"
                      name="quantity"
                      value={recordForm.quantity}
                      onChange={handleRecordInputChange}
                      placeholder="Quantity"
                    />
                  </div>
                  <div className="form-group">
                    <label>Notes</label>
                    <textarea
                      name="notes"
                      value={recordForm.notes}
                      onChange={handleRecordInputChange}
                      placeholder="Notes"
                      rows="2"
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-btn">{editRecordId ? 'Update Record' : 'Save Record'}</button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowRecordForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="records-list">
            {visibleRecords.map((record) => (
              <div key={record.id} className="record-item">
                <div className="record-icon" style={{ backgroundColor: record.color }}>
                  {record.icon}
                </div>
                <div className="record-content">
                  <h4>{record.title}</h4>
                  <div className="record-details">
                    <span>Field: {record.field}</span>
                    <span>Crop: {record.crop}</span>
                    <span>Qty: {formatQuantity(record.quantity)}</span>
                  </div>
                  {record.notes && <p className="record-notes">{record.notes}</p>}
                </div>
                <div className="record-date">{record.date}</div>
                <div className="record-actions">
                  <button className="icon-btn edit-btn no-print" onClick={() => handleEditRecord(record)}>✏️</button>
                  <button className="icon-btn delete-btn no-print" onClick={() => handleDeleteRecord(record.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default FarmRecords;
