import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import './Profile.css';

const Profile = () => {
  const { portfolioData } = usePortfolio();
  const { personalInfo, experiences, certifications } = portfolioData;

  const bio = Array.isArray(personalInfo?.bio) ? personalInfo.bio : [];
  const expList = Array.isArray(experiences) ? experiences : [];
  const certList = Array.isArray(certifications) ? certifications : [];

  const renderIcon = (icon, altText) => {
    if (!icon) return <div className="prof-icon-placeholder" />;
    if (icon.startsWith('http') || icon.startsWith('/')) {
      return <img src={icon} alt={altText} className="prof-org-logo" />;
    }
    return <span className="prof-emoji">{icon}</span>;
  };

  return (
    <div className="prof-page">
      {/* Hero: Portrait + Name/Role stacked centered */}
      <div className="prof-hero">
        <div className="container">
          <div className="prof-hero__inner">
            <div className="prof-hero__img-wrap">
              <img
                src={personalInfo?.portrait}
                alt={personalInfo?.name}
                className="prof-hero__img"
                loading="lazy"
              />
            </div>
            <div className="prof-hero__identity">
              <h1 className="prof-hero__name">{personalInfo?.name}</h1>
              <p className="prof-hero__role">{personalInfo?.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column content grid */}
      <div className="prof-body">
        <div className="container">
          <div className="prof-grid">

            {/* Left column: Experience + Certifications */}
            <div className="prof-col prof-col--left">

              {/* Experience */}
              <div className="prof-block">
                <span className="prof-block__label">Selected Experience</span>
                <div className="prof-list">
                  {expList.map((exp, i) => (
                    <div key={exp.id || i} className="prof-item">
                      <div className="prof-item__left">
                        <div className="prof-item__icon">
                          {renderIcon(exp.logo || exp.icon, exp.company)}
                        </div>
                        <div className="prof-item__info">
                          <h3 className="prof-item__company">{exp.company}</h3>
                          <p className="prof-item__role">{exp.role}</p>
                        </div>
                      </div>
                      <span className="prof-item__pill">{exp.period}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="prof-block">
                <span className="prof-block__label">Education</span>
                <div className="prof-list">
                  {(portfolioData.education || []).map((edu, i) => (
                    <div key={edu.id || i} className="prof-item">
                      <div className="prof-item__left">
                        <div className="prof-item__icon">
                          {renderIcon(edu.logo || edu.icon, edu.institution)}
                        </div>
                        <div className="prof-item__info">
                          <h3 className="prof-item__company">{edu.institution}</h3>
                          <p className="prof-item__role">{edu.degree}</p>
                          <p className="prof-item__location" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
                            {edu.location || edu.info}
                          </p>
                        </div>
                      </div>
                      <span className="prof-item__pill">{edu.period}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="prof-block">
                <span className="prof-block__label">Certifications</span>
                <div className="prof-list">
                  {certList.map((cert, i) => (
                    <a
                      key={cert.id || i}
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="prof-item prof-item--link"
                    >
                      <div className="prof-item__left">
                        <div className="prof-item__icon">
                          {renderIcon(cert.logo || cert.icon, cert.name)}
                        </div>
                        <div className="prof-item__info">
                          <h3 className="prof-item__company">{cert.name}</h3>
                          <p className="prof-item__role">{cert.issuer}</p>
                        </div>
                      </div>
                      <span className="prof-item__view">View ↗</span>
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Right column: About bio */}
            <div className="prof-col prof-col--right">
              <span className="prof-block__label">About</span>
              <div className="prof-bio">
                {bio.map((para, i) => (
                  <p
                    key={i}
                    className="prof-bio__para"
                    dangerouslySetInnerHTML={{
                      __html: String(para).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
