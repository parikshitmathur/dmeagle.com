import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './css/AboutValue.css'; 

function AboutValue() {
  const [hasRevealed, setHasRevealed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentSection = sectionRef.current;
    
    // Real-time viewport viewport alignment tracker setup
    const scrollObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          // Ek baar trigger hone ke baad clean memory optimize karne ke liye loop disconnect kiya
          scrollObserver.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15, // 👈 15% section screen par aate hi animation boom trigger hogi!
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (currentSection) {
      scrollObserver.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        scrollObserver.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section className="about-value-section" ref={sectionRef}>
      <div className="about-value-container">
        
        {/* TOP COMPACT HEADER */}
        <div className="about-value-header">
          <span className="about-value-tag">Our Core Value</span>
          <h2 className="about-value-title">
            Discover tailored strategies, trackable success, and <span>unmatched support</span> that truly makes a difference!
          </h2>
          <p className="about-value-subtitle">
            Integrity, innovation, and inclusivity are truly the core values that guide us in all our endeavors. 
            We're passionate about creating a learning atmosphere that sparks curiosity.
          </p>
        </div>

        {/* DOUBLE COLUMN LAYOUT MATRIX */}
        <div className="about-value-grid">
          
          {/* LEFT SIDE - CORE VALUE IMAGE CARD */}
          {/* 👈 Dynamic check conditions for scroll state visibility mapping */}
          <div className={`about-main-value-card ${hasRevealed ? 'is-visible' : ''}`}>
            <img 
              src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=1000&auto=format&fit=crop" 
              alt="Digital Marketing Eagle Team Core Values" 
              className="about-card-bg"
            />
            
            <div className="about-action-circle">
              <ArrowUpRight size={18} />
            </div>

            <div className="about-card-content-wrap">
              <span className="about-card-tag">Our Value</span>
              <h3 className="about-card-quote">
                "Staying true to our values of integrity, innovation, and excellence in everything we do."
              </h3>
              <p className="about-card-desc">
                Our values at Digital Marketing Eagle are the pillars that support our mission and influence each and every learning environment we design for our students.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - STACKED MISSION & VISION SYSTEM */}
          <div className="about-value-stack">
            
            {/* MISSION CARD BLOCK */}
            <div className={`about-stack-card card-mission ${hasRevealed ? 'is-visible' : ''}`}>
              <div className="about-side-action">
                <ArrowUpRight size={14} />
              </div>
              <span className="stack-card-tag">Our Mission</span>
              <h3 className="stack-card-title">
                Unlocking Your Potential with Real-World Skills and a Positive Mindset!
              </h3>
              <p className="stack-card-desc">
                We're all about education that makes a difference. Our goal is to offer top-notch, easy-to-understand courses that equip you with technical skills for success.
              </p>
            </div>

            {/* VISION CARD BLOCK */}
            <div className={`about-stack-card card-vision ${hasRevealed ? 'is-visible' : ''}`}>
              <div className="about-side-action">
                <ArrowUpRight size={14} />
              </div>
              <span className="stack-card-tag">Our Vision</span>
              <h3 className="stack-card-title">
                Shaping the leaders of tomorrow with cutting-edge learning experiences!
              </h3>
              <p className="stack-card-desc">
                We envision a future where learning is within everyone's reach, creativity is sparked, a vibrant community is fostered, and professionals are equipped for tomorrow.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutValue;