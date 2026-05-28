import React, { useState, useEffect } from 'react';
import '../../css/HeroSlider.css'; 

function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  // Default Fallback Layout (Database offline ya khali hone par ye dikhega)
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
    const getLiveSlides = async () => {
      try {
        // 🚀 REAL LIVE API GET REQUEST (Localhost hata kar tumhara live server domain laga diya)
        const res = await fetch('https://dmeagleapi.blsonicollege.in/api/heroslider');
        
        if (!res.ok) {
          throw new Error("Server ne error di");
        }
        
        const data = await res.json();
        console.log("🔥 LIVE DB SE AAYA DATA:", data); 
        
        if (data && data.length > 0) {
          setSlides(data);
        } else {
          console.log("⚠️ Data khali mila, default slides set ho rahi hain.");
          setSlides(defaultSlides);
        }
      } catch (err) {
        console.error("❌ FETCH CRASH ERROR:", err); 
        setSlides(defaultSlides); // Server down ho toh fallback layout dikhega
      } finally {
        setLoading(false);
      }
    };

    getLiveSlides();
  }, []);

  // Automatic Loop Animation (6 Seconds)
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 6000); 
    return () => clearInterval(interval);
  }, [slides]);

  if (loading) return <div className="slider-loading-state">Loading Elite Experience...</div>;

  return (
    <div className="hero-slider-container" id="home">
      <div className="slide-track">
        {slides.map((slide, idx) => {
          // 🛠 *FAIL-SAFE MAPPING: C# Capitalization issue handles*
          const tagValue = slide.tag || slide.Tag;
          const titleValue = slide.title || slide.Title;
          const descValue = slide.description || slide.Description;
          const btnTextValue = slide.btnText || slide.BtnText;
          const imageValue = slide.image || slide.Image || slide.imagePath || slide.ImagePath;

          return (
            <div key={slide.id || slide.Id || idx} className={`hero-slide ${idx === currentIdx ? 'active' : ''}`}>
              
              {/* LEFT TEXT BOX */}
              <div className="slide-content-left">
                <span className="slide-tag">{tagValue}</span>
                <h1 className="slide-title" dangerouslySetInnerHTML={{ __html: titleValue }}></h1>
                <p className="slide-desc">{descValue}</p>
                
                <div className="slide-cta-box">
                  <a href="#contact" className="primary-cta">
                    {btnTextValue || 'Contact Now'} <span>↗</span>
                  </a>
                </div>
              </div>

              {/* RIGHT IMAGE LAYER */}
              <div className="slide-visual-right">
                <div className="image-wrapper">
                  <div className="floating-asset" style={{ top: '5%', left: '0px' }}>📢</div>
                  <div className="floating-asset" style={{ bottom: '15%', right: '-10px' }}>💡</div>
                  <div className="floating-asset" style={{ bottom: '5%', left: '20px', fontSize: '18px' }}>✨</div>
                  
                  <img src={imageValue} alt="Marketing Display Panel" className="main-hero-img" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* MATRIX DOT INDEX PIPES */}
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