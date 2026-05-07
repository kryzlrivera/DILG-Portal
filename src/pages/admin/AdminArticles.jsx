import React, { useEffect, useState } from 'react';
import './AdminArticles.css';

const STORAGE_KEY = 'dilgArticlesData';

const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({
    id: '',
    title: '',
    author: '',
    date: '',
    excerpt: '',
    content: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    setArticles(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  }, [articles]);

  const resetForm = () => {
    setForm({ id: '', title: '', author: '', date: '', excerpt: '', content: '' });
    setIsEditing(false);
    setMessage('');
  };

  const handleChange = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title || !form.author || !form.content) {
      setMessage('Title, author, and content are required.');
      return;
    }

    if (isEditing) {
      setArticles((current) => current.map((item) => (item.id === form.id ? form : item)));
      setMessage('Article updated successfully.');
    } else {
      const newArticle = {
        ...form,
        id: `ART-${Date.now()}`,
        date: form.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      };
      setArticles((current) => [newArticle, ...current]);
      setMessage('Article added successfully.');
    }

    resetForm();
  };

  const handleEdit = (article) => {
    setForm(article);
    setIsEditing(true);
    setMessage('Editing article. Save changes when finished.');
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this article?')) {
      return;
    }
    setArticles((current) => current.filter((item) => item.id !== id));
    if (form.id === id) {
      resetForm();
    }
    setMessage('Article removed successfully.');
  };

  return (
    <div className="admin-articles-page">
      <div className="admin-articles-header">
        <h2>Article Management</h2>
        <p>Add, edit, or delete blog articles that appear on the public site.</p>
      </div>

      <div className="admin-articles-grid">
        <section className="article-form-card">
          <div className="card-title">
            <h3>{isEditing ? 'Edit Article' : 'Add Article'}</h3>
          </div>
          {message && <div className="article-message">{message}</div>}
          <form onSubmit={handleSubmit} className="article-form">
            <label>
              Title
              <input value={form.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="Article title" />
            </label>
            <label>
              Author
              <input value={form.author} onChange={(e) => handleChange('author', e.target.value)} placeholder="Author name" />
            </label>
            <label>
              Date
              <input type="date" value={form.date} onChange={(e) => handleChange('date', e.target.value)} />
            </label>
            <label>
              Summary
              <textarea value={form.excerpt} onChange={(e) => handleChange('excerpt', e.target.value)} placeholder="Short article summary" rows="3" />
            </label>
            <label>
              Content
              <textarea value={form.content} onChange={(e) => handleChange('content', e.target.value)} placeholder="Full article body" rows="6" />
            </label>
            <div className="form-actions">
              <button type="submit" className="auth-button">{isEditing ? 'Save Article' : 'Add Article'}</button>
              <button type="button" className="secondary-button" onClick={resetForm}>Clear</button>
            </div>
          </form>
        </section>

        <section className="article-list-card">
          <div className="card-title">
            <h3>Existing Articles</h3>
            <p>{articles.length} saved article{articles.length === 1 ? '' : 's'}</p>
          </div>
          <div className="article-management-list">
            {articles.length ? articles.map((article) => (
              <article key={article.id} className="article-management-item">
                <div>
                  <h4>{article.title}</h4>
                  <p className="subtitle">{article.author} · {article.date}</p>
                </div>
                <div className="article-actions">
                  <button type="button" onClick={() => handleEdit(article)}>Edit</button>
                  <button type="button" className="danger-button" onClick={() => handleDelete(article.id)}>Delete</button>
                </div>
              </article>
            )) : (
              <p className="empty-state">No articles yet. Add one to publish it to the site.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminArticles;
