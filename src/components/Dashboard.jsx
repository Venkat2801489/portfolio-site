import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const DASHBOARD_PASSWORD = "admin"; // Simple hardcoded password

const Dashboard = () => {
  const { portfolioData, updatePortfolioData } = usePortfolio();
  const [activeTab, setActiveTab] = useState('general');
  const [localData, setLocalData] = useState(portfolioData);
  const [saveStatus, setSaveStatus] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    setLocalData(portfolioData);
  }, [portfolioData]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === DASHBOARD_PASSWORD) {
      setIsAuthorized(true);
      setLoginError('');
    } else {
      setLoginError('Invalid access credentials.');
    }
  };

  const handleSave = () => {
    updatePortfolioData(localData);
    setSaveStatus('Changes saved successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const updatePersonalInfo = (field, value) => {
    setLocalData({
      ...localData,
      personalInfo: { ...localData.personalInfo, [field]: value }
    });
  };

  const updateSocials = (field, value) => {
    setLocalData({
      ...localData,
      personalInfo: {
        ...localData.personalInfo,
        socials: { ...localData.personalInfo.socials, [field]: value }
      }
    });
  };

  const updateFooter = (field, value) => {
    setLocalData({
      ...localData,
      footer: { ...localData.footer, [field]: value }
    });
  };

  const addItem = (listName, newItem) => {
    setLocalData({
      ...localData,
      [listName]: [...localData[listName], { ...newItem, id: Date.now() }]
    });
  };

  const removeItem = (listName, id) => {
    setLocalData({
      ...localData,
      [listName]: localData[listName].filter(item => item.id !== id)
    });
  };

  const updateListItem = (listName, id, field, value) => {
    setLocalData({
      ...localData,
      [listName]: localData[listName].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  if (!isAuthorized) {
    return (
      <div className="login-screen">
        <motion.div 
          className="login-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="login-header">
            <div className="brand-dot"></div>
            <h1>PORTFOLIO ACCESS</h1>
          </div>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="ENTER PASSCODE" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {loginError && <p className="error-msg">{loginError}</p>}
            <button type="submit">AUTHORIZE</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-grid">
        <aside className="dashboard-sidebar">
          <div className="sidebar-brand">
            <Link to="/" className="back-to-site">← Back to Website</Link>
            <div className="brand-main">
              <div className="brand-dot"></div>
              <span>DASHBOARD</span>
            </div>
          </div>
          
          <nav className="sidebar-nav">
            {[
              { id: 'general', label: 'General' },
              { id: 'experience', label: 'Experience' },
              { id: 'certifications', label: 'Certifications' },
              { id: 'work', label: 'Projects' }
            ].map(tab => (
              <button 
                key={tab.id}
                className={`sidebar-link ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="link-label">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <button className="premium-save-btn" onClick={handleSave}>
              {saveStatus ? 'SAVED' : 'SAVE CHANGES'}
            </button>
            {saveStatus && <p className="status-msg">{saveStatus}</p>}
          </div>
        </aside>

        <main className="dashboard-main">
          <header className="content-header">
            <div className="header-meta">
              <span className="meta-tag">SYSTEM / {activeTab.toUpperCase()}</span>
              <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Configuration</h1>
            </div>
          </header>

          <div className="scroll-content">
            <AnimatePresence mode="wait">
              {activeTab === 'general' && (
                <motion.div 
                  key="general"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="config-section"
                >
                  <div className="config-grid">
                    <div className="config-card full">
                      <h3>Core Identity</h3>
                      <div className="input-row">
                        <div className="input-group">
                          <label>Display Name</label>
                          <input 
                            type="text" 
                            value={localData.personalInfo.name} 
                            onChange={(e) => updatePersonalInfo('name', e.target.value)}
                          />
                        </div>
                        <div className="input-group">
                          <label>Professional Role</label>
                          <input 
                            type="text" 
                            value={localData.personalInfo.role} 
                            onChange={(e) => updatePersonalInfo('role', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="input-row">
                        <div className="input-group">
                          <label>Contact Email</label>
                          <input 
                            type="email" 
                            value={localData.personalInfo.email} 
                            onChange={(e) => updatePersonalInfo('email', e.target.value)}
                          />
                        </div>
                        <div className="input-group">
                          <label>Portrait Asset URL</label>
                          <input 
                            type="text" 
                            value={localData.personalInfo.portrait} 
                            onChange={(e) => updatePersonalInfo('portrait', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="config-card full">
                      <h3>Resume & Assets</h3>
                      <div className="input-group">
                        <label>Resume File URL (PDF/Link)</label>
                        <div className="input-with-action">
                          <input 
                            type="text" 
                            value={localData.personalInfo.resumeUrl || ''} 
                            placeholder="/resume.pdf"
                            onChange={(e) => updatePersonalInfo('resumeUrl', e.target.value)}
                          />
                          <a href={localData.personalInfo.resumeUrl} target="_blank" rel="noreferrer" className="preview-link">Verify link</a>
                        </div>
                        <p className="input-hint">This link will sync with the 'Resume' button in your site menu.</p>
                      </div>
                    </div>

                    <div className="config-card full">
                      <h3>Biography</h3>
                      {localData.personalInfo.bio.map((para, index) => (
                        <div key={index} className="input-group">
                          <label>Paragraph {index + 1}</label>
                          <textarea 
                            value={para} 
                            rows="4"
                            onChange={(e) => {
                              const newBio = [...localData.personalInfo.bio];
                              newBio[index] = e.target.value;
                              updatePersonalInfo('bio', newBio);
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="config-card">
                      <h3>Social Integration</h3>
                      <div className="social-inputs">
                        {Object.entries(localData.personalInfo.socials).map(([platform, url]) => (
                          <div key={platform} className="input-group">
                            <label>{platform}</label>
                            <input 
                              type="text" 
                              value={url} 
                              onChange={(e) => updateSocials(platform, e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="config-card">
                      <h3>Global Footer</h3>
                      <div className="input-group">
                        <label>Location / Address</label>
                        <input 
                          type="text" 
                          value={localData.footer.address} 
                          onChange={(e) => updateFooter('address', e.target.value)}
                        />
                      </div>
                      <div className="input-group">
                        <label>Brand Tagline</label>
                        <input 
                          type="text" 
                          value={localData.footer.tagline} 
                          onChange={(e) => updateFooter('tagline', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'experience' && (
                <motion.div 
                  key="experience"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="config-section"
                >
                  <div className="section-header-row">
                    <h2>Experience Timeline</h2>
                    <button className="ghost-add-btn" onClick={() => addItem('experiences', { company: '', role: '', period: '', icon: '💼' })}>
                      + NEW ENTRY
                    </button>
                  </div>
                  <div className="experience-stack">
                    {localData.experiences.map((exp) => (
                      <div key={exp.id} className="item-row-card">
                        <div className="item-main-fields">
                          <input type="text" value={exp.company} placeholder="Organization" onChange={(e) => updateListItem('experiences', exp.id, 'company', e.target.value)} />
                          <input type="text" value={exp.role} placeholder="Specialization" onChange={(e) => updateListItem('experiences', exp.id, 'role', e.target.value)} />
                          <input type="text" value={exp.period} placeholder="Timeframe" onChange={(e) => updateListItem('experiences', exp.id, 'period', e.target.value)} />
                          <input type="text" value={exp.icon} placeholder="Logo URL" onChange={(e) => updateListItem('experiences', exp.id, 'icon', e.target.value)} />
                        </div>
                        <button className="row-delete-btn" onClick={() => removeItem('experiences', exp.id)}>×</button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'certifications' && (
                <motion.div 
                  key="certifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="config-section"
                >
                  <div className="section-header-row">
                    <h2>Validations & Certs</h2>
                    <button className="ghost-add-btn" onClick={() => addItem('certifications', { name: '', issuer: '', link: '', icon: '📜' })}>
                      + NEW ENTRY
                    </button>
                  </div>
                  <div className="experience-stack">
                    {localData.certifications.map((cert) => (
                      <div key={cert.id} className="item-row-card">
                        <div className="item-main-fields">
                          <input type="text" value={cert.name} placeholder="Certification Name" onChange={(e) => updateListItem('certifications', cert.id, 'name', e.target.value)} />
                          <input type="text" value={cert.issuer} placeholder="Issuing Body" onChange={(e) => updateListItem('certifications', cert.id, 'issuer', e.target.value)} />
                          <input type="text" value={cert.link} placeholder="Validation Link" onChange={(e) => updateListItem('certifications', cert.id, 'link', e.target.value)} />
                          <input type="text" value={cert.icon} placeholder="Logo URL" onChange={(e) => updateListItem('certifications', cert.id, 'icon', e.target.value)} />
                        </div>
                        <button className="row-delete-btn" onClick={() => removeItem('certifications', cert.id)}>×</button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'work' && (
                <motion.div 
                  key="work"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="config-section"
                >
                  <div className="section-header-row">
                    <h2>Project Portfolio</h2>
                    <button className="ghost-add-btn" onClick={() => addItem('projects', { title: '', category: 'Growth', image: '', description: '', year: '2024' })}>
                      + NEW PROJECT
                    </button>
                  </div>
                  <div className="projects-grid-layout">
                    {localData.projects.map((project) => (
                      <div key={project.id} className="project-detail-card">
                        <div className="card-controls">
                          <button className="card-delete" onClick={() => removeItem('projects', project.id)}>REMOVE</button>
                        </div>
                        <div className="card-body">
                          <div className="input-group">
                            <label>Project Title</label>
                            <input type="text" value={project.title} onChange={(e) => updateListItem('projects', project.id, 'title', e.target.value)} />
                          </div>
                          <div className="input-group">
                            <label>Visual Identity (Image URL)</label>
                            <input type="text" value={project.image} onChange={(e) => updateListItem('projects', project.id, 'image', e.target.value)} />
                          </div>
                          <div className="input-row">
                            <div className="input-group">
                              <label>Classification</label>
                              <input type="text" value={project.category} onChange={(e) => updateListItem('projects', project.id, 'category', e.target.value)} />
                            </div>
                            <div className="input-group">
                              <label>Year</label>
                              <input type="text" value={project.year} onChange={(e) => updateListItem('projects', project.id, 'year', e.target.value)} />
                            </div>
                          </div>
                          <div className="input-group">
                            <label>Outcome Summary</label>
                            <textarea rows="3" value={project.description} onChange={(e) => updateListItem('projects', project.id, 'description', e.target.value)} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
