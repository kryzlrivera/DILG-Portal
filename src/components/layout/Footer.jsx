import React from 'react';
import Logo from '../Logo';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="footer-logo-container">
            <Logo size={64} />
          </div>
          <h3>Department of Interior and Local Government</h3>
          <p>Republic of the Philippines</p>
          <div className="contact-info">
            <p><strong>Address:</strong> Ground Floor SP Building, City Hall Compound, Doongan, Butuan City, 8600 Philippines</p>
            <p><strong>Email:</strong> dilgbutuancity@gmail.com</p>
          </div>
        </div>
        
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/articles">Articles</a></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h4>Organizations</h4>
          <ul>
            <li><a href="/programs">Programs & Projects</a></li>
            <li><a href="/lgu">Local Government Units</a></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h4>Connect</h4>
          <ul className="social-links">
            <li><a href="https://web.facebook.com/profile.php?id=100090805636697" target="_blank" rel="noopener noreferrer">Facebook</a></li>
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
