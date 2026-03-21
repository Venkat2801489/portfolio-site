import React from 'react';
import './WorkGrid.css';

const projects = [
  { id: 1, title: 'Project One', category: 'Product Design', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop' },
  { id: 2, title: 'Project Two', category: 'Brand Identity', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000&auto=format&fit=crop' },
  { id: 3, title: 'Project Three', category: 'Web Experience', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop' },
  { id: 4, title: 'Project Four', category: 'Visual Art', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop' },
];

const WorkGrid = () => {
  return (
    <section id="work" className="work">
      <div className="container">
        <div className="work-grid">
          {projects.map(project => (
            <div key={project.id} className="work-item">
              <div className="work-item__image-wrapper">
                <img src={project.image} alt={project.title} className="work-item__image" />
                <div className="work-item__overlay">
                  <span className="work-item__category">{project.category}</span>
                  <h3 className="work-item__title">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkGrid;
