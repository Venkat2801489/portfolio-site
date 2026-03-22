import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import './Header.css';

const Header = () => {
  const { portfolioData } = usePortfolio();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggle = () => setMenuOpen(prev => !prev);

  return (
    <header className={`header${menuOpen ? ' header--open' : ''}`}>
      <div className="container header__content">
        <div className="header__logo">
          <Link to="/" className="logo-box">V</Link>
        </div>

        <nav className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            <li>
              <Link to={portfolioData.seo?.pages?.work?.slug || "/work"} onClick={() => setMenuOpen(false)}>Work</Link>
            </li>
            <li>
              <Link to={portfolioData.seo?.pages?.profile?.slug || "/profile"} onClick={() => setMenuOpen(false)}>Profile</Link>
            </li>
            <li>
              <a
                href={portfolioData.personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="resume-link"
              >
                Resume
              </a>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </li>
          </ul>
        </nav>

        <button
          className="header__hamburger"
          onClick={toggle}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
