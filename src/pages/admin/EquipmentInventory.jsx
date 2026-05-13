import React, { useState, useEffect } from 'react';
import './EquipmentInventory.css';

const defaultEquipment = [
  {
    id: 'EQP001',
    itemName: 'Dell XPS 15',
    category: 'Electronics',
    quantity: 2,
    condition: 'Good',
    dateAcquired: '2022-05-15',
    assignedTo: 'EMP01'
  },
  {
    id: 'EQP002',
    itemName: 'Office Chair',
    category: 'Furniture',
    quantity: 15,
    condition: 'New',
    dateAcquired: '2023-11-01',
    assignedTo: ''
  }
];

const STORAGE_KEY = 'dilgEquipmentData';
const PERSONNEL_KEY = 'dilgPersonnelData';

const EquipmentInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [personnelList, setPersonnelList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  
  const [form, setForm] = useState({
    id: '',
    itemName: '',
    category: 'Electronics',
    quantity: 1,
    condition: 'New',
    dateAcquired: new Date().toISOString().split('T')[0],
    assignedTo: ''
  });

  useEffect(() => {
    // Load Equipment
    const storedEquipment = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (storedEquipment && storedEquipment.length > 0) {
      setInventory(storedEquipment);
    } else {
      setInventory(defaultEquipment);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEquipment));
    }

    // Load Personnel for "Assigned To" dropdown
    const storedPersonnel = JSON.parse(localStorage.getItem(PERSONNEL_KEY) || '[]');
    setPersonnelList(storedPersonnel);
  }, []);

  useEffect(() => {
    if (inventory.length > 0 || localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
    }
  }, [inventory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      id: '',
      itemName: '',
      category: 'Electronics',
      quantity: 1,
      condition: 'New',
      dateAcquired: new Date().toISOString().split('T')[0],
      assignedTo: ''
    });
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.itemName || !form.quantity || !form.dateAcquired) {
      setMessage('Please fill out the item name, quantity, and date acquired.');
      return;
    }

    if (isEditing) {
      setInventory(current => current.map(item => item.id === form.id ? form : item));
      setMessage('Equipment updated successfully.');
    } else {
      const newId = `EQP${Date.now()}`;
      setInventory(current => [...current, { ...form, id: newId }]);
      setMessage('New equipment added to inventory.');
    }

    resetForm();
    setTimeout(() => setMessage(''), 5000);
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this item from the inventory?')) {
      setInventory(current => current.filter(item => item.id !== id));
      if (form.id === id) resetForm();
      setMessage('Equipment removed.');
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const getPersonnelName = (id) => {
    const person = personnelList.find(p => p.id === id);
    return person ? person.fullName : 'Unassigned';
  };

  const getConditionBadgeClass = (condition) => {
    switch (condition.toLowerCase()) {
      case 'new': return 'badge-new';
      case 'good': return 'badge-good';
      case 'fair': return 'badge-fair';
      case 'poor': return 'badge-poor';
      default: return '';
    }
  };

  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <h2>Equipment Inventory</h2>
        <p>Manage office equipment, track assets, and assign items to personnel.</p>
      </div>

      <div className="inventory-card">
        <h3 className="inventory-card-title">{isEditing ? 'Edit Equipment' : 'Add New Equipment'}</h3>
        {message && <div className="message-alert">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="inventory-form">
            <div className="form-group">
              <label>Item Name</label>
              <input 
                type="text" 
                name="itemName" 
                value={form.itemName} 
                onChange={handleChange} 
                placeholder="e.g. Printer, Laptop" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input 
                type="number" 
                name="quantity" 
                value={form.quantity} 
                onChange={handleChange} 
                min="1" 
                required 
              />
            </div>

            <div className="form-group">
              <label>Condition</label>
              <select name="condition" value={form.condition} onChange={handleChange}>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date Acquired</label>
              <input 
                type="date" 
                name="dateAcquired" 
                value={form.dateAcquired} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Assigned To</label>
              <select name="assignedTo" value={form.assignedTo} onChange={handleChange}>
                <option value="">-- Unassigned --</option>
                {personnelList.map(person => (
                  <option key={person.id} value={person.id}>
                    {person.fullName} ({person.department})
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {isEditing ? 'Save Changes' : 'Add to Inventory'}
            </button>
            {isEditing && (
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="inventory-card">
        <h3 className="inventory-card-title">Inventory List ({inventory.length} items)</h3>
        
        <div className="inventory-table-container">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Condition</th>
                <th>Assigned To</th>
                <th>Date Acquired</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                    No equipment found in inventory.
                  </td>
                </tr>
              ) : (
                inventory.map(item => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: '500', color: 'var(--color-text-muted)' }}>{item.id}</td>
                    <td style={{ fontWeight: '600' }}>{item.itemName}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <span className={`badge ${getConditionBadgeClass(item.condition)}`}>
                        {item.condition}
                      </span>
                    </td>
                    <td>{getPersonnelName(item.assignedTo)}</td>
                    <td>{item.dateAcquired}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
                        <button className="btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EquipmentInventory;
