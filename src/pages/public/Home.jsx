import React from 'react';
import { FileText, Users, Building, HelpCircle, Briefcase, FileArchive, Search, ArrowRight, Activity, MapPin, CheckSquare, Layers } from 'lucide-react';
import './Home.css';

const Home = () => {
  const services = [
    { title: "Local Government Units", icon: <Building size={32} />, desc: "Directory and information about LGUs nationwide.", link: "/lgu" },
    { title: "Programs & Projects", icon: <Activity size={32} />, desc: "Updates on ongoing community development programs.", link: "/programs" },
    { title: "Organizations", icon: <Users size={32} />, desc: "Partner organizations and affiliated groups.", link: "/organizations" },
    { title: "Barangay Officials", icon: <MapPin size={32} />, desc: "Database of elected barangay officials.", link: "/barangay-officials" },
    { title: "Set Appointment", icon: <CheckSquare size={32} />, desc: "Schedule a visit or consultation easily.", link: "/appointment" },
    { title: "Public Assistance", icon: <HelpCircle size={32} />, desc: "Get help and support for DILG related queries.", link: "#" },
    { title: "Careers", icon: <Briefcase size={32} />, desc: "Job listings and career opportunities at DILG.", link: "#" },
    { title: "Resources & Arcives", icon: <FileArchive size={32} />, desc: "Downloadable forms, memos, and public records.", link: "#" }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          <div className="hero-text-area">
            <h2 className="hero-welcome">Welcome to the</h2>
            <h1 className="hero-title">Official Portal of the Department of Interior and Local Government</h1>
            <p className="hero-subtitle">
              Promoting peace and order, ensuring public safety, and strengthening local government capability towards the effective delivery of basic services to the citizenry.
            </p>
            
            <div className="hero-search">
              <input type="text" placeholder="What are you looking for?" />
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
          <div className="hero-image-area">
            {/* abstract shapes representing community / government */}
            <div className="hero-abstract-art">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="highlights-section">
        <div className="container highlights-content">
          <div className="highlights-header">
            <div className="header-text">
              <h2>Latest Articles & Highlights</h2>
              <p>Updates on DILG operations and news across the nation.</p>
            </div>
            <a href="/articles" className="btn btn-outline" style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
              View All News <ArrowRight size={16} />
            </a>
          </div>
          
          <div className="highlights-grid">
            <div className="highlight-card main-highlight">
              <div className="highlight-img bg-crimson">NEWS</div>
              <div className="highlight-body">
                <span className="highlight-date">March 28, 2026</span>
                <h3>DILG Leads Comprehensive Review of LGU Performance</h3>
                <p>A nationwide initiative to ensure transparency and accountability at the local level...</p>
                <a href="/articles/1" className="read-more">Read Full Story</a>
              </div>
            </div>
            <div className="highlight-card">
              <div className="highlight-img bg-yellow">UPDATE</div>
              <div className="highlight-body">
                <span className="highlight-date">March 25, 2026</span>
                <h3>New Guidelines for Barangay Officials Training</h3>
                <a href="/articles/2" className="read-more">Read Full Story</a>
              </div>
            </div>
            <div className="highlight-card">
              <div className="highlight-img bg-gray">MEMO</div>
              <div className="highlight-body">
                <span className="highlight-date">March 20, 2026</span>
                <h3>Memorandum Circular on Disaster Preparedness</h3>
                <a href="/articles/3" className="read-more">Read Full Story</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services/Quick Links Grid */}
      <section className="services-section">
        <div className="container services-content">
          <div className="services-nav">
            <button className="service-tab active"><Layers size={18} style={{marginRight: '0.5rem'}}/> Public Services</button>
            <button className="service-tab"><Building size={18} style={{marginRight: '0.5rem'}}/> LGU Portals</button>
            <button className="service-tab"><Users size={18} style={{marginRight: '0.5rem'}}/> Organizations</button>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <a href={service.link} className="service-card" key={index}>
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <span className="service-link-text">Learn more &rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="banner-section">
        <div className="container banner-content">
          <div className="banner-text">
            <h2>Transparency Seal</h2>
            <p>Providing the public with official documents to ensure accountability in government processes.</p>
          </div>
          <div className="banner-actions">
            <a href="#" className="btn btn-accent">View Transparency Reports</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
