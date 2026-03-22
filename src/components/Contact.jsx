import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    enquiryType: 'Job opportunity',
    companyName: '',
    yourRole: 'HR recruiter',
    projectRequirement: 'Full digital strategy',
    timeline: 'Immediately',
    fileLink: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Thank you! Your message has been sent (simulated).');
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1 className="contact-title">Get in touch ↓</h1>
        </div>

        <form 
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <div className="form-grid">
            {/* Primary Info */}
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                placeholder="John Doe" 
                required 
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                placeholder="john@example.com" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone Number (Optional)</label>
              <input 
                type="tel" 
                name="phone" 
                placeholder="+1 234 567 890" 
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Selection Fields */}
            <div className="form-group">
              <label>Enquiry Type</label>
              <select name="enquiryType" value={formData.enquiryType} onChange={handleChange}>
                <option>Job opportunity</option>
                <option>Freelance project</option>
                <option>Collaboration</option>
                <option>General enquiry</option>
              </select>
            </div>

            {/* Company Context */}
            <div className="form-group">
              <label>Company Name</label>
              <input 
                type="text" 
                name="companyName" 
                placeholder="Company Inc." 
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Your Role</label>
              <select name="yourRole" value={formData.yourRole} onChange={handleChange}>
                <option>HR recruiter</option>
                <option>Founder</option>
                <option>Business owner</option>
                <option>Marketing manager</option>
                <option>Other</option>
              </select>
            </div>

            {/* Project Details */}
            <div className="form-group">
              <label>Project Requirement</label>
              <select name="projectRequirement" value={formData.projectRequirement} onChange={handleChange}>
                <option>SEO</option>
                <option>Google Ads</option>
                <option>Social media marketing</option>
                <option>Website development</option>
                <option>Full digital strategy</option>
              </select>
            </div>
            <div className="form-group">
              <label>Timeline</label>
              <select name="timeline" value={formData.timeline} onChange={handleChange}>
                <option>Immediately</option>
                <option>Within one month</option>
                <option>Just exploring</option>
              </select>
            </div>

            {/* File Link */}
            <div className="form-group full-width">
              <label>File link / Website URL (Optional)</label>
              <input 
                type="text" 
                name="fileLink" 
                placeholder="Job description URL, Portfolio, etc." 
                value={formData.fileLink}
                onChange={handleChange}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
          >
            Let's Connect
          </button>

          <div className="contact-availability">
            <p><strong>Available for freelance and full-time opportunities</strong></p>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Contact;
