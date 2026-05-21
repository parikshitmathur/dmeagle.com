import React from 'react';
import PageBanner from './components/PageBanner';
import AboutFeatures from './aboutFeatures'; 
import AboutValue from './AboutValue'; 
import AboutCta from './AboutCta'; 

function AboutPage() {
  return (
    <div className="about-page-wrapper" style={{ background: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. TOP PREMIUM BANNER */}
      <PageBanner 
        title="Discover Our Values &" 
        highlightText="Expert Solutions!" 
        currentPage="About Us" 
      />

      {/* 2. MIDDLE WHITE ULTRA FEATURE GRID */}
      <AboutFeatures />

      {/* 3. LOWER MISSION & VISION STACK LAYER */}
      <AboutValue />

      {/* 4. SOLID BLUE DYNAMIC CALL TO ACTION BANNER */}
      {/* 👈 Added safe relative wrapper layout padding taaki niche phail kar poora dikhe */}
      <div style={{ width: '100%', relative: 'position', clear: 'both', marginTop: 'auto' }}>
        <AboutCta />
      </div>

    </div>
  );
}

export default AboutPage;