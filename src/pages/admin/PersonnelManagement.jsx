import React, { useState, useEffect } from 'react';
import './PersonnelManagement.css';

const defaultPersonnel = [
  {
    id: 'EMP01',
    fullName: 'Bagus Fikri',
    title: 'CEO',
    email: 'bagusfikri@gmail.com',
    phone: '+62 123 123 123',
    status: 'Active',
    department: 'Management',
    type: 'Fulltime',
    joined: '29 Oct 2020',
  },
  {
    id: 'EMP02',
    fullName: 'Ihdizein',
    title: 'Illustrator',
    email: 'ihdizein@gmail.com',
    phone: '(40) 768 082 716',
    status: 'Active',
    department: 'Design',
    type: 'Fulltime',
    joined: '1 Feb 2019',
  },
];

const STORAGE_KEY = 'dilgPersonnelData';

const PersonnelManagement = () => {
  const [personnel, setPersonnel] = useState([]);
  const [form, setForm] = useState({
    id: '',
    fullName: '',
    title: '',
    email: '',
    phone: '',
    status: 'Active',
    department: '',
    type: 'Fulltime',
    joined: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    setPersonnel(stored && stored.length ? stored : defaultPersonnel);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(personnel));
  }, [personnel]);

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setForm({
      id: '',
      fullName: '',
      title: '',
      email: '',
      phone: '',
      status: 'Active',
      department: '',
      type: 'Fulltime',
      joined: '',
    });
    setIsEditing(false);
    setMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.fullName || !form.email || !form.title) {
      setMessage('Please complete the full name, email, and title fields.');
      return;
    }

    if (isEditing) {
      setPersonnel((current) => current.map((item) => (item.id === form.id ? form : item)));
      setMessage('Personnel updated successfully.');
    } else {
      const nextId = `EMP${Date.now()}`;
      setPersonnel((current) => [...current, { ...form, id: nextId }]);
      setMessage('Personnel added successfully.');
    }

    resetForm();
  };

  const handleEdit = (person) => {
    setForm(person);
    setIsEditing(true);
    setMessage('Editing personnel record. Save to apply changes.');
  };

  const handleDelete = (personId) => {
    if (!window.confirm('Remove this personnel from the list?')) {
      return;
    }
    setPersonnel((current) => current.filter((item) => item.id !== personId));
    if (form.id === personId) {
      resetForm();
    }
  };

  return (
    <div className="personnel-page">
      <div className="personnel-top">
        <div>
          <h2>Personnel Management</h2>
          <p>Manage employees, add new personnel, and update or remove records from the admin portal.</p>
        </div>
      </div>

      <div className="personnel-body">
        <section className="personnel-form-card">
          <div className="card-header">
            <h3>{isEditing ? 'Edit Personnel' : 'Add Personnel'}</h3>
          </div>
          {message && <div className="personnel-message">{message}</div>}
          <form className="personnel-form" onSubmit={handleSubmit}>
            <label>
              Full name
              <input value={form.fullName} onChange={(e) => handleChange('fullName', e.target.value)} placeholder="e.g. Bagus Fikri" />
            </label>
            <label>
              Job title
              <input value={form.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="e.g. Project Manager" />
            </label>
            <label>
              Email
              <input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="email@example.com" />
            </label>
            <label>
              Phone
              <input value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+63 912 345 6789" />
            </label>
            <label>
              Department
              <input value={form.department} onChange={(e) => handleChange('department', e.target.value)} placeholder="e.g. Management" />
            </label>
            <label>
              Status
              <select value={form.status} onChange={(e) => handleChange('status', e.target.value)}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
            <label>
              Employment type
              <select value={form.type} onChange={(e) => handleChange('type', e.target.value)}>
                <option value="Fulltime">Fulltime</option>
                <option value="Parttime">Parttime</option>
                <option value="Contract">Contract</option>
              </select>
            </label>
            <label>
              Joined date
              <input type="date" value={form.joined} onChange={(e) => handleChange('joined', e.target.value)} />
            </label>
            <div className="form-actions">
              <button type="submit" className="auth-button">{isEditing ? 'Save Changes' : 'Add Personnel'}</button>
              <button type="button" className="secondary-button" onClick={resetForm}>Clear</button>
            </div>
          </form>
        </section>

        <section className="personnel-list-card">
          <div className="card-header">
            <h3>Personnel Records</h3>
            <p>{personnel.length} records available</p>
          </div>
          <div className="personnel-grid-admin">
            {personnel.map((person) => (
              <article key={person.id} className="personnel-admin-card">
                <div className="card-top">
                  <span className={`status-badge ${person.status.toLowerCase()}`}>{person.status}</span>
                  <div className="card-actions">
                    <button type="button" onClick={() => handleEdit(person)}>Edit</button>
                    <button type="button" className="danger-button" onClick={() => handleDelete(person.id)}>Remove</button>
                  </div>
                </div>
                <h4>{person.fullName}</h4>
                <p className="subtitle">{person.title}</p>
                <div className="personnel-details">
                  <div><strong>ID:</strong> {person.id}</div>
                  <div><strong>Dept:</strong> {person.department}</div>
                  <div><strong>Type:</strong> {person.type}</div>
                  <div><strong>Email:</strong> {person.email}</div>
                  <div><strong>Phone:</strong> {person.phone}</div>
                  <div><strong>Joined:</strong> {person.joined}</div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PersonnelManagement;
