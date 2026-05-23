import React from "react";
import "../../css/AboutSection.css";

function AboutSection() {
  return (
    <section className="ultra-about-section" id="about">
      
      {/* Animated Background Glows */}
      <div className="about-bg-circle circle-1"></div>
      <div className="about-bg-circle circle-2"></div>
      <div className="about-bg-circle circle-3"></div>

      {/* LEFT SIDE: Image Composition */}
      <div className="ultra-about-left">
        
        <div className="about-img about-img-main">
          <img
            src="https://i.pinimg.com/736x/e6/7e/8e/e67e8e21b00b6f62da0d971e8991de5f.jpg"
            alt="Main Workspace"
          />
        </div>

        <div className="about-img about-img-small">
          <img
            src="https://i.pinimg.com/736x/6e/88/83/6e88831da28e75113c473235af999398.jpg"
            alt="Team Working"
          />
        </div>

        {/* 5+ EXPERIENCE STRIP (FIXED POSITIONING) */}
        <div className="experience-card">
          <h2>5+</h2>
          <p>Years Of<br />Experience</p>
        </div>

        {/* Floating Particles */}
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
      </div>

      {/* RIGHT SIDE: Content & 4 Features Grid */}
      <div className="ultra-about-right">
        
        <span className="about-top-tag">
          🚀 Digital Marketing Agency
        </span>

        <h1 className="about-title">
          We Create <span>Powerful</span> Digital Experiences
        </h1>

        <p className="about-desc">
          We help brands dominate the digital world with modern
          marketing strategies, premium graphics design, video editing,
          branding, affiliate marketing, and high-converting campaigns.
        </p>

        {/* 4 FEATURES GRID */}
        <div className="ultra-features-grid">
          <div className="ultra-feature-card">
            <div className="feature-icon-box">🚀</div>
            <h3>Growth Strategy</h3>
            <p>Scale your business with advanced digital automated systems.</p>
          </div>

          <div className="ultra-feature-card">
            <div className="feature-icon-box">🎨</div>
            <h3>Creative Branding</h3>
            <p>Modern UI/UX setups and premium global visual identity solutions.</p>
          </div>

          <div className="ultra-feature-card">
            <div className="feature-icon-box">📈</div>
            <h3>SEO Marketing</h3>
            <p>Boost search ranks and organic visibility with smart systems.</p>
          </div>

          <div className="ultra-feature-card">
            <div className="feature-icon-box">💎</div>
            <h3>Premium Support</h3>
            <p>Dedicated 24/7 expert developer and strategic partner support.</p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="about-btn-group">
          <a href="#contact" className="primary-about-btn">
            Get Started <span>→</span>
          </a>
          <a href="#services" className="secondary-about-btn">
            View Services
          </a>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;