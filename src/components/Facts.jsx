import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import './Facts.css';

const Facts = () => {
  const { portfolioData } = usePortfolio();
  const paragraphs = portfolioData.facts || [];

  return (
    <section className="facts" id="facts">
      <div className="container facts__content">
        <div className="facts__label">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Facts ↘
          </motion.span>
        </div>
        <div className="facts__text">
          {paragraphs.map((text, index) => (
            <motion.p 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="facts__paragraph"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facts;
