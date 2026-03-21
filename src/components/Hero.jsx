import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

import { usePortfolio } from '../context/PortfolioContext';

const Hero = () => {
  const { portfolioData } = usePortfolio();
  const { personalInfo } = portfolioData;
  const [designationIndex, setDesignationIndex] = React.useState(0);
  const designations = personalInfo.designations || [personalInfo.role];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDesignationIndex((prev) => (prev + 1) % designations.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [designations.length]);

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
            <motion.div 
              className="hero__intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              I am {personalInfo.name}
            </motion.div>
            <div className="hero__main-container">
              <AnimatePresence mode="wait">
                <motion.h1 
                  key={designations[designationIndex]}
                  className="hero__main"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {designations[designationIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
