import React from 'react';
import { motion } from 'framer-motion';
import './Facts.css';

const Facts = () => {
  const paragraphs = [
    "I've dedicated my career to the intersection of Brand and Product Design, known as Brand Experience Design. Focusing on highly crafted visual design, interactive prototyping across devices and hardware, as well as an emotive and intentional approach to integrating brand and visual identity systems within digital product experiences. /",
    "I currently lead the Brand Experience (Brand XP) team at Dropbox as both a manager and an individual contributor. I oversee a team of product, brand, and motion designers. /",
    "The Brand XP team operates as a horizontal partner to the Engineering, Product, and Design organizations. We collaborate with product teams at various altitudes to elevate design craft, create branded product experiences that connect emotionally with customers, and evolve our visual identity system across our portfolio of products. /",
    "Over the years, I've analyzed, identified, and designed hundreds of emotive product experiences that have shaped how people perceive and engage with brands they know and love. By focusing on emotion, understanding a user's emotional state, and tapping into key moments, I've been able to infuse brand into product experiences in ways that build trust, drive preference, and create deep affinity for some of the world's most recognized brands. /"
  ];

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
