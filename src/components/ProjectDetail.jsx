import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ProjectDetail.css';

// Mock data for projects - in future this will come from Supabase
const projectDetails = {
  1: {
    title: 'Precision SEO Strategy',
    category: 'SEO',
    heroImage: '/Users/venkat/.gemini/antigravity/brain/a7709972-85f7-404e-94f3-aaccbb6183de/project_hero_mockup_1774023571480.png',
    gallery: ['/Users/venkat/.gemini/antigravity/brain/a7709972-85f7-404e-94f3-aaccbb6183de/project_gallery_1_1774023593437.png'],
    overview: 'This project focused on scaling organic traffic for a leading enterprise SaaS platform through technical SEO audits and intent-based content strategy.',
    challenge: 'The client was experiencing a plateau in organic growth despite high volume content production. Keyword cannibalization and technical debt were the primary bottlenecks.',
    solution: 'We implemented a full-scale content pruning strategy, restructured the site hierarchy for better crawlability, and executed a targeted backlink campaign on high-authority industry domains.',
    results: ['145% Increase in Organic Traffic', 'Top 3 Ranking for 50+ High-Intent Keywords', '30% Decrease in Bounce Rate'],
    sheetLink: 'https://docs.google.com/spreadsheets/d/1example123',
    files: ['SEO_Technical_Audit.pdf', 'Content_Strategy_2026.md']
  },
  // Adding more entries as needed...
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectDetails[id] || projectDetails[1]; // Default to first for demo

  return (
    <motion.div 
      className="project-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="detail-hero">
        <div className="container">
          <Link to="/work" className="back-btn">← Back to Work</Link>
          <motion.div 
            className="hero-text"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="detail-category">{project.category}</span>
            <h1 className="detail-title">{project.title}</h1>
          </motion.div>
        </div>
        <div className="hero-image-wrap">
          <img src={project.heroImage} alt={project.title} />
        </div>
      </section>

      {/* Content Sections */}
      <section className="detail-overview">
        <div className="container grid-2">
          <div className="section-label">Overview</div>
          <div className="section-body">
            <p className="lead-text">{project.overview}</p>
          </div>
        </div>
      </section>

      <section className="detail-challenge bg-dark">
        <div className="container grid-2">
          <div className="section-label">The Challenge</div>
          <div className="section-body">
            <p>{project.challenge}</p>
          </div>
        </div>
      </section>

      <section className="detail-solution">
        <div className="container grid-2">
          <div className="section-label">Solution</div>
          <div className="section-body">
            <p>{project.solution}</p>
            <ul className="results-list">
              {project.results.map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="detail-gallery">
        <div className="container">
          {project.gallery.map((img, i) => (
            <div key={i} className="gallery-item">
              <img src={img} alt={`Gallery ${i}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Resources & Uploads - SUPABASE INTEGRATION READY */}
      <section className="detail-resources bg-white">
        <div className="container">
          <div className="grid-2">
            <div className="section-label text-black">Resources</div>
            <div className="section-body text-black">
              <h3>Project Assets</h3>
              <div className="resource-links">
                <a href={project.sheetLink} target="_blank" rel="noreferrer" className="resource-card">
                  <div className="icon">📊</div>
                  <div>
                    <h4>Google Sheets Data</h4>
                    <p>Live project tracking and analytics data.</p>
                  </div>
                </a>
                
                {project.files.map((file, i) => (
                  <div key={i} className="resource-card">
                    <div className="icon">{file.endsWith('.pdf') ? '📄' : '📝'}</div>
                    <div>
                      <h4>{file}</h4>
                      <p>Download project documentation.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectDetail;
