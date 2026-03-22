import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { slug: routeSlug } = useParams();
  const { portfolioData } = usePortfolio();
  const project = portfolioData.projects.find(p => 
    String(p.slug) === String(routeSlug) || String(p.id) === String(routeSlug)
  );

  if (!project) {
    return (
      <div className="project-detail project-not-found">
        <div className="container">
          <Link to="/work" className="back-btn">← Back to Work</Link>
          <h1>Project not found.</h1>
          <p>This project may have been removed or the link is incorrect.</p>
        </div>
      </div>
    );
  }

  const resourceLinks = [];
  if (project.driveLink) resourceLinks.push({ label: 'Google Drive', url: project.driveLink, icon: '📂' });
  if (project.notionLink) resourceLinks.push({ label: 'Notion Page', url: project.notionLink, icon: '📝' });

  return (
    <div className="project-detail">
      {/* Hero Section */}
      <section className="detail-hero">
        <div className="container">
          <Link to="/work" className="back-btn">← Back to Work</Link>
          <div className="hero-text">
            <span className="detail-category">{project.category}</span>
            <h1 className="detail-title">{project.title}</h1>
            <p className="detail-subtitle">{project.description}</p>
          </div>
        </div>
        {project.image && (
          <div className="hero-image-wrap">
            <img src={project.image} alt={project.title} loading="lazy" />
          </div>
        )}
      </section>

      {/* Dynamic Content Sections */}
      {(project.sections || []).map((section, index) => (
        <section 
          key={section.id}
          className={`detail-section ${index % 2 !== 0 ? 'bg-dark' : ''} ${section.type === 'image' ? 'image-type' : ''}`}
        >
          {section.type === 'image' ? (
            <div className="container">
              <div className="full-width-section-image">
                <img src={section.content} alt={section.heading || 'Project visual'} loading="lazy" />
                {section.heading && <p className="image-caption">{section.heading}</p>}
              </div>
            </div>
          ) : (
            <div className="container grid-2">
              <div className="section-label">{section.heading}</div>
              <div 
                className="section-body"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </div>
          )}
        </section>
      ))}

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="detail-gallery">
          <div className="container">
            <div className="gallery-label">Gallery</div>
            <div className="gallery-grid">
              {project.gallery.map((img, i) => (
                <div key={i} className="gallery-item">
                  <img src={img} alt={`${project.title} — ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Resources Section */}
      {resourceLinks.length > 0 && (
        <section className="detail-resources bg-white">
          <div className="container">
            <div className="grid-2">
              <div className="section-label text-black">Resources</div>
              <div className="section-body text-black">
                <div className="resource-links">
                  {resourceLinks.map((res, i) => (
                    <a key={i} href={res.url} target="_blank" rel="noreferrer" className="resource-card">
                      <div className="icon">{res.icon}</div>
                      <div>
                        <h4>{res.label}</h4>
                        <p>Open project resource</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectDetail;
