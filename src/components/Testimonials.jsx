import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import './Testimonials.css';

const Testimonials = () => {
  const { portfolioData } = usePortfolio();
  const enabledTestimonials = (portfolioData.testimonials || []).filter(item => item.enabled);

  if (enabledTestimonials.length === 0) return null;

  // Duplicate items for seamless loop
  const displayItems = [...enabledTestimonials, ...enabledTestimonials];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container testimonials__content">
        <div className="testimonials__label">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Testimonials & LinkedIn Endorsements ↘
          </motion.span>
        </div>
        <div className="testimonials__marquee-container">
          <motion.div 
            className="testimonials__marquee"
            animate={{ x: [0, "-50%"] }}
            transition={{ 
              duration: enabledTestimonials.length * 10,
              ease: "linear",
              repeat: Infinity
            }}
          >
            {displayItems.map((t, index) => (
              <div key={`${t.id}-${index}`} className="testimonial-card">
                <div className="testimonial-card__header">
                  <span className="testimonial-card__industry">{t.industry}</span>
                </div>
                <p className="testimonial-card__content">"{t.content}"</p>
                <div className="testimonial-card__footer">
                  <h3 className="testimonial-card__name">{t.name}</h3>
                  <div className="testimonial-card__verified">
                    <span className="verified-icon">✓</span> Verified Endorsement
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
