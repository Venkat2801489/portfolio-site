import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import './Tools.css';

const Tools = () => {
  const { portfolioData } = usePortfolio();
  const enabledTools = (portfolioData.tools || []).filter(item => item.enabled);

  if (enabledTools.length === 0) return null;

  return (
    <section className="tools" id="tools">
      <div className="container tools__content">
        <div className="tools__label">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Tools ↘
          </motion.span>
        </div>
        <div className="tools__list">
          {enabledTools.map((item, index) => (
            <motion.div 
              key={item.id}
              className="tools__item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h2>{item.label}</h2>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
