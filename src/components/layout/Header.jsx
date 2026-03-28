import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Search } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOrgDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsOrgDropdownOpen(false);
  }, [location]);

  return (
    <header className="site-header">
      {/* Top utility bar */}
      <div className="header-utility">
        <div className="container utility-content">
          <div className="utility-left">
            <span>Gov.PH</span>
          </div>
          <div className="utility-right">
            <span>Standard Time: {new Date().toLocaleDateString('en-PH')}</span>
          </div>
        </div>
      </div>

      {/* Main branding area */}
      <div className="header-branding">
        <div className="container branding-content">
          <Link to="/" className="brand-logo-link">
            {/* Placeholder for DILG Logo */}
            <div className="brand-icon">DILG</div>
            <div className="brand-text">
              <span className="brand-republic">Republic of the Philippines</span>
              <h1 className="brand-title">Department of Interior and Local Government</h1>
            </div>
          </Link>
          <div className="header-search">
            <div className="search-box">
              <input type="text" placeholder="Search..." />
              <button aria-label="Search"><Search size={18} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="header-nav">
        <div className="container nav-content">
          {/* Mobile toggle */}
          <button className="mobile-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            <span>Menu</span>
          </button>

          <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About Us</Link></li>
            <li><Link to="/programs" className={location.pathname === '/programs' ? 'active' : ''}>Programs & Projects</Link></li>
            <li><Link to="/lgu" className={location.pathname === '/lgu' ? 'active' : ''}>Local Government Units</Link></li>
            
            {/* Dropdown Menu for Organizations */}
            <li className="dropdown-container" ref={dropdownRef}>
              <button 
                className={`dropdown-toggle ${location.pathname.includes('/organizations') || location.pathname.includes('/barangay') ? 'active' : ''}`}
                onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={isOrgDropdownOpen}
              >
                Organizations <ChevronDown size={16} />
              </button>
              
              <ul className={`dropdown-menu ${isOrgDropdownOpen ? 'show' : ''}`}>
                <li><Link to="/organizations">List of Organizations</Link></li>
                <li><Link to="/list-of-barangay">List of Barangay</Link></li>
                <li><Link to="/barangay-officials">Barangay Officials</Link></li>
              </ul>
            </li>

            <li><Link to="/appointment" className={location.pathname === '/appointment' ? 'active' : ''}>Appointment</Link></li>
            <li><Link to="/articles" className={location.pathname === '/articles' ? 'active' : ''}>Articles</Link></li>
            
            {/* Login Links - right aligned on desktop */}
            <li className="nav-end-links">
              <Link to="/admin" className="nav-login-btn">Admin Portal</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
