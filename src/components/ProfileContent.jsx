import React from 'react';
import './ProfileContent.css';

const ProfileContent = () => {
  return (
    <section id="profile" className="profile">
      <div className="container">
        <div className="profile__grid">
          <div className="profile__column">
            <h2 className="profile__section-title">Experience</h2>
            <div className="profile__item">
              <span className="profile__year">2022 — Present</span>
              <h3 className="profile__role">Senior Brand Designer</h3>
              <p className="profile__company">Creative Studio</p>
            </div>
            <div className="profile__item">
              <span className="profile__year">2019 — 2022</span>
              <h3 className="profile__role">Visual Designer</h3>
              <p className="profile__company">Design Agency</p>
            </div>
          </div>
          <div className="profile__column">
            <h2 className="profile__section-title">Education</h2>
            <div className="profile__item">
              <span className="profile__year">2015 — 2019</span>
              <h3 className="profile__role">Bachelor of Design</h3>
              <p className="profile__company">University of Arts</p>
            </div>
          </div>
          <div className="profile__column">
            <h2 className="profile__section-title">Expertise</h2>
            <ul className="profile__list">
              <li>Brand Identity</li>
              <li>Visual Systems</li>
              <li>Digital Experience</li>
              <li>Art Direction</li>
              <li>Interaction Design</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileContent;
