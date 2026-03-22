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
          <div>
            <h1 className="work-title">Work</h1>
            <span className="project-count">{filteredProjects.length}</span>
          </div>

          <nav className="filter-nav">
            {categories.map((cat, index) => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </nav>
        </header>

        <div className="work-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
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
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-results">
            <p>More projects coming soon in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Work;
