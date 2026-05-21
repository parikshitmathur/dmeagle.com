// src/all-pages/HeroSlider.js
import React, { useState, useEffect } from 'react';
import '../../css/HeroSlider.css'; //  Double '../../' zaroori hai!

function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  // Default Premium Core Data Engine (Fail-safe backup layout)
  const defaultSlides = [
    {
      id: 1,
      tag: "🚀 FLIGHT YOUR CAREER HIGH",
      title: "Use In-Demand <span>Digital Skills</span> to Transform Passion into Profession.",
      description: "Gain practical experience in design, video editing, digital marketing and more — from beginner to expert level.",
      btnText: "Contact Now",
      image: "https://i.imgur.com/vH97Z7A.png" 
    },
    {
      id: 2,
      tag: "💎 100% PRACTICAL TRAINING",
      title: "Master <span>SEO & Social Media</span> Hacks with Industry Experts.",
      description: "Work on live corporate projects in Bhilwara and crack premium agency interviews with an elite portfolio.",
      btnText: "Explore Modules",
      image: "https://i.imgur.com/E83KOnk.png"
    }
  ];

  useEffect(() => {
    /* =======================================================
       // TODO: C# ASP.NET CORE REST API INTEGRATION
       // Backend Core API live hone par niche se comment remove karein:

       fetch('https://localhost:XXXX/api/heroslider')
         .then(res => {
           if(!res.ok) throw new Error("ASP.NET Server Offline");
           return res.json();
         })
         .then(data => {
           if(data && data.length > 0) {
             setSlides(data); // C# Database se aaya live data inject hoga
           } else {
             setSlides(defaultSlides); // Empty data pe safe fallback
           }
           setLoading(false);
         })
         .catch(err => {
           console.log("Using Default Fallback Slides Data Layout Engine", err);
           setSlides(defaultSlides); // API offline hone par dynamic layout crash nahi hoga
           setLoading(false);
         });
       ======================================================= */

    // Default system boot trigger (Right now runs on fallback mock objects)
    setSlides(defaultSlides);
    setLoading(false);
  }, []);

  // Automatic Slide Rotation Loop (6 Seconds interval)
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 6000); 
    return () => clearInterval(interval);
  }, [slides]);

  if (loading) return <div style={{ padding: '120px 8%', textAlign: 'center', color: '#00458b', fontWeight: '800', fontSize: '18px' }}>Loading Elite Experience...</div>;

  return (
    <div className="hero-slider-container" id="home">
      <div className="slide-track">
        {slides.map((slide, idx) => (
          <div key={slide.id} className={`hero-slide ${idx === currentIdx ? 'active' : ''}`}>
            
            {/* LEFT COMPILER BLOCK */}
            <div className="slide-content-left">
              <span className="slide-tag">{slide.tag}</span>
              <h1 className="slide-title" dangerouslySetInnerHTML={{ __html: slide.title }}></h1>
              <p className="slide-desc">{slide.description}</p>
              
              <div className="slide-cta-box">
                <a href="#contact" className="primary-cta">
                  {slide.btnText} <span>↗</span>
                </a>
              </div>
            </div>

            {/* RIGHT GRAPHIC CORE DESK */}
            <div className="slide-visual-right">
              <div className="image-wrapper">
                {/* Floating micro items matching client screenshot layers */}
                <div className="floating-asset" style={{ top: '5%', left: '0px', animationDelay: '0s' }}>📢</div>
                <div className="floating-asset" style={{ bottom: '15%', right: '-10px', animationDelay: '1.5s' }}>💡</div>
                <div className="floating-asset" style={{ bottom: '5%', left: '20px', animationDelay: '0.7s', fontSize: '18px' }}>✨</div>
                
                <img src={slide.image} alt="Eagle Marketing Interface" className="main-hero-img" />
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* MATRIX DOT INDEX LOGIC */}
      <div className="slider-dots">
        {slides.map((_, idx) => (
          <div 
            key={idx} 
            className={`dot ${idx === currentIdx ? 'active' : ''}`}
            onClick={() => setCurrentIdx(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;