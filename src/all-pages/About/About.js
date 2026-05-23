import React from 'react';
import PageBanner from './components/PageBanner';
import AboutFeatures from './aboutFeatures'; 
import AboutValue from './AboutValue'; 
import AboutCta from './AboutCta'; // 👈 1. Naya CTA module import kiya

function AboutPage() {
  return (
    <div className="about-page-wrapper" style={{ background: '#ffffff', minHeight: '100vh' }}>
      
      {/* 1. TOP PREMIUM BANNER */}
      <PageBanner 
        title="Discover Our Values &" 
        highlightText="Expert Solutions!" 
        currentPage="About Us" 
      />

      {/* 2. MIDDLE WHITE ULTRA FEATURE GRID */}
      <AboutFeatures />

      {/* 3. LOWER MISSION & VISION STACK LAYER (SCROLL TIMED REVEALS) */}
      <AboutValue />

      {/* 4. SOLID BLUE DYNAMIC CALL TO ACTION BANNER */}
      <AboutCta /> {/* 👈 2. Yahan execute karwa diya! */}

    </div>
  );
}

export default AboutPage;