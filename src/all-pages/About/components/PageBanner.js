import React from "react";
import { Sparkles, ChevronRight, BadgeCheck } from "lucide-react";

// 👈 FIXED: Sahi barabar wala fallback rasta confirm kiya taaki single dot module load ho sake!
import "./PageBanner.css"; 

function PageBanner({ title, highlightText, currentPage }) {
  
  // REAL TIME CHARACTER SPLIT & STAGGER DELAY SYSTEM
  const renderAnimatedText = (text, startIndex = 0) => {
    if (!text) return null;
    return text.split("").map((char, index) => {
      // 0.05s stagger step calculations for cinematic wave flow look
      const calculatedDelay = (startIndex + index) * 0.05; 
      
      return (
        <span
          key={`${index}-${char}`}
          className="animated-letter"
          style={{
            animationDelay: `${calculatedDelay}s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

  return (
    <section className="epic-banner">
      
      {/* ORBS */}
      <div className="epic-orb epic-orb-1"></div>
      <div className="epic-orb epic-orb-2"></div>
      <div className="epic-orb epic-orb-3"></div>

      {/* GRID */}
      <div className="epic-grid"></div>

      {/* RING */}
      <div className="epic-ring"></div>

      {/* FLOATING ICONS */}
      <div className="floating-icon floating-icon-1">
        <Sparkles size={18} />
      </div>

      <div className="floating-icon floating-icon-2">
        <BadgeCheck size={18} />
      </div>

      {/* CONTENT */}
      <div className="epic-banner-content">

        {/* BADGE */}
        <div className="epic-badge">
          <span className="badge-dot"></span>
          Premium Digital Experience
        </div>

        {/* TITLE HEADERS */}
        <h1 className="epic-banner-title">
          {/* Base Heading Stream Mapping */}
          {renderAnimatedText(title, 0)}

          {/* Highlight Gradient Text Loop Processing */}
          {highlightText && (
            <span className="gradient-text highlight-wrap">
              {renderAnimatedText(
                " " + highlightText, 
                title ? title.length : 0
              )}
            </span>
          )}
        </h1>

        {/* SUBTITLE */}
        <p className="epic-banner-subtitle">
          Explore next generation digital marketing insights,
          creative strategies and powerful business growth content.
        </p>

        {/* BREADCRUMBS */}
        <div className="epic-breadcrumb">
          <a href="/">Home</a>
          <ChevronRight size={14} />
          <span>{currentPage || "Page"}</span>
        </div>

      </div>
    </section>
  );
}

export default PageBanner;