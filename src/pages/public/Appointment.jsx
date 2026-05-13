import React, { useState, useEffect } from 'react';
import './Appointment.css';

const Appointment = () => {
  const [personnelList, setPersonnelList] = useState([]);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    date: '',
    time: '',
    personnelId: '',
    reason: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    // Fetch personnel data from localStorage
    const storedPersonnel = JSON.parse(localStorage.getItem('dilgPersonnelData') || '[]');
    setPersonnelList(storedPersonnel.filter(p => p.status === 'Active'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.fullName || !form.email || !form.date || !form.time || !form.personnelId || !form.reason) {
      setStatus({ type: 'error', message: 'Please fill out all required fields.' });
      return;
    }

    const newAppointment = {
      id: `APT${Date.now()}`,
      ...form,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingAppointments = JSON.parse(localStorage.getItem('dilgAppointmentsData') || '[]');
    localStorage.setItem('dilgAppointmentsData', JSON.stringify([...existingAppointments, newAppointment]));

    setStatus({ type: 'success', message: 'Your appointment request has been submitted successfully.' });
    
    // Reset form
    setForm({
      fullName: '',
      email: '',
      date: '',
      time: '',
      personnelId: '',
      reason: ''
    });

    // Clear success message after 5 seconds
    setTimeout(() => {
      setStatus({ type: '', message: '' });
    }, 5000);
  };

  return (
    <div className="appointment-page container">
      <div className="appointment-header">
        <h1>Schedule an Appointment</h1>
        <p>Book a meeting with our department personnel for consultations, inquiries, or official business.</p>
      </div>

      <div className="appointment-container">
        <div className="appointment-card">
          {status.message && (
            <div className={`appointment-message ${status.type}`}>
              {status.message}
            </div>
          )}

          <form className="appointment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="date">Preferred Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="time">Preferred Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="personnelId">Select Personnel</label>
              <select
                id="personnelId"
                name="personnelId"
                value={form.personnelId}
                onChange={handleChange}
                required
              >
                <option value="">-- Choose a personnel --</option>
                {personnelList.map(person => (
                  <option key={person.id} value={person.id}>
                    {person.fullName} - {person.title} ({person.department})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="reason">Reason for Appointment</label>
              <textarea
                id="reason"
                name="reason"
                value={form.reason}
                onChange={handleChange}
                placeholder="Briefly describe the purpose of your appointment..."
                required
              ></textarea>
            </div>

            <button type="submit" className="appointment-submit-btn">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
