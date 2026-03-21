import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import './Focus.css';

const Focus = () => {
  const { portfolioData } = usePortfolio();
  const enabledFocus = (portfolioData.focus || []).filter(item => item.enabled);

  return (
    <section className="focus" id="focus">
      <div className="container focus__content">
        <div className="focus__label">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Focus ↘
          </motion.span>
        </div>
        <div className="focus__list">
          {enabledFocus.map((item, index) => (
            <motion.div 
              key={item.id}
              className="focus__item"
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

export default Focus;
