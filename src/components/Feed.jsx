import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import './Feed.css';

const Feed = () => {
  const { portfolioData } = usePortfolio();
  const projects = portfolioData?.projects || [];

  // Show first 4 projects as featured on home
  const featured = projects.slice(0, 4).map((p, i) => ({
    ...p,
    label: i % 2 === 0 ? 'SNAPSHOT' : 'CASE STUDY',
  }));

  return (
    <section className="feed" id="work">
      <div className="container">

        {/* Header row: "Feed ↘" left, "2026 Portfolio" right */}
        <div className="feed__header">
          <motion.span
            className="feed__tag"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Feed ↘
          </motion.span>

          <div className="feed__title-wrap">
            <motion.span
              className="feed__year"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              2026
            </motion.span>
            <motion.h2
              className="feed__main-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              viewport={{ once: true }}
            >
              Portfolio
            </motion.h2>
          </div>
        </div>

        {/* 2-column project grid */}
        <div className="feed__grid">
          {featured.map((project, index) => (
            <motion.div
              key={project.id}
              className="feed-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: (index % 2) * 0.15 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <Link to={`/work/${project.slug || project.id}`} className="feed-card__link">
                <div className="feed-card__img-wrap">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="feed-card__img"
                    loading="lazy"
                  />
                  <div className="feed-card__hover-overlay">
                    <span className="feed-card__hover-text">View Project</span>
                  </div>
                </div>
                <div className="feed-card__info">
                  <span className="feed-card__label">{project.label}</span>
                  <h3 className="feed-card__title">{project.title}</h3>
                  <p className="feed-card__desc">{project.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* See all link */}
        <motion.div
          className="feed__footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Link to="/work" className="feed__all-link">
            View All Work <span>→</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Feed;
