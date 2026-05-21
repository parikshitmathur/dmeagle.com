// src/all-pages/home.js
import React from 'react';
import HeroSlider from './HeroSlider';
import PlacementTicker from './PlacementTicker';
import AboutSection from './AboutSection'; 
import FeaturesSection from './FeaturesSection'; 
import Testimonials from './Testimonials'; // 👈 Naya Testimonials section import kiya!

function Home() {
  return (
    <div className="home-page-content">
      {/* 1. Main Banner */}
      <HeroSlider />
      
      {/* 2. Moving Logos (Marquee) */}
      <PlacementTicker />

      {/* 3. Who We Are (Intro Section) */}
      <AboutSection /> 
      
      {/* 4. Why Choose Us / Core Features */}
      <FeaturesSection /> 

      {/* 5. What Our Client Say (Google Reviews Slider/Grid) */}
      <Testimonials /> 

      {/* Aage ke sections (Courses etc.) yahan aayenge */}
    </div>
  );
}

export default Home;