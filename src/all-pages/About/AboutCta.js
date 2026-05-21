import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './css/AboutCta.css'; // 👈 👈 Path direct barabar wale subfolder asset se link kiya

function AboutCta() {
  return (
    <section className="about-cta-section">
      
      {/* BACKGROUND VECTOR LAYERS */}
      <div className="cta-fluid-left"></div>
      <div className="cta-fluid-right"></div>

      <div className="about-cta-container">
        
        {/* BANNER MAIN HEADINGS */}
        <h2 className="about-cta-title">
          Helping You Soar—No Matter Your<br />Role in the Digital World.
        </h2>
        
        {/* BANNER SUB HEADINGS */}
        <p className="about-cta-desc">
          No experience? No worries! You can start from the ground up and see quick growth.
        </p>

        {/* INTERACTIVE BUTTON HOVER CORE */}
        <a href="#contact" className="about-cta-btn">
          Free Consultation
          <div className="cta-icon-circle">
            <ArrowUpRight size={15} />
          </div>
        </a>

      </div>
    </section>
  );
}

export default AboutCta;