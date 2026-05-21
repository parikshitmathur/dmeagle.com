import React from "react";
import { GraduationCap, Laptop, BookOpen, Users2, ArrowUpRight } from "lucide-react";
import "./css/aboutFeatures.css"; // 👈 CSS Import path fully verified

function AboutFeatures() {
  const featuresData = [
    {
      id: 1,
      icon: <GraduationCap size={22} />,
      title: "Expert-Led Training",
      desc: "Our courses are crafted by seasoned professionals with real world marketing experience.",
    },
    {
      id: 2,
      icon: <Laptop size={22} />,
      title: "Practical Learning",
      desc: "We focus on hands-on learning with modern real-time digital strategies.",
    },
    {
      id: 3,
      icon: <BookOpen size={22} />,
      title: "Advanced Curriculum",
      desc: "Learn updated AI marketing, branding and performance growth systems.",
    },
    {
      id: 4,
      icon: <Users2 size={22} />,
      title: "Strong Community",
      desc: "Connect with creators, mentors and learners inside our growth ecosystem.",
    },
  ];

  return (
    <section className="ultra-features-section">
      <div className="ultra-grid"></div>

      <div className="ultra-features-container">
        
        {/* LEFT COMPONENT DATA BOX */}
        <div className="ultra-features-left">
          <div className="ultra-tag">
            <span className="tag-dot"></span>
            Why Choose Digital Eagle
          </div>

          <h2 className="ultra-heading">
            Experience The Future Of
            <span> Digital Learning</span>
          </h2>

          <p className="ultra-description">
            We combine modern education systems, AI driven learning experiences 
            and practical industry level projects to help students become real digital experts.
          </p>

          <div className="ultra-feature-grid">
            {featuresData.map((item) => (
              <div className="ultra-feature-card" key={item.id}>
                <div className="ultra-icon-box">{item.icon}</div>
                <div className="ultra-feature-content">
                  <div className="feature-top">
                    <h3>{item.title}</h3>
                    <div className="feature-arrow">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PHOTO COLLAGE BOX (ANTI-COLLAPSE INSTALLED) */}
        <div className="ultra-features-right">
          <div className="ultra-image-container">
            
            {/* FLOATING STATS 1 */}
            <div className="floating-stats-card">
              <h4>+12K</h4>
              <p>Students Trained</p>
            </div>

            {/* BASE FRAME MAIN IMAGE */}
            <div className="ultra-image-box large-box">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                alt="Eagle Student Digital Training Centre"
              />
            </div>

            {/* CUTOUT INTERSECT OVERLAY IMAGE */}
            <div className="ultra-image-box small-box">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
                alt="Practical Tech Learning Lab"
              />
            </div>

            {/* FLOATING EXPERIENCE BADGE BAR */}
<div className="experience-card">
  <h3>8+</h3>
  <span>Years Experience</span>
</div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutFeatures;