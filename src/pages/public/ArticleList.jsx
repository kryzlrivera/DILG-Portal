import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ArticleList.css';

const defaultArticles = [
  {
    id: 'A1',
    title: 'Anti-Illegal Drugs Summit for the Barangays of Butuan',
    author: 'Dorothy Jill D. Peros',
    date: 'April 24, 2026',
    excerpt: 'DILG Butuan led a summit to strengthen barangay anti-drug efforts and promote community safety across the city.',
  },
  {
    id: 'A2',
    title: 'Workshop on Training Needs Assessment (TNA) for Accredited CSOs',
    author: 'Dorothy Jill D. Peros',
    date: 'April 23, 2026',
    excerpt: 'The workshop helped civil society organizations define key training priorities and align with DILG service goals.',
  },
  {
    id: 'A3',
    title: '2026 Barangay Anti-Drug Abuse Council (BADAC) Functionality Audit',
    author: 'Dorothy Jill D. Peros',
    date: 'April 24, 2026',
    excerpt: 'A city-wide audit reviewed BADAC operations and recommended improvements to drug abuse prevention work.',
  },
];

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dilgArticlesData') || '[]');
    setArticles(stored.length ? stored : defaultArticles);
  }, []);

  return (
    <div className="article-list-page">
      <div className="article-list-header container">
        <p className="eyebrow">Latest Articles</p>
        <h1>News and updates from DILG Butuan</h1>
        <p>Read the most recent announcements and event articles created by the admin team.</p>
      </div>

      <div className="container article-list-grid">
        {articles.map((article) => (
          <Link key={article.id} to={`/articles/${article.id}`} className="article-list-card">
            <div className="article-list-card-top">
              <span className="article-list-author">{article.author}</span>
              <span className="article-list-date">{article.date}</span>
            </div>
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
            <div className="article-list-readmore">Read full article →</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
