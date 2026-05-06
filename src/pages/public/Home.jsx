import React from 'react';
import './Home.css';
import butuanImage from '../../assets/images/butuan-city.png';

const Home = () => {
  const articles = [
    { id: 1, author: "Dorothy Jill D. Peros", title: "Anti-Illegal Drugs Summit for the barangays of Butuan.", date: "April 24 2026 ", socialShare: "0 Social Share" },
    { id: 2, author: "Dorothy Jill D. Peros", title: "Workshop on Training Needs Assessment (TNA) and Demand Formulation for Accredited Civil Society Organizations (CSOs).", date: "April 23, 2026", socialShare: "0 Social Share" },
    { id: 3, author: "Dorothy Jill D. Peros", title: "2026 Barangay Anti-Drug Abuse Council (BADAC) Functionality Audit.", date: "April 24, 2026", socialShare: "0 Social Share" },
    { id: 4, author: "Dorothy Jill D. Peros", title: "Commemoration of the Philippine Veterans Week and the 84th Araw ng Kagitingan.", date: "April 9, 2026", socialShare: "0 Social Share" },
    { id: 5, author: "DILG Philippines", title: "Remulla flags alcohol-related drownings, urges safer swimming this Holy Week.", date: "March 31, 2026", socialShare: "0 Social Share" },
    { id: 6, author: "Atty. Lawrence Lemuel H. Fortun", title: "𝗧𝗮𝘀𝗸 𝗙𝗼𝗿𝗰𝗲 𝗕𝗮𝗹𝗮𝗻𝗴𝗮𝘆𝗮𝗻: 𝗦𝘁𝗿𝗲𝗻𝗴𝘁𝗵𝗲𝗻𝗶𝗻𝗴 𝗕𝘂𝘁𝘂𝗮𝗻 𝗖𝗶𝘁𝘆’𝘀 𝗨𝗻𝗶𝗳𝗶𝗲𝗱 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 𝘁𝗼 𝘁𝗵𝗲 𝗠𝗶𝗱𝗱𝗹𝗲 𝗘𝗮𝘀𝘁 𝗖𝗿𝗶𝘀𝗶𝘀.", date: "March 19, 2026", socialShare: "0 Social Share" }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
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
            <div className="info-sidebar">
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
          </div>
        </div>
      </section>

      {/* Articles Grid Section */}
      <section className="articles-section">
        <div className="container">
          <div className="articles-grid">
            {articles.map((article) => (
              <div key={article.id} className="article-card">
                <div className="article-image-placeholder"></div>
                <div className="article-content">
                  <div className="article-meta">
                    <span className="article-author">👤 Author</span>
                    <span className="article-author-name">{article.author}</span>
                  </div>
                  <h3 className="article-title">{article.title}</h3>
                  <div className="article-footer">
                    <span className="article-date">📅 {article.date}</span>
                    <span className="article-share">📊 {article.socialShare}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
