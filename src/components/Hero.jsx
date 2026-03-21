import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

import { usePortfolio } from '../context/PortfolioContext';

const Hero = () => {
  const { portfolioData } = usePortfolio();
  const { personalInfo } = portfolioData;

  return (
    <section className="hero">
      <div className="container hero__content">
        <motion.div 
          className="hero__image-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img src={personalInfo.portrait} alt={`${personalInfo.name} Portrait`} className="hero__portrait" />
          <div className="hero__title">
            <motion.h2 
              className="hero__year"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              2026
            </motion.h2>
            <motion.h1 
              className="hero__main"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              {personalInfo.role}
            </motion.h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
