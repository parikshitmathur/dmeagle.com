// src/components/Header.js
import React, { useState, useEffect } from 'react';
import './Header.css';

// 1. IMAGE KO UPAR IMPORT KAREIN (Taki React isko read kar sake)
import logoImg from '../img/home-page/New Design Logo 3.png';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <header className="navbar-capsule">
        
        {/* 2. LOGO SECTION WITH IMPORTED VARIABLE */}
        <div className="logo-container">
          <img src={logoImg} alt="DM Eagle Logo" className="logo-img" />
        </div>

        {/* CENTER NAVIGATION */}
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#course">Course</a>
          <a href="#blog">Blog</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact Us</a>
        </nav>

        {/* PREMIUM ACTION BUTTON */}
        <a href="#download" className="download-btn">
          Download Brochure 
          <span className="btn-arrow">↗</span>
        </a>

        {/* MOBILE HAMBURGER */}
        <div className="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </header>
    </div>
  );
}

export default Header;