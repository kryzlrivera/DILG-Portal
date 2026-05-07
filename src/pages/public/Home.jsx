import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import butuanImage from '../../assets/images/butuan-city.png';

const GALLERY_KEY = 'dilgButuanEventPhotos';
const ARTICLES_KEY = 'dilgArticlesData';

const defaultArticles = [
  {
    id: 'A1',
    author: 'Dorothy Jill D. Peros',
    title: 'Anti-Illegal Drugs Summit for the barangays of Butuan.',
    date: 'April 24, 2026',
    excerpt: 'DILG Butuan led a summit to strengthen barangay anti-drug efforts and promote community safety across the city.',
  },
  {
    id: 'A2',
    author: 'Dorothy Jill D. Peros',
    title: 'Workshop on Training Needs Assessment (TNA) and Demand Formulation for Accredited Civil Society Organizations (CSOs).',
    date: 'April 23, 2026',
    excerpt: 'The workshop helped civil society organizations define key training priorities and align with DILG service goals.',
  },
  {
    id: 'A3',
    author: 'Dorothy Jill D. Peros',
    title: '2026 Barangay Anti-Drug Abuse Council (BADAC) Functionality Audit.',
    date: 'April 24, 2026',
    excerpt: 'An audit reviewed BADAC operations and recommended improvements to local anti-drug community initiatives.',
  },
];

const Home = () => {
  const [eventPhotos, setEventPhotos] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const storedPhotos = JSON.parse(localStorage.getItem(GALLERY_KEY) || '[]');
    setEventPhotos(storedPhotos);
    const storedArticles = JSON.parse(localStorage.getItem(ARTICLES_KEY) || '[]');
    setArticles(storedArticles.length ? storedArticles : defaultArticles);
  }, []);

  const galleryItems = eventPhotos.length > 0
    ? eventPhotos.slice(-4).reverse()
    : [
        { id: 'placeholder-1', src: butuanImage, caption: 'DILG Butuan latest event highlight' },
        { id: 'placeholder-2', src: butuanImage, caption: 'Community outreach and local service' },
        { id: 'placeholder-3', src: butuanImage, caption: 'Government activities around the city' },
        { id: 'placeholder-4', src: butuanImage, caption: 'Public service events in Butuan City' },
      ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= galleryItems.length) {
      setCurrentIndex(0);
    }
  }, [galleryItems.length, currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  const featuredPhoto = galleryItems[currentIndex];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg" style={{ backgroundImage: `url(${butuanImage})` }} />
        <div className="container hero-content">
          <div className="hero-left">
            <h1 className="hero-title">Department of the Interior and Local Government<br />Butuan City.</h1>
            <div className="hero-checklist">
              <div className="checklist-item">
                <span className="check-icon"></span>
                <p>is the executive department of the Philippine government
                  responsible for promoting peace and order, ensuring public 
                  safety and strengthening local government capability aimed 
                  towards the effective delivery of basic services to the citizenry.</p>
              </div>
            </div>
          </div>
          
          <div className="hero-right">
            <Link to="/history" className="history-link">
              <div className="info-sidebar history-sidebar">
                <h3>History</h3>
                <p>The Department of the Interior and Local Government traces 
                  its roots to the Philippine Revolution against the Spanish 
                  Empire, specifically the Tejeros Convention of March 22, 1897. 
                  Initially the Department of the Interior, it was among the first 
                  Cabinet positions of the proposed revolutionary government, 
                  wherein General Emilio Aguinaldo was elected President. 
                  The leader of Katipunan's Magdiwang faction, Andrés Bonifacio, 
                  was elected last as Director of the Interior, but a controversial 
                  objection led to the Magdiwang walkout and Bonifacio declining the 
                  position. Gen. Pascual Álvarez would be appointed as secretary by 
                  Aguinaldo on April 17, 1897, during the Naic Assembly..</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Events Slideshow */}
      <section className="slideshow-section">
        <div className="container gallery-header">
          <div>
            <p className="eyebrow">Latest Events</p>
            <h2>Featured DILG Butuan event</h2>
            <p>Highlighting the most recent photo update with context and navigation controls.</p>
          </div>
        </div>

        <div className="container slideshow-card">
          <div className="slideshow-image-wrap">
            <img className="slideshow-image" src={featuredPhoto.src} alt={featuredPhoto.caption} />
          </div>
          <div className="slideshow-info">
            <p className="gallery-caption slideshow-caption">{featuredPhoto.caption}</p>
            <div className="slideshow-controls">
              <button type="button" onClick={handlePrevious}>&larr; Previous</button>
              <span>{currentIndex + 1} / {galleryItems.length}</span>
              <button type="button" onClick={handleNext}>Next &rarr;</button>
            </div>
          </div>

          <div className="slideshow-thumbnails">
            {galleryItems.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                className={`thumbnail-item ${index === currentIndex ? 'thumbnail-active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              >
                <img src={photo.src} alt={photo.caption} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid Section */}
      <section className="articles-section">
        <div className="container">
          <div className="articles-grid">
            {articles.map((article) => (
              <Link key={article.id} to={`/articles/${article.id}`} className="article-card article-link-card">
                <div className="article-image-placeholder"></div>
                <div className="article-content">
                  <div className="article-meta">
                    <span className="article-author">👤 Author</span>
                    <span className="article-author-name">{article.author}</span>
                  </div>
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt">{article.excerpt || 'Read more about this latest update from DILG Butuan.'}</p>
                  <div className="article-footer">
                    <span className="article-date">📅 {article.date}</span>
                    <span className="article-readmore">Read article →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
