import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const DOCUMENT_STORAGE_KEY = 'dilgAdminDocuments';

const defaultDocuments = [];
const categories = ['Contracts', 'Reports', 'Permits', 'Memoranda', 'Other'];
const statuses = ['Delivered', 'Not yet delivered'];

const AdminDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [form, setForm] = useState({
    id: '',
    title: '',
    category: 'Reports',
    date: '',
    preparedBy: '',
    receivedByAgency: '',
    receivedByName: '',
    status: 'Not yet delivered',
    fileName: '',
    fileUrl: '',
    archived: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedDocumentPreview, setSelectedDocumentPreview] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocuments = documents.filter((doc) => {
    const query = searchQuery.toLowerCase();
    return (
      doc.title.toLowerCase().includes(query)
      || doc.category.toLowerCase().includes(query)
      || doc.preparedBy.toLowerCase().includes(query)
      || doc.receivedByAgency.toLowerCase().includes(query)
      || doc.receivedByName.toLowerCase().includes(query)
      || doc.status.toLowerCase().includes(query)
    );
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const storedDocuments = JSON.parse(localStorage.getItem(DOCUMENT_STORAGE_KEY) || '[]');
    setDocuments(storedDocuments.length ? storedDocuments : defaultDocuments);
  }, []);

  useEffect(() => {
    localStorage.setItem(DOCUMENT_STORAGE_KEY, JSON.stringify(documents));
  }, [documents]);

  const fileToDataURL = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const resetDocumentForm = () => {
    setForm({
      id: '',
      title: '',
      category: 'Reports',
      date: '',
      preparedBy: '',
      receivedByAgency: '',
      receivedByName: '',
      status: 'Not yet delivered',
      fileName: '',
      fileUrl: '',
      archived: false,
    });
    setIsEditing(false);
    setMessage('');
  };

  const handleDocumentChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleDocumentFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const url = await fileToDataURL(file);
    setForm((current) => ({ ...current, fileName: file.name, fileUrl: url }));
  };

  const handleDocumentSubmit = (event) => {
    event.preventDefault();
    if (!form.title || !form.date || !form.preparedBy || !form.receivedByAgency || !form.receivedByName || !form.fileUrl) {
      setMessage('Please complete all required fields and attach a document.');
      return;
    }

    const nextDocument = {
      ...form,
      id: isEditing ? form.id : `DOC-${Date.now()}`,
      archived: isEditing ? form.archived : false,
    };

    setDocuments((current) => {
      if (isEditing) {
        return current.map((item) => (item.id === nextDocument.id ? nextDocument : item));
      }
      return [nextDocument, ...current];
    });

    const resultMessage = isEditing ? 'Document updated successfully.' : 'Document added successfully.';
    resetDocumentForm();
    setMessage(resultMessage);
  };

  const handleEditDocument = (document) => {
    setForm(document);
    setIsEditing(true);
    setMessage('Editing document. Save changes to update the record.');
  };

  const handleDeleteDocument = (id) => {
    if (!window.confirm('Delete this document?')) return;
    setDocuments((current) => current.filter((item) => item.id !== id));
    if (form.id === id) resetDocumentForm();
  };

  const handleArchiveDocument = (id) => {
    setDocuments((current) => current.map((item) => (item.id === id ? { ...item, archived: !item.archived } : item)));
  };

  const renderDocumentPreview = (doc) => {
    if (!doc) {
      return (
        <div className="preview-empty">
          <p>Select a document to preview</p>
        </div>
      );
    }

    // Check file type from file extension or MIME type
    const fileName = doc.fileName.toLowerCase();
    const isPDF = fileName.endsWith('.pdf') || doc.fileUrl.includes('application/pdf');
    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);
    const isText = /\.(txt|doc|docx)$/i.test(fileName);

    return (
      <div className="preview-container">
        <div className="preview-header">
          <h4>{doc.title}</h4>
          <button type="button" className="preview-close" onClick={() => setSelectedDocumentPreview(null)}>×</button>
        </div>
        <div className="preview-content">
          {isPDF && (
            <iframe
              src={doc.fileUrl}
              title={`Preview of ${doc.title}`}
              className="pdf-preview"
            />
          )}
          {isImage && (
            <img src={doc.fileUrl} alt={`Preview of ${doc.title}`} className="image-preview" />
          )}
          {!isPDF && !isImage && (
            <div className="preview-unavailable">
              <p>Preview not available for this file type</p>
              <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="preview-download-link">
                Download File
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="admin-dashboard-page">
      <div className="dashboard-header">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Welcome to the DILG Admin Dashboard. From here you can manage localized settings, documents, and content.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="document-management-card">
          <div className="card-title">
            <h3>Document Management</h3>
            <p>Upload and organize admin documents by category, status, and delivery information.</p>
          </div>

          <form className="document-form" onSubmit={handleDocumentSubmit}>
            <div className="document-form-grid">
              <label>
                Document title
                <input value={form.title} onChange={(e) => handleDocumentChange('title', e.target.value)} placeholder="Title of document" />
              </label>
              <label>
                Category
                <select value={form.category} onChange={(e) => handleDocumentChange('category', e.target.value)}>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label>
                Date
                <input type="date" value={form.date} onChange={(e) => handleDocumentChange('date', e.target.value)} />
              </label>
              <label>
                Prepared by
                <input value={form.preparedBy} onChange={(e) => handleDocumentChange('preparedBy', e.target.value)} placeholder="Name of preparer" />
              </label>
              <label>
                Received by (Agency)
                <input value={form.receivedByAgency} onChange={(e) => handleDocumentChange('receivedByAgency', e.target.value)} placeholder="Agency name" />
              </label>
              <label>
                Received by (Name)
                <input value={form.receivedByName} onChange={(e) => handleDocumentChange('receivedByName', e.target.value)} placeholder="Personnel name" />
              </label>
              <label>
                Delivery status
                <select value={form.status} onChange={(e) => handleDocumentChange('status', e.target.value)}>
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </label>
              <label className="file-input-label">
                Attach document
                <input type="file" onChange={handleDocumentFile} />
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="auth-button">{isEditing ? 'Save Document' : 'Add Document'}</button>
              <button type="button" className="secondary-button" onClick={resetDocumentForm}>Clear</button>
            </div>
            {message && <div className="document-message">{message}</div>}
          </form>
        </section>
      </div>

      <section className="document-list-card">
        <div className="card-title">
          <h3>Document Library</h3>
          <p>{documents.length} document{documents.length === 1 ? '' : 's'} saved</p>
        </div>

        <div className="documents-grid-with-preview">
          <div className="documents-list">
            {documents.length ? documents.map((doc) => (
              <article
                key={doc.id}
                className={`document-item ${doc.archived ? 'archived' : ''} ${selectedDocumentPreview?.id === doc.id ? 'selected' : ''}`}
                onClick={() => setSelectedDocumentPreview(doc)}
              >
                <div className="document-item-top">
                  <div>
                    <span className="document-category">{doc.category}</span>
                    <h4>{doc.title}</h4>
                  </div>
                  <div className="document-badges">
                    <span className={`status-pill ${doc.status === 'Delivered' ? 'delivered' : 'pending'}`}>{doc.status}</span>
                    {doc.archived && <span className="archive-pill">Archived</span>}
                  </div>
                </div>
                <div className="document-details">
                  <div><strong>Date:</strong> {doc.date}</div>
                  <div><strong>Prepared by:</strong> {doc.preparedBy}</div>
                  <div><strong>Received by:</strong> {doc.receivedByAgency} ({doc.receivedByName})</div>
                </div>
                <div className="document-actions">
                  <a href={doc.fileUrl} target="_blank" rel="noreferrer">View</a>
                  <button type="button" onClick={(e) => { e.stopPropagation(); handleEditDocument(doc); }}>Edit</button>
                  <button type="button" className="danger-button" onClick={(e) => { e.stopPropagation(); handleDeleteDocument(doc.id); }}>Delete</button>
                  <button type="button" onClick={(e) => { e.stopPropagation(); handleArchiveDocument(doc.id); }}>{doc.archived ? 'Unarchive' : 'Archive'}</button>
                </div>
              </article>
            )) : (
              <div className="empty-state">No documents uploaded yet. Add documents using the form above.</div>
            )}
          </div>

          <div className="documents-preview">
            {renderDocumentPreview(selectedDocumentPreview)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
