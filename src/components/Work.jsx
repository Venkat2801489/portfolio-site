import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Work.css';

import { usePortfolio } from '../context/PortfolioContext';

const Work = () => {
  const { portfolioData } = usePortfolio();
  const { projects } = portfolioData;
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="work-page">
      <div className="container">
        <header className="work-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="work-title">Work</h1>
            <span className="project-count">{filteredProjects.length}</span>
          </motion.div>

          <nav className="filter-nav">
            {categories.map((cat, index) => (
              <motion.button
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {cat}
              </motion.button>
            ))}
          </nav>
        </header>

        <motion.div 
          className="work-grid"
          layout
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="project-card"
              >
                <Link to={`/work/${project.slug || project.id}`} className="project-link">
                  <div className="card-image-wrap">
                    <img src={project.image} alt={project.title} loading="lazy" />
                    <div className="card-overlay">
                      <span className="view-link">View Case Study</span>
                    </div>
                  </div>
                  <div className="card-content">
                    <p className="card-category">{project.category}</p>
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-desc">{project.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div 
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>More projects coming soon in this category.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Work;
