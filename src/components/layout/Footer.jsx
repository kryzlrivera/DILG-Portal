import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="footer-logo">DILG</div>
          <h3>Department of Interior and Local Government</h3>
          <p>Republic of the Philippines</p>
          <div className="contact-info">
            <p><strong>Address:</strong> DILG-NAPOLCOM Center, EDSA cor. Quezon Avenue, Quezon City, 1104 Philippines</p>
            <p><strong>Email:</strong> info@dilg.gov.ph</p>
          </div>
        </div>
        
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/programs">Programs & Projects</a></li>
            <li><a href="/lgu">Local Government Units</a></li>
            <li><a href="/articles">Articles</a></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h4>Organizations</h4>
          <ul>
            <li><a href="/organizations">List of Organizations</a></li>
            <li><a href="/list-of-barangay">List of Barangay</a></li>
            <li><a href="/barangay-officials">Barangay Officials</a></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h4>Connect</h4>
          <ul className="social-links">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container bottom-content">
          <p>&copy; {new Date().getFullYear()} Department of Interior and Local Government. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
