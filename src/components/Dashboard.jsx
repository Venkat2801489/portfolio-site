import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const DASHBOARD_PASSWORD = import.meta.env.VITE_DASHBOARD_PASSWORD;

// ── Rich Text Toolbar ──────────────────────────────────────────────────────────
const RichToolbar = ({ onCommand }) => (
  <div className="rich-toolbar">
    <button type="button" title="Bold" onClick={() => onCommand('bold')}><b>B</b></button>
    <button type="button" title="Italic" onClick={() => onCommand('italic')}><i>I</i></button>
    <button type="button" title="Underline" onClick={() => onCommand('underline')}><u>U</u></button>
    <span className="toolbar-sep" />
    <button type="button" title="H1" onClick={() => onCommand('formatBlock', 'H1')}>H1</button>
    <button type="button" title="H2" onClick={() => onCommand('formatBlock', 'H2')}>H2</button>
    <button type="button" title="H3" onClick={() => onCommand('formatBlock', 'H3')}>H3</button>
    <span className="toolbar-sep" />
    <button type="button" title="Bullet List" onClick={() => onCommand('insertUnorderedList')}>• List</button>
    <button type="button" title="Numbered List" onClick={() => onCommand('insertOrderedList')}>1. List</button>
    <span className="toolbar-sep" />
    <button type="button" title="Insert Link" onClick={() => {
      const url = prompt('Enter URL:');
      if (url) onCommand('createLink', url);
    }}>🔗 Link</button>
    <button type="button" title="Remove Link" onClick={() => onCommand('unlink')}>✂ Unlink</button>
    <span className="toolbar-sep" />
    <button type="button" title="Clear Formatting" onClick={() => onCommand('removeFormat')}>✕ Clear</button>
  </div>
);

// ── Rich Text Editor ───────────────────────────────────────────────────────────
const RichEditor = ({ value, onChange }) => {
  const ref = useRef(null);
  const isUpdating = useRef(false);

  // Sync external value → DOM (only when changed externally)
  useEffect(() => {
    if (ref.current && !isUpdating.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = useCallback(() => {
    isUpdating.current = true;
    onChange(ref.current.innerHTML);
    setTimeout(() => { isUpdating.current = false; }, 0);
  }, [onChange]);

  const execCmd = (cmd, val) => {
    ref.current.focus();
    document.execCommand(cmd, false, val || null);
    handleInput();
  };

  return (
    <div className="rich-editor-wrapper">
      <RichToolbar onCommand={execCmd} />
      <div
        ref={ref}
        className="rich-editor"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
      />
    </div>
  );
};

// ── Logo Upload Field ──────────────────────────────────────────────────────────
const LogoField = ({ value, onChange, placeholder = "Paste logo image URL" }) => (
  <div className="logo-field">
    {value && <img src={value} alt="logo preview" className="logo-thumb" />}
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

// ── Toggle Switch ──────────────────────────────────────────────────────────────
const Toggle = ({ checked, onChange }) => (
  <label className="toggle-switch">
    <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
    <span className="toggle-track">
      <span className="toggle-thumb" />
    </span>
  </label>
);

// ═══════════════════════════════════════════════════════════════════════════════
// Dashboard Component
// ═══════════════════════════════════════════════════════════════════════════════
const Dashboard = () => {
  const { portfolioData, updatePortfolioData } = usePortfolio();
  const [activeTab, setActiveTab] = useState('general');
  const [localData, setLocalData] = useState(portfolioData);
  const [saveStatus, setSaveStatus] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => { setLocalData(portfolioData); }, [portfolioData]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === DASHBOARD_PASSWORD) { setIsAuthorized(true); setLoginError(''); }
    else setLoginError('Invalid access credentials.');
  };

  const handleSave = () => {
    updatePortfolioData(localData);
    setSaveStatus('Changes saved successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // ── Generic helpers ──────────────────────────────────────────────────────────
  const setField = (path, value) => {
    const keys = path.split('.');
    setLocalData(prev => {
      const next = { ...prev };
      let cur = next;
      for (let i = 0; i < keys.length - 1; i++) {
        cur[keys[i]] = Array.isArray(cur[keys[i]]) ? [...cur[keys[i]]] : { ...cur[keys[i]] };
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const updatePersonalInfo = (field, value) =>
    setLocalData(p => ({ ...p, personalInfo: { ...p.personalInfo, [field]: value } }));

  const updateFooter = (field, value) =>
    setLocalData(p => ({ ...p, footer: { ...p.footer, [field]: value } }));

  const addItem = (listName, newItem) =>
    setLocalData(p => ({ ...p, [listName]: [...p[listName], { ...newItem, id: Date.now() }] }));

  const removeItem = (listName, id) =>
    setLocalData(p => ({ ...p, [listName]: p[listName].filter(item => item.id !== id) }));

  const updateListItem = (listName, id, field, value) =>
    setLocalData(p => ({
      ...p,
      [listName]: p[listName].map(item => item.id === id ? { ...item, [field]: value } : item)
    }));

  // ── Focus helpers ────────────────────────────────────────────────────────────
  const addFocus = () =>
    setLocalData(p => ({ ...p, focus: [...p.focus, { id: Date.now(), label: '', enabled: true }] }));

  const removeFocus = (id) =>
    setLocalData(p => ({ ...p, focus: p.focus.filter(f => f.id !== id) }));

  const updateFocus = (id, field, value) =>
    setLocalData(p => ({ ...p, focus: p.focus.map(f => f.id === id ? { ...f, [field]: value } : f) }));

  // ── Facts helpers ────────────────────────────────────────────────────────────
  const addFact = () =>
    setLocalData(p => ({ ...p, facts: [...p.facts, ''] }));

  const removeFact = (i) =>
    setLocalData(p => ({ ...p, facts: p.facts.filter((_, idx) => idx !== i) }));

  const updateFact = (i, value) =>
    setLocalData(p => { const f = [...p.facts]; f[i] = value; return { ...p, facts: f }; });

  // ── Tools helpers ────────────────────────────────────────────────────────────
  const addTool = () =>
    setLocalData(p => ({ ...p, tools: [...(p.tools || []), { id: Date.now(), label: '', enabled: true }] }));

  const removeTool = (id) =>
    setLocalData(p => ({ ...p, tools: p.tools.filter(t => t.id !== id) }));

  const updateTool = (id, field, value) =>
    setLocalData(p => ({ ...p, tools: p.tools.map(t => t.id === id ? { ...t, [field]: value } : t) }));

  // ── Testimonials helpers ─────────────────────────────────────────────────────
  const addTestimonial = () =>
    setLocalData(p => ({ ...p, testimonials: [...(p.testimonials || []), { id: Date.now(), name: '', industry: '', content: '', enabled: true }] }));

  const removeTestimonial = (id) =>
    setLocalData(p => ({ ...p, testimonials: p.testimonials.filter(t => t.id !== id) }));

  const updateTestimonial = (id, field, value) =>
    setLocalData(p => ({ ...p, testimonials: p.testimonials.map(t => t.id === id ? { ...t, [field]: value } : t) }));

  // ── FAQ helpers ──────────────────────────────────────────────────────────────
  const addFAQ = () =>
    setLocalData(p => ({ ...p, faqs: [...(p.faqs || []), { id: Date.now(), question: '', answer: '', enabled: true }] }));

  const removeFAQ = (id) =>
    setLocalData(p => ({ ...p, faqs: p.faqs.filter(f => f.id !== id) }));

  const updateFAQ = (id, field, value) =>
    setLocalData(p => ({ ...p, faqs: p.faqs.map(f => f.id === id ? { ...f, [field]: value } : f) }));

  // ── Education helpers ────────────────────────────────────────────────────────
  const addEducation = () =>
    setLocalData(p => ({ ...p, education: [...(p.education || []), { id: Date.now(), institution: '', location: '', period: '', degree: '', info: '', logo: '', enabled: true }] }));

  const removeEducation = (id) =>
    setLocalData(p => ({ ...p, education: p.education.filter(e => e.id !== id) }));

  const updateEducation = (id, field, value) =>
    setLocalData(p => ({ ...p, education: p.education.map(e => e.id === id ? { ...e, [field]: value } : e) }));

  // ── Project section helpers ──────────────────────────────────────────────────
  const addProjectSection = (projectId, type = 'text') =>
    setLocalData(p => ({
      ...p,
      projects: p.projects.map(proj => proj.id === projectId ? {
        ...proj,
        sections: [...(proj.sections || []), {
          id: Date.now(),
          type,
          heading: type === 'text' ? 'New Text Section' : 'New Image Section',
          content: ''
        }]
      } : proj)
    }));

  const removeProjectSection = (projectId, sectionId) =>
    setLocalData(p => ({
      ...p,
      projects: p.projects.map(proj => proj.id === projectId ? {
        ...proj,
        sections: (proj.sections || []).filter(s => s.id !== sectionId)
      } : proj)
    }));

  const updateProjectSection = (projectId, sectionId, field, value) =>
    setLocalData(p => ({
      ...p,
      projects: p.projects.map(proj => proj.id === projectId ? {
        ...proj,
        sections: (proj.sections || []).map(s => s.id === sectionId ? { ...s, [field]: value } : s)
      } : proj)
    }));

  const moveProjectSection = (projectId, fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= localData.projects.find(p => p.id === projectId).sections.length) return;
    setLocalData(p => ({
      ...p,
      projects: p.projects.map(proj => {
        if (proj.id !== projectId) return proj;
        const sections = [...(proj.sections || [])];
        const [moved] = sections.splice(fromIdx, 1);
        sections.splice(toIdx, 0, moved);
        return { ...proj, sections };
      })
    }));
  };

  const addGalleryImage = (projectId) =>
    setLocalData(p => ({
      ...p,
      projects: p.projects.map(proj => proj.id === projectId ? {
        ...proj,
        gallery: [...(proj.gallery || []), '']
      } : proj)
    }));

  const updateGalleryImage = (projectId, idx, value) =>
    setLocalData(p => ({
      ...p,
      projects: p.projects.map(proj => proj.id === projectId ? {
        ...proj,
        gallery: (proj.gallery || []).map((url, i) => i === idx ? value : url)
      } : proj)
    }));

  const removeGalleryImage = (projectId, idx) =>
    setLocalData(p => ({
      ...p,
      projects: p.projects.map(proj => proj.id === projectId ? {
        ...proj,
        gallery: (proj.gallery || []).filter((_, i) => i !== idx)
      } : proj)
    }));

  // ── SEO helpers ────────────────────────────────────────────────────────────
  const updatePageSEO = (pageKey, field, value) =>
    setLocalData(p => ({
      ...p,
      seo: {
        ...p.seo,
        pages: {
          ...p.seo.pages,
          [pageKey]: { ...p.seo.pages[pageKey], [field]: value }
        }
      }
    }));

  const updateProjectSEO = (projectId, field, value) =>
    setLocalData(p => ({
      ...p,
      projects: p.projects.map(proj => proj.id === projectId ? {
        ...proj,
        seo: { ...(proj.seo || {}), [field]: value }
      } : proj)
    }));

  // ── Login screen ─────────────────────────────────────────────────────────────
  if (!isAuthorized) {
    return (
      <div className="login-screen">
        <motion.div className="login-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="login-header">
            <div className="brand-dot"></div>
            <h1>PORTFOLIO ACCESS</h1>
          </div>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="ENTER PASSCODE" value={password}
              onChange={e => setPassword(e.target.value)} autoFocus />
            {loginError && <p className="error-msg">{loginError}</p>}
            <button type="submit">AUTHORIZE</button>
          </form>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'focus', label: 'Focus / Skills' },
    { id: 'tools', label: 'Tools' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'facts', label: 'Facts' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'work', label: 'Projects' },
    { id: 'faqs', label: 'FAQ' },
    { id: 'sync', label: '🚀 Sync / Export' },
  ];

  const downloadDataFile = () => {
    const dataString = `export const initialData = ${JSON.stringify(localData, null, 2)};`;
    const blob = new Blob([dataString], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'initialData.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-grid">

        {/* ── Sidebar ── */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-brand">
            <Link to="/" className="back-to-site">← Back to Website</Link>
            <div className="brand-main">
              <div className="brand-dot"></div>
              <span>DASHBOARD</span>
            </div>
          </div>
          <nav className="sidebar-nav">
            {tabs.map(tab => (
              <button key={tab.id}
                className={`sidebar-link ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}>
                <span className="link-label">{tab.label}</span>
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <button className="premium-save-btn" onClick={handleSave}>
              {saveStatus ? 'SAVED ✓' : 'SAVE CHANGES'}
            </button>
            {saveStatus && <p className="status-msg">{saveStatus}</p>}
            
            <button 
              className="ghost-add-btn sm" 
              style={{ width: '100%', marginTop: '20px', borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }}
              onClick={() => {
                if (window.confirm("ARE YOU SURE? This will clear all unsaved changes and reset to the latest version on GitHub.")) {
                  localStorage.removeItem('portfolio_data');
                  localStorage.removeItem('portfolio_data_version');
                  window.location.reload();
                }
              }}
            >
              RESET TO DEFAULTS
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="dashboard-main">
          <header className="content-header">
            <div className="header-meta">
              <span className="meta-tag">SYSTEM / {activeTab.toUpperCase()}</span>
              <h1>{tabs.find(t => t.id === activeTab)?.label} Configuration</h1>
            </div>
          </header>

          <div className="scroll-content">
            <AnimatePresence mode="wait">

              {/* ════════════════════════════════ SYNC TAB ══════════════════════════════════ */}
              {activeTab === 'sync' && (
                <motion.div key="sync" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} className="config-section">
                  <div className="sync-banner">
                    <div className="sync-icon">🌎</div>
                    <div className="sync-text">
                      <h2>Global Sync</h2>
                      <p>Your changes are currently saved only to <b>this browser</b>. To make them visible on all devices (including mobile) and to recruiters, follow these steps:</p>
                    </div>
                  </div>

                  <div className="sync-steps">
                    <div className="sync-step-card">
                      <div className="step-num">1</div>
                      <h4>Download File</h4>
                      <p>Download your updated data as a file.</p>
                      <button className="primary-btn" onClick={downloadDataFile}>DOWNLOAD initialData.js</button>
                    </div>
                    
                    <div className="sync-step-card">
                      <div className="step-num">2</div>
                      <h4>Replace in Project</h4>
                      <p>Replace the file in <code>src/data/initialData.js</code> with the one you just downloaded.</p>
                    </div>

                    <div className="sync-step-card">
                      <div className="step-num">3</div>
                      <h4>Push to GitHub</h4>
                      <p>Commit your changes and push to GitHub. Vercel will automatically update the live site for everyone.</p>
                    </div>
                  </div>

                  <div className="config-card full">
                    <h3>Raw Data View</h3>
                    <p className="input-hint">You can also copy this entire block and paste it into <code>src/data/initialData.js</code> manually.</p>
                    <textarea 
                      readOnly 
                      value={`export const initialData = ${JSON.stringify(localData, null, 2)};`}
                      rows="10"
                      className="code-textarea"
                      style={{ fontFamily: 'monospace', fontSize: '11px', background: '#0a0a0a', color: '#0f0', border: '1px solid #333' }}
                    />
                  </div>
                </motion.div>
              )}

              {/* ════════════════════════════════ GENERAL TAB ════════════════════════════════ */}
              {activeTab === 'general' && (
                <motion.div key="general" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} className="config-section">
                  <div className="config-grid">

                    <div className="config-card full">
                      <h3>Core Identity</h3>
                      <div className="input-row">
                        <div className="input-group">
                          <label>Display Name</label>
                          <input type="text" value={localData.personalInfo.name}
                            onChange={e => updatePersonalInfo('name', e.target.value)} />
                        </div>
                        <div className="input-group">
                          <label>Professional Role (Subtitle)</label>
                          <input type="text" value={localData.personalInfo.role}
                            onChange={e => updatePersonalInfo('role', e.target.value)} />
                        </div>
                      </div>
                      <div className="input-row">
                        <div className="input-group">
                          <label>Contact Email</label>
                          <input type="email" value={localData.personalInfo.email}
                            onChange={e => updatePersonalInfo('email', e.target.value)} />
                        </div>
                        <div className="input-group">
                          <label>Portrait Asset URL</label>
                          <input type="text" value={localData.personalInfo.portrait}
                            onChange={e => updatePersonalInfo('portrait', e.target.value)} />
                        </div>
                      </div>
                    </div>

                    <div className="config-card full">
                      <h3>Rotating Hero Designations</h3>
                      <p className="section-hint">These titles animate in sequence on your Home page's main hero section.</p>
                      <div className="designations-editor">
                        {(localData.personalInfo.designations || []).map((desc, idx) => (
                          <div key={idx} className="input-group designation-row" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <input
                              type="text"
                              value={desc}
                              placeholder="e.g. SEO Specialist"
                              style={{ flex: 1 }}
                              onChange={e => {
                                const newDescs = [...localData.personalInfo.designations];
                                newDescs[idx] = e.target.value;
                                updatePersonalInfo('designations', newDescs);
                              }}
                            />
                            <button 
                              className="row-delete-btn" 
                              style={{ padding: '0 15px', background: 'rgba(255,0,0,0.1)', color: '#ff4444', border: '1px solid rgba(255,0,0,0.2)', borderRadius: '4px', cursor: 'pointer' }}
                              onClick={() => {
                                const newDescs = localData.personalInfo.designations.filter((_, i) => i !== idx);
                                updatePersonalInfo('designations', newDescs);
                              }}
                            >
                              REMOVE
                            </button>
                          </div>
                        ))}
                        <button 
                          className="ghost-add-btn sm" 
                          style={{ marginTop: '5px' }}
                          onClick={() => {
                            const newDescs = [...(localData.personalInfo.designations || []), ""];
                            updatePersonalInfo('designations', newDescs);
                          }}
                        >
                          + ADD DESIGNATION
                        </button>
                      </div>
                    </div>

                    <div className="config-card full">
                      <h3>Resume & Assets</h3>
                      <div className="input-group">
                        <label>Resume File URL (PDF / Link)</label>
                        <div className="input-with-action">
                          <input type="text" value={localData.personalInfo.resumeUrl || ''}
                            placeholder="/resume.pdf"
                            onChange={e => updatePersonalInfo('resumeUrl', e.target.value)} />
                          <a href={localData.personalInfo.resumeUrl} target="_blank" rel="noreferrer"
                            className="preview-link">Verify link</a>
                        </div>
                        <p className="input-hint">This link syncs with the 'Resume' button in your site menu.</p>
                      </div>
                    </div>

                    <div className="config-card full">
                      <h3>Biography</h3>
                      {localData.personalInfo.bio.map((para, index) => (
                        <div key={index} className="input-group">
                          <label>Paragraph {index + 1}</label>
                          <textarea value={para} rows="4"
                            onChange={e => {
                              const newBio = [...localData.personalInfo.bio];
                              newBio[index] = e.target.value;
                              updatePersonalInfo('bio', newBio);
                            }} />
                        </div>
                      ))}
                    </div>

                    <div className="config-card">
                      <h3>Social Integration</h3>
                      <div className="social-inputs">
                        {Object.entries(localData.personalInfo.socials).map(([platform, url]) => (
                          <div key={platform} className="input-group">
                            <label>{platform}</label>
                            <input type="text" value={url}
                              onChange={e => setLocalData(p => ({
                                ...p,
                                personalInfo: {
                                  ...p.personalInfo,
                                  socials: { ...p.personalInfo.socials, [platform]: e.target.value }
                                }
                              }))} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="config-card">
                      <h3>Global Footer</h3>
                      <div className="input-group">
                        <label>Location / Address</label>
                        <input type="text" value={localData.footer.address}
                          onChange={e => updateFooter('address', e.target.value)} />
                      </div>
                      <div className="input-group">
                        <label>Brand Tagline</label>
                        <input type="text" value={localData.footer.tagline}
                          onChange={e => updateFooter('tagline', e.target.value)} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ════════════════════════════════ SEO TAB ════════════════════════════════ */}
              {activeTab === 'seo' && (
                <motion.div key="seo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} className="config-section">
                  <div className="section-header-row">
                    <div>
                      <h2>SEO & Page Settings</h2>
                      <p className="section-hint">Manage search engine visibility and professional URL slugs for your core pages.</p>
                    </div>
                  </div>
                  <div className="config-grid">
                    {Object.entries(localData.seo.pages).map(([key, page]) => (
                      <div key={key} className="config-card full">
                        <h3 style={{ textTransform: 'capitalize' }}>{key} Page SEO</h3>
                        <div className="input-row">
                          <div className="input-group">
                            <label>Professional Slug (URL Path)</label>
                            <input type="text" value={page.slug}
                              onChange={e => updatePageSEO(key, 'slug', e.target.value)} />
                          </div>
                          <div className="input-group">
                            <label>Title Tag</label>
                            <input type="text" value={page.title}
                              onChange={e => updatePageSEO(key, 'title', e.target.value)} />
                          </div>
                        </div>
                        <div className="input-group">
                          <label>Meta Description</label>
                          <textarea value={page.description} rows="2"
                            onChange={e => updatePageSEO(key, 'description', e.target.value)} />
                        </div>
                        <div className="input-row">
                          <div className="input-group">
                            <label>Keywords (comma separated)</label>
                            <input type="text" value={page.keywords}
                              onChange={e => updatePageSEO(key, 'keywords', e.target.value)} />
                          </div>
                          <div className="input-group">
                            <label>Canonical URL</label>
                            <input type="text" value={page.canonical}
                              onChange={e => updatePageSEO(key, 'canonical', e.target.value)} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ════════════════════════════════ FOCUS / SKILLS TAB ═════════════════════════ */}
              {activeTab === 'focus' && (
                <motion.div key="focus" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} className="config-section">
                  <div className="section-header-row">
                    <div>
                      <h2>Focus / Skills</h2>
                      <p className="section-hint">These appear on your Home page. Toggle to show or hide each item.</p>
                    </div>
                    <button className="ghost-add-btn" onClick={addFocus}>+ ADD SKILL</button>
                  </div>
                  <div className="focus-stack">
                    {(localData.focus || []).map((item, index) => (
                      <div key={item.id} className="focus-row-card">
                        <span className="drag-handle">⣿</span>
                        <input className="focus-label-input" type="text" value={item.label}
                          placeholder="e.g. Brand Experience"
                          onChange={e => updateFocus(item.id, 'label', e.target.value)} />
                        <div className="focus-controls">
                          <span className={`toggle-label ${item.enabled ? 'enabled' : 'disabled'}`}>
                            {item.enabled ? 'Visible' : 'Hidden'}
                          </span>
                          <Toggle checked={item.enabled} onChange={v => updateFocus(item.id, 'enabled', v)} />
                          <button className="row-delete-btn" onClick={() => removeFocus(item.id)}>×</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="input-hint" style={{ marginTop: '1rem' }}>
                    Hidden items stay in your data but won't appear on the website.
                  </p>
                </motion.div>
              )}

              {/* ════════════════════════════════ TOOLS TAB ══════════════════════════════════ */}
              {activeTab === 'tools' && (
                <motion.div key="tools" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} className="config-section">
                  <div className="section-header-row">
                    <div>
                      <h2>Tools & Technology</h2>
                      <p className="section-hint">These appear after your Focus section. Toggle to show or hide each tool.</p>
                    </div>
                    <button className="ghost-add-btn" onClick={addTool}>+ ADD TOOL</button>
                  </div>
                  <div className="focus-stack">
                    {(localData.tools || []).map((item, index) => (
                      <div key={item.id} className="focus-row-card">
                        <span className="drag-handle">⣿</span>
                        <input className="focus-label-input" type="text" value={item.label}
                          placeholder="e.g. Google Search Console"
                          onChange={e => updateTool(item.id, 'label', e.target.value)} />
                        <div className="focus-controls">
                          <span className={`toggle-label ${item.enabled ? 'enabled' : 'disabled'}`}>
                            {item.enabled ? 'Visible' : 'Hidden'}
                          </span>
                          <Toggle checked={item.enabled} onChange={v => updateTool(item.id, 'enabled', v)} />
                          <button className="row-delete-btn" onClick={() => removeTool(item.id)}>×</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ════════════════════════════════ TESTIMONIALS TAB ═══════════════════════════ */}
              {activeTab === 'testimonials' && (
                <motion.div key="testimonials" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} className="config-section">
                  <div className="section-header-row">
                    <div>
                      <h2>Testimonials & Endorsements</h2>
                      <p className="section-hint">Client feedback and professional endorsements for your work.</p>
                    </div>
                    <button className="ghost-add-btn" onClick={addTestimonial}>+ ADD TESTIMONIAL</button>
                  </div>
                  <div className="testimonials-stack">
                    {(localData.testimonials || []).map((t, i) => (
                      <div key={t.id} className="testimonial-row-card">
                        <div className="testimonial-row-header">
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <span className="facts-label">Endorsement {i + 1}</span>
                            <span className={`toggle-label ${t.enabled ? 'enabled' : 'disabled'}`}>
                              {t.enabled ? 'Visible' : 'Hidden'}
                            </span>
                            <Toggle checked={t.enabled} onChange={v => updateTestimonial(t.id, 'enabled', v)} />
                          </div>
                          <button className="row-delete-btn text-btn" onClick={() => removeTestimonial(t.id)}>× Remove</button>
                        </div>
                        <div className="input-row">
                          <div className="input-group">
                            <label>Name</label>
                            <input type="text" value={t.name} placeholder="Client Name"
                              onChange={e => updateTestimonial(t.id, 'name', e.target.value)} />
                          </div>
                          <div className="input-group">
                            <label>Industry / Designation</label>
                            <input type="text" value={t.industry} placeholder="e.g. CEO at TechCorp"
                              onChange={e => updateTestimonial(t.id, 'industry', e.target.value)} />
                          </div>
                        </div>
                        <div className="input-group">
                          <label>Testimonial Content</label>
                          <textarea value={t.content} rows="3" placeholder="What they said..."
                            onChange={e => updateTestimonial(t.id, 'content', e.target.value)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ════════════════════════════════ FACTS TAB ══════════════════════════════════ */}
              {activeTab === 'facts' && (
                <motion.div key="facts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} className="config-section">
                  <div className="section-header-row">
                    <div>
                      <h2>Facts Section</h2>
                      <p className="section-hint">Paragraphs displayed in the Facts section on your Home page.</p>
                    </div>
                    <button className="ghost-add-btn" onClick={addFact}>+ ADD PARAGRAPH</button>
                  </div>
                  <div className="facts-stack">
                    {(localData.facts || []).map((para, i) => (
                      <div key={i} className="facts-row-card">
                        <div className="facts-row-header">
                          <span className="facts-label">Paragraph {i + 1}</span>
                          <button className="row-delete-btn" onClick={() => removeFact(i)}>× Remove</button>
                        </div>
                        <textarea value={para} rows="5"
                          placeholder="Enter paragraph text..."
                          onChange={e => updateFact(i, e.target.value)} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ════════════════════════════════ EXPERIENCE TAB ═════════════════════════════ */}
              {activeTab === 'experience' && (
                <motion.div key="experience" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} className="config-section">
                  <div className="section-header-row">
                    <h2>Experience Timeline</h2>
                    <button className="ghost-add-btn"
                      onClick={() => addItem('experiences', { company: '', role: '', logo: '', period: '' })}>
                      + NEW ENTRY
                    </button>
                  </div>
                  <div className="experience-stack">
                    {localData.experiences.map(exp => (
                      <div key={exp.id} className="item-row-card exp-card">
                        <div className="exp-logo-col">
                          <div className="logo-preview-box">
                            {exp.logo
                              ? <img src={exp.logo} alt={exp.company} className="logo-thumb-lg" />
                              : <div className="logo-placeholder">{exp.company?.[0] || '?'}</div>
                            }
                          </div>
                          <div className="input-group" style={{ flex: 1 }}>
                            <label>Company Logo URL</label>
                            <LogoField value={exp.logo || ''}
                              onChange={v => updateListItem('experiences', exp.id, 'logo', v)} />
                          </div>
                        </div>
                        <div className="item-main-fields">
                          <div className="input-group">
                            <label>Organization</label>
                            <input type="text" value={exp.company} placeholder="Company name"
                              onChange={e => updateListItem('experiences', exp.id, 'company', e.target.value)} />
                          </div>
                          <div className="input-group">
                            <label>Role / Specialization</label>
                            <input type="text" value={exp.role} placeholder="Your role"
                              onChange={e => updateListItem('experiences', exp.id, 'role', e.target.value)} />
                          </div>
                          <div className="input-group">
                            <label>Period</label>
                            <input type="text" value={exp.period} placeholder="e.g. JAN 2021 – DEC 2022"
                              onChange={e => updateListItem('experiences', exp.id, 'period', e.target.value)} />
                          </div>
                        </div>
                        <button className="row-delete-btn" onClick={() => removeItem('experiences', exp.id)}>×</button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ════════════════════════════════ CERTIFICATIONS TAB ═════════════════════════ */}
              {activeTab === 'certifications' && (
                <motion.div key="certifications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} className="config-section">
                  <div className="section-header-row">
                    <h2>Certifications</h2>
                    <button className="ghost-add-btn"
                      onClick={() => addItem('certifications', { name: '', issuer: '', logo: '', link: '' })}>
                      + NEW ENTRY
                    </button>
                  </div>
                  <div className="experience-stack">
                    {localData.certifications.map(cert => (
                      <div key={cert.id} className="item-row-card exp-card">
                        <div className="exp-logo-col">
                          <div className="logo-preview-box">
                            {cert.logo
                              ? <img src={cert.logo} alt={cert.issuer} className="logo-thumb-lg" />
                              : <div className="logo-placeholder">{cert.issuer?.[0] || '?'}</div>
                            }
                          </div>
                          <div className="input-group" style={{ flex: 1 }}>
                            <label>Issuer Logo URL</label>
                            <LogoField value={cert.logo || ''}
                              onChange={v => updateListItem('certifications', cert.id, 'logo', v)} />
                          </div>
                        </div>
                        <div className="item-main-fields">
                          <div className="input-group">
                            <label>Certification Name</label>
                            <input type="text" value={cert.name} placeholder="Certificate title"
                              onChange={e => updateListItem('certifications', cert.id, 'name', e.target.value)} />
                          </div>
                          <div className="input-group">
                            <label>Issuing Body</label>
                            <input type="text" value={cert.issuer} placeholder="e.g. Google, HubSpot"
                              onChange={e => updateListItem('certifications', cert.id, 'issuer', e.target.value)} />
                          </div>
                          <div className="input-group">
                            <label>Validation Link</label>
                            <input type="text" value={cert.link} placeholder="https://..."
                              onChange={e => updateListItem('certifications', cert.id, 'link', e.target.value)} />
                          </div>
                        </div>
                        <button className="row-delete-btn" onClick={() => removeItem('certifications', cert.id)}>×</button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ════════════════════════════════ EDUCATION TAB ═══════════════════════════════ */}
              {activeTab === 'education' && (
                <motion.div key="education" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} className="config-section">
                  <div className="section-header-row">
                    <div>
                      <h2>Education Timeline</h2>
                      <p className="section-hint">Your academic background and degrees.</p>
                    </div>
                    <button className="ghost-add-btn" onClick={addEducation}>+ NEW ENTRY</button>
                  </div>
                  <div className="experience-stack">
                    {((localData && localData.education) || []).map((edu, i) => (
                      <div key={edu.id} className="item-row-card exp-card">
                        <div className="exp-logo-col">
                          <div className="logo-preview-box">
                            {edu.logo
                              ? <img src={edu.logo} alt={edu.institution} className="logo-thumb-lg" />
                              : <div className="logo-placeholder">{edu.institution?.[0] || '?'}</div>
                            }
                          </div>
                          <div className="input-group" style={{ flex: 1 }}>
                            <label>Institution Logo URL</label>
                            <LogoField value={edu.logo || ''}
                              onChange={v => updateEducation(edu.id, 'logo', v)} />
                          </div>
                        </div>
                        <div className="item-main-fields">
                          <div className="input-group">
                            <label>Institution</label>
                            <input type="text" value={edu.institution} placeholder="University Name"
                              onChange={e => updateEducation(edu.id, 'institution', e.target.value)} />
                          </div>
                          <div className="input-group">
                            <label>Degree / Specialization</label>
                            <input type="text" value={edu.degree} placeholder="e.g. BE - Electrical Engineering"
                              onChange={e => updateEducation(edu.id, 'degree', e.target.value)} />
                          </div>
                          <div className="input-row">
                            <div className="input-group">
                              <label>Period</label>
                              <input type="text" value={edu.period} placeholder="e.g. Jul 2017 - Aug 2021"
                                onChange={e => updateEducation(edu.id, 'period', e.target.value)} />
                            </div>
                            <div className="input-group">
                              <label>Location / CGPA / Info</label>
                              <input type="text" value={edu.location || edu.info || ''} placeholder="e.g. Padur, TN | CGPA: 7.24"
                                onChange={e => {
                                  updateEducation(edu.id, 'location', e.target.value);
                                  updateEducation(edu.id, 'info', e.target.value);
                                }} />
                            </div>
                          </div>
                        </div>
                        <button className="row-delete-btn" onClick={() => removeEducation(edu.id)}>×</button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ════════════════════════════════ PROJECTS TAB ═══════════════════════════════ */}
              {activeTab === 'work' && (
                <motion.div key="work" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} className="config-section">
                  <div className="section-header-row">
                    <h2>Project Portfolio</h2>
                    <button className="ghost-add-btn"
                      onClick={() => addItem('projects', {
                        title: '', category: 'Growth', image: '', year: '2024',
                        description: '', driveLink: '', notionLink: '',
                        gallery: [],
                        sections: [
                          { id: Date.now() + 1, heading: 'Overview', content: '' },
                          { id: Date.now() + 2, heading: 'The Challenge', content: '' },
                          { id: Date.now() + 3, heading: 'Solution', content: '' },
                          { id: Date.now() + 4, heading: 'Results', content: '' },
                        ]
                      })}>
                      + NEW PROJECT
                    </button>
                  </div>

                  <div className="projects-grid-layout">
                    {localData.projects.map(project => (
                      <div key={project.id} className="project-detail-card">

                        {/* Project header / accordion toggle */}
                        <div className="project-card-header"
                          onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}>
                          <div className="proj-header-left">
                            {project.image && <img src={project.image} alt={project.title} className="proj-thumb" />}
                            <div>
                              <span className="proj-cat-tag">{project.category}</span>
                              <h3>{project.title || 'Untitled Project'}</h3>
                              <span className="proj-year">{project.year}</span>
                            </div>
                          </div>
                          <div className="proj-header-right">
                            <button className="card-delete" onClick={e => { e.stopPropagation(); removeItem('projects', project.id); }}>
                              REMOVE
                            </button>
                            <span className="expand-icon">{expandedProject === project.id ? '▼' : '▶'}</span>
                          </div>
                        </div>

                        {/* Expanded editor */}
                        <AnimatePresence>
                          {expandedProject === project.id && (
                            <motion.div className="project-editor"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}>

                              {/* ── Basic Info ── */}
                              <div className="editor-block">
                                <h4 className="editor-block-title">Basic Info</h4>
                                <div className="input-group">
                                  <label>Project Title</label>
                                  <input type="text" value={project.title}
                                    onChange={e => updateListItem('projects', project.id, 'title', e.target.value)} />
                                </div>
                                <div className="input-row">
                                  <div className="input-group">
                                    <label>Category / Tag</label>
                                    <input type="text" value={project.category}
                                      onChange={e => updateListItem('projects', project.id, 'category', e.target.value)} />
                                  </div>
                                  <div className="input-group">
                                    <label>Year</label>
                                    <input type="text" value={project.year}
                                      onChange={e => updateListItem('projects', project.id, 'year', e.target.value)} />
                                  </div>
                                </div>
                                <div className="input-group">
                                  <label>Cover Image URL</label>
                                  <input type="text" value={project.image}
                                    onChange={e => updateListItem('projects', project.id, 'image', e.target.value)} />
                                </div>
                                <div className="input-group">
                                  <label>Short Description (card summary)</label>
                                  <textarea rows="2" value={project.description}
                                    onChange={e => updateListItem('projects', project.id, 'description', e.target.value)} />
                                </div>
                              </div>

                              {/* ── Resource Links ── */}
                              <div className="editor-block">
                                <h4 className="editor-block-title">Resource Links</h4>
                                <div className="input-row">
                                  <div className="input-group">
                                    <label>Google Drive Link</label>
                                    <input type="text" value={project.driveLink || ''} placeholder="https://drive.google.com/..."
                                      onChange={e => updateListItem('projects', project.id, 'driveLink', e.target.value)} />
                                  </div>
                                  <div className="input-group">
                                    <label>Notion Link</label>
                                    <input type="text" value={project.notionLink || ''} placeholder="https://notion.so/..."
                                      onChange={e => updateListItem('projects', project.id, 'notionLink', e.target.value)} />
                                  </div>
                                </div>
                              </div>

                              {/* ── Project SEO Settings ── */}
                              <div className="editor-block">
                                <div className="editor-block-header">
                                  <h4 className="editor-block-title">SEO Settings</h4>
                                </div>
                                <div className="config-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--db-border-light)', padding: '16px' }}>
                                  <div className="input-row">
                                    <div className="input-group">
                                      <label>Project Slug</label>
                                      <input type="text" value={project.slug || ''} placeholder="e-g-google-maps-seo"
                                        onChange={e => setLocalData(p => ({
                                          ...p,
                                          projects: p.projects.map(proj => proj.id === project.id ? { ...proj, slug: e.target.value } : proj)
                                        }))} />
                                    </div>
                                    <div className="input-group">
                                      <label>SEO Title Tag</label>
                                      <input type="text" value={project.seo?.title || ''}
                                        onChange={e => updateProjectSEO(project.id, 'title', e.target.value)} />
                                    </div>
                                  </div>
                                  <div className="input-group">
                                    <label>SEO Meta Description</label>
                                    <textarea value={project.seo?.description || ''} rows="2"
                                      onChange={e => updateProjectSEO(project.id, 'description', e.target.value)} />
                                  </div>
                                  <div className="input-group">
                                    <label>SEO Keywords</label>
                                    <input type="text" value={project.seo?.keywords || ''}
                                      onChange={e => updateProjectSEO(project.id, 'keywords', e.target.value)} />
                                  </div>
                                </div>
                              </div>

                              {/* ── Content Sections ── */}
                              <div className="editor-block">
                                <div className="editor-block-header">
                                  <h4 className="editor-block-title">Content Sections</h4>
                                  <div style={{ display: 'flex', gap: '8px' }}>
                                    <button className="ghost-add-btn sm" onClick={() => addProjectSection(project.id, 'text')}>
                                      + Add Text
                                    </button>
                                    <button className="ghost-add-btn sm" onClick={() => addProjectSection(project.id, 'image')}>
                                      + Add Image
                                    </button>
                                  </div>
                                </div>
                                {(project.sections || []).map((section, si) => (
                                  <div key={section.id} 
                                    className="content-section-card"
                                    draggable
                                    onDragStart={e => e.dataTransfer.setData('text/plain', si)}
                                    onDragOver={e => e.preventDefault()}
                                    onDrop={e => {
                                      e.preventDefault();
                                      const fromIdx = parseInt(e.dataTransfer.getData('text/plain'));
                                      moveProjectSection(project.id, fromIdx, si);
                                    }}
                                  >
                                    <div className="section-card-header">
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                                        <span className="drag-handle" style={{ cursor: 'grab' }}>⣿</span>
                                        <input className="section-heading-input" type="text"
                                          value={section.heading} placeholder={section.type === 'image' ? 'Image Caption (optional)' : 'Section Heading'}
                                          onChange={e => updateProjectSection(project.id, section.id, 'heading', e.target.value)} />
                                      </div>
                                      <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className="row-delete-btn" style={{ fontSize: '10px' }}
                                          onClick={() => moveProjectSection(project.id, si, si - 1)}>↑</button>
                                        <button className="row-delete-btn" style={{ fontSize: '10px' }}
                                          onClick={() => moveProjectSection(project.id, si, si + 1)}>↓</button>
                                        <button className="row-delete-btn"
                                          onClick={() => removeProjectSection(project.id, section.id)}>
                                          ×
                                        </button>
                                      </div>
                                    </div>
                                    
                                    {section.type === 'image' ? (
                                      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div className="input-group">
                                          <label>Section Image URL</label>
                                          <LogoField 
                                            value={section.content} 
                                            onChange={v => updateProjectSection(project.id, section.id, 'content', v)} 
                                          />
                                        </div>
                                        {section.content && (
                                          <div style={{ width: '100%', height: '200px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--db-border-light)' }}>
                                            <img src={section.content} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }} />
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <RichEditor
                                        value={section.content}
                                        onChange={v => updateProjectSection(project.id, section.id, 'content', v)}
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>

                              {/* ── Gallery ── */}
                              <div className="editor-block">
                                <div className="editor-block-header">
                                  <h4 className="editor-block-title">Gallery Images</h4>
                                  <button className="ghost-add-btn sm" onClick={() => addGalleryImage(project.id)}>
                                    + Add Image
                                  </button>
                                </div>
                                {(project.gallery || []).length === 0 && (
                                  <p className="input-hint">No gallery images yet. Add image URLs above.</p>
                                )}
                                <div className="gallery-url-list">
                                  {(project.gallery || []).map((url, gi) => (
                                    <div key={gi} className="gallery-url-row">
                                      {url && <img src={url} alt={`gallery-${gi}`} className="gallery-thumb" />}
                                      <input type="text" value={url} placeholder="https://..."
                                        onChange={e => updateGalleryImage(project.id, gi, e.target.value)} />
                                      <button className="row-delete-btn"
                                        onClick={() => removeGalleryImage(project.id, gi)}>×</button>
                                    </div>
                                  ))}
                                </div>
                              </div>

                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ════════════════════════════════ FAQ TAB ════════════════════════════════════ */}
              {activeTab === 'faqs' && (
                <motion.div key="faqs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} className="config-section">
                  <div className="section-header-row">
                    <div>
                      <h2>Frequently Asked Questions</h2>
                      <p className="section-hint">General questions about your services and workflow.</p>
                    </div>
                    <button className="ghost-add-btn" onClick={addFAQ}>+ ADD FAQ</button>
                  </div>
                  <div className="faq-stack">
                    {(localData.faqs || []).map((f, i) => (
                      <div key={f.id} className="faq-row-card">
                        <div className="faq-row-header">
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <span className="facts-label">FAQ {i + 1}</span>
                            <span className={`toggle-label ${f.enabled ? 'enabled' : 'disabled'}`}>
                              {f.enabled ? 'Visible' : 'Hidden'}
                            </span>
                            <Toggle checked={f.enabled} onChange={v => updateFAQ(f.id, 'enabled', v)} />
                          </div>
                          <button className="row-delete-btn text-btn" onClick={() => removeFAQ(f.id)}>× Remove</button>
                        </div>
                        <div className="input-group">
                          <label>Question</label>
                          <input type="text" value={f.question} placeholder="Enter question..."
                            onChange={e => updateFAQ(f.id, 'question', e.target.value)} />
                        </div>
                        <div className="input-group">
                          <label>Answer</label>
                          <textarea value={f.answer} rows="3" placeholder="Enter answer..."
                            onChange={e => updateFAQ(f.id, 'answer', e.target.value)} />
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
