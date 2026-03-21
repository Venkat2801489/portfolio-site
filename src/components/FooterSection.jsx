import React from 'react';
import { motion } from 'framer-motion';
import './FooterSection.css';

import { usePortfolio } from '../context/PortfolioContext';

const FooterSection = () => {
  const { portfolioData } = usePortfolio();
  const { personalInfo, footer } = portfolioData;

  const socialLinks = Object.entries(personalInfo.socials).map(([name, url]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    url
  }));

  return (
    <footer className="footer-section">
      <div className="container footer-section__content">
        <div className="footer-section__top">
          <div className="footer-section__contact">
            <motion.a 
              href={`mailto:${personalInfo.email}`} 
              className="footer-section__email"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {personalInfo.email}
            </motion.a>
            <p className="footer-section__location">{footer.address}</p>
          </div>
          <div className="footer-section__socials">
            {socialLinks.map((social, index) => (
              <motion.a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="footer-section__bottom">
          <motion.h2
            className="footer-section__handle"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {personalInfo.name}
          </motion.h2>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
