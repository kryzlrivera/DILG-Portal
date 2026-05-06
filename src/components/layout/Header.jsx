import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../Logo';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    const savedUser = localStorage.getItem('dilgCurrentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('dilgCurrentUser');
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [location]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Manila' };
  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Manila' };

  const formattedDate = new Intl.DateTimeFormat('en-PH', dateOptions).format(currentDate);
  const formattedTime = new Intl.DateTimeFormat('en-PH', timeOptions).format(currentDate);

  return (
    <header className="site-header">
      {/* Top bar */}
      <div className="header-top">
        <div className="container header-top-content">
          <div className="brand-block">
            <div className="brand-icons">
              <Logo size={88} className="header-logo-icon" />
              <div className="brand-logo bagong-logo">
                <div className="brand-logo-text">BAGONG PILIPINAS</div>
              </div>
            </div>
            <div className="brand-text-block">
              <div className="brand-subtitle">Republic of the Philippines</div>
              <div className="brand-title">Department of the Interior and Local Government</div>
            </div>
          </div>
          <div className="header-right">
            <div className="date-time">
              <div className="date-label">Philippines Time & Date</div>
              <div className="date">{formattedDate}</div>
              <div className="time">{formattedTime}</div>
            </div>
            {currentUser ? (
              <div className="user-controls">
                <div className="user-greeting">Hi, {currentUser.fullName || currentUser.email}</div>
                <button
                  className="login-btn logout-btn"
                  onClick={() => {
                    localStorage.removeItem('dilgCurrentUser');
                    setCurrentUser(null);
                    navigate('/');
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="header-nav">
        <div className="container nav-content">
          <button className="mobile-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <li><Link to="/Home" className={location.pathname === '/home' ? 'active' : ''}>Home</Link></li>
            <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About Us</Link></li>
            <li><Link to="/public-info" className={location.pathname === '/projects' ? 'active' : ''}>Programs & Projects</Link></li>
            <li><Link to="/regulations" className={location.pathname === '/lgu' ? 'active' : ''}>Local Government Units</Link></li>
            <li><Link to="/services" className={location.pathname === '/barangay' ? 'active' : ''}>Barangay</Link></li>
            <li><Link to="/faq" className={location.pathname === '/faq' ? 'active' : ''}>FAQ</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
