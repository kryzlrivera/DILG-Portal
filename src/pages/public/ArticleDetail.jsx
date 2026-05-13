import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ArticleList.css';

const defaultArticles = [
  {
    id: 'A1',
    title: 'Anti-Illegal Drugs Summit for the Barangays of Butuan',
    author: 'Dorothy Jill D. Peros',
    date: 'April 24, 2026',
    content: 'DILG Butuan led a comprehensive summit to strengthen barangay anti-drug programs. Leaders from across the city gathered to share best practices and align on the latest enforcement standards, making sure local units are better equipped to protect communities.',
  },
  {
    id: 'A2',
    title: 'Workshop on Training Needs Assessment (TNA) for Accredited CSOs',
    author: 'Dorothy Jill D. Peros',
    date: 'April 23, 2026',
    content: 'The training needs assessment workshop brought together CSOs and local officials to build stronger partnerships. Participants identified priority training areas that will improve service delivery and coordination with DILG initiatives.',
  },
  {
    id: 'A3',
    title: '2026 Barangay Anti-Drug Abuse Council (BADAC) Functionality Audit',
    author: 'Dorothy Jill D. Peros',
    date: 'April 24, 2026',
    content: 'The BADAC functionality audit reviewed existing anti-drug operations in barangays, assessed progress, and produced recommendations to improve coordination, monitoring, and community engagement.',
  },
];

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dilgArticlesData') || '[]');
    const articles = stored.length ? stored : defaultArticles;
    setArticle(articles.find((item) => item.id === articleId));
  }, [articleId]);

  if (!article) {
    return (
      <div className="article-list-page">
        <div className="article-list-header container">
          <h1>Article not found</h1>
          <p>The requested article could not be located. Please return to the article list.</p>
          <Link to="/articles" className="article-list-readmore">Back to articles</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="article-list-page">
      <div className="article-list-header container">
        <p className="eyebrow">Article</p>
        <h1>{article.title}</h1>
        <div className="article-meta-row">
          <span>{article.author}</span>
          <span>{article.date}</span>
        </div>
      </div>

      <div className="container article-detail-card">
        {article.imageUrl && (
          <div style={{ width: '100%', height: '400px', backgroundImage: `url(${article.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '0.5rem', marginBottom: '2rem' }}></div>
        )}
        <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>{article.content}</p>
        <Link to="/articles" className="article-list-readmore">← Back to articles</Link>
      </div>
    </div>
  );
};

export default ArticleDetail;
