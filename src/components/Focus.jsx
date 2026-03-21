import React from 'react';
import { motion } from 'framer-motion';
import './Focus.css';

const services = [
  "Brand Experience",
  "Product Design",
  "Brand Design",
  "Creative Direction",
  "Motion Design",
  "Prototyping",
  "Icon Design"
];

const Focus = () => {
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
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="focus__item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h2>{service}</h2>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Focus;
