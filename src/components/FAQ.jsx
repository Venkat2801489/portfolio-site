import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import './FAQ.css';

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'is-open' : ''}`}>
      <button 
        className="faq-item__trigger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="faq-item__question-wrap">
          <span className="faq-item__number">0{index + 1}</span>
          <h3 className="faq-item__question">{question}</h3>
        </div>
        <div className="faq-item__icon-wrap">
          <motion.div 
            className="faq-item__icon"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ↓
          </motion.div>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="faq-item__answer-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="faq-item__answer" dangerouslySetInnerHTML={{ __html: answer }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const { portfolioData } = usePortfolio();
  const enabledFAQs = (portfolioData.faqs || []).filter(item => item.enabled);

  if (enabledFAQs.length === 0) return null;

  return (
    <section className="faq" id="faq">
      <div className="container faq__content">
        <div className="faq__label">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            FAQ ↘
          </motion.span>
        </div>
        <div className="faq__list">
          {enabledFAQs.map((faq, index) => (
            <FAQItem 
              key={faq.id} 
              question={faq.question} 
              answer={faq.answer} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
