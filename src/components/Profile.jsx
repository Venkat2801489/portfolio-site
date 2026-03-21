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
          <motion.div
            className="prof-hero__inner"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="prof-hero__img-wrap">
              <img
                src={personalInfo?.portrait}
                alt={personalInfo?.name}
                className="prof-hero__img"
              />
            </div>
            <div className="prof-hero__identity">
              <h1 className="prof-hero__name">{personalInfo?.name}</h1>
              <p className="prof-hero__role">{personalInfo?.role}</p>
            </div>
          </motion.div>
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
                    <motion.div
                      key={exp.id || i}
                      className="prof-item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      viewport={{ once: true }}
                    >
                      <div className="prof-item__left">
                        <div className="prof-item__icon">
                          {renderIcon(exp.icon, exp.company)}
                        </div>
                        <div className="prof-item__info">
                          <h3 className="prof-item__company">{exp.company}</h3>
                          <p className="prof-item__role">{exp.role}</p>
                        </div>
                      </div>
                      <span className="prof-item__pill">{exp.period}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="prof-block">
                <span className="prof-block__label">Certifications</span>
                <div className="prof-list">
                  {certList.map((cert, i) => (
                    <motion.a
                      key={cert.id || i}
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="prof-item prof-item--link"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      viewport={{ once: true }}
                    >
                      <div className="prof-item__left">
                        <div className="prof-item__icon">
                          {renderIcon(cert.icon, cert.name)}
                        </div>
                        <div className="prof-item__info">
                          <h3 className="prof-item__company">{cert.name}</h3>
                          <p className="prof-item__role">{cert.issuer}</p>
                        </div>
                      </div>
                      <span className="prof-item__view">View ↗</span>
                    </motion.a>
                  ))}
                </div>
              </div>

            </div>

            {/* Right column: About bio */}
            <div className="prof-col prof-col--right">
              <span className="prof-block__label">About</span>
              <motion.div
                className="prof-bio"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                viewport={{ once: true }}
              >
                {bio.map((para, i) => (
                  <p
                    key={i}
                    className="prof-bio__para"
                    dangerouslySetInnerHTML={{
                      __html: String(para).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }}
                  />
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
