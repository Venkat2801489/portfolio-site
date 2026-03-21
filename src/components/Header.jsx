import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import './Header.css';

const Header = () => {
  const { portfolioData } = usePortfolio();

  return (
    <header className="header">
      <div className="container header__content">
        <div className="header__logo">
          <Link to="/" className="logo-box">V</Link>
        </div>
        <div className="header__name">
          <h1><Link to="/">Venkateswaran</Link></h1>
        </div>
        <nav className="header__nav">
          <ul>
            <li><Link to={portfolioData.seo?.pages?.work?.slug || '/work'}>Work</Link></li>
            <li><Link to={portfolioData.seo?.pages?.profile?.slug || '/profile'}>Profile</Link></li>
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
            <li><Link to={portfolioData.seo?.pages?.contact?.slug || '/contact'}>Contact</Link></li>
          </ul>
        </nav>
        <div className="header__extra">
          <div className="extra-icon">oo</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
