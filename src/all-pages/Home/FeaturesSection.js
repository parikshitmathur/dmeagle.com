import React, { useEffect, useRef } from "react";
import "../../css/FeaturesSection.css"; // 👈 Ek aur '../' lagaya

function FeaturesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="ultra-features-section" ref={sectionRef}>
      
      {/* HEADER SECTION */}
      <div className="features-header animate-element">
        <h2>
          Kickstart Your Journey to Mastering <br />
          <span>Digital Marketing Right Here!</span>
        </h2>
        <p>
          By highlighting these features, we tackle the key decision-making
          factors that prospective students often consider.
        </p>
      </div>

      {/* RESPONSIVE CARDS GRID */}
      <div className="features-flex-grid">
        
        {/* CARD 1 - BLUE */}
        <div className="cyber-feature-card card-blue animate-element">
          <div className="card-content-top">
            <h3>Discover Insights From Seasoned Industry Experts</h3>
            <p>
              Learn insightful tactics, practical advice, and first-hand knowledge 
              of digital marketing, graphic design, video editing, and other fields 
              from seasoned industry professionals.
            </p>
          </div>
          <div className="card-footer-assets">
            <div className="cyber-icon-wrapper">👤</div>
            <div className="card-star">★</div>
          </div>
        </div>

        {/* CARD 2 - CYAN */}
        <div className="cyber-feature-card card-purple animate-element">
          <div className="card-content-top">
            <h3>Real World Projects & Case Studies</h3>
            <p>
              Engage in practical projects and case studies that demonstrate the 
              application of strategies in real-world business situations. Gain insight 
              into customer needs and learn from actual successes.
            </p>
          </div>
          <div className="card-footer-assets">
            <div className="cyber-icon-wrapper">🔍</div>
            <div className="card-star">★</div>
          </div>
        </div>

        {/* CARD 3 - AMBER */}
        <div className="cyber-feature-card card-amber animate-element">
          <div className="card-content-top">
            <h3>Industry-Relevant Projects</h3>
            <p>
              Relevant to the Industry Projects are made to reflect actual difficulties 
              encountered in the digital realm. By working on campaigns, branding, 
              and content strategies to perform like a pro.
            </p>
          </div>
          <div className="card-footer-assets">
            <div className="cyber-icon-wrapper">🏢</div>
            <div className="card-star">★</div>
          </div>
        </div>

        {/* CARD 4 - EMERALD */}
        <div className="cyber-feature-card card-emerald animate-element">
          <div className="card-content-top">
            <h3>Job-Ready Skills</h3>
            <p>
              You will learn exactly what today's clients and employers are looking for 
              if you have job-ready skills. We emphasize practical skills that help you 
              get started quickly using tools like Canva, Meta Ads.
            </p>
          </div>
          <div className="card-footer-assets">
            <div className="cyber-icon-wrapper">🎯</div>
            <div className="card-star">★</div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FeaturesSection;