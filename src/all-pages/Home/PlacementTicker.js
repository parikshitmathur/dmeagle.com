// src/all-pages/PlacementTicker.js
import React, { useState, useEffect } from 'react';
import "../../css/PlacementTicker.css"; // 👈 Ek aur '../' lagaya

function PlacementTicker() {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default hardcoded logos fallback jab admin pane empty ho
  const defaultLogos = [
    { id: 1, name: 'Flipkart', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Flipkart_logo.svg' },
    { id: 2, name: 'Fiverr', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Fiverr_logo.svg' },
    { id: 3, name: 'Google', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { id: 4, name: 'Internshala', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Internshala_company_logo.svg' },
    { id: 5, name: 'TCS', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg' }
  ];

  useEffect(() => {
    // =======================================================
    // ASP.NET CORE / NODE.JS CATCH API FOR PLACEMENT LOGOS
    // =======================================================
    fetch('https://localhost:7067/api/placements')
      .then(res => {
        if (!res.ok) throw new Error("API Offline or Endpoint breakdown");
        return res.json();
      })
      .then(data => {
        // Agar admin ne database me EK BHI logo dala hai, toh sirf wahi dikhega (defaults hat jayenge)
        if (data && data.length > 0) {
          setLogos(data);
        } else {
          // Agar database empty hai (length === 0), toh default show hoga
          setLogos(defaultLogos);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log("Using Failsafe Marquee fallbacks on Server Down:", err);
        // Server crash hone par user ko empty screen na dikhe, isliye backup
        setLogos(defaultLogos);
        setLoading(false);
      });

    // NOTE: Agar abhi live checking bina API ke karni hai, toh upar wale pure 
    // fetch block ko temporarily comment out karke niche is line ko rehne dena.
    // setLogos(defaultLogos);
    // setLoading(false);
  }, []);

  if (loading) return null;

  // Infinite smooth scroll loop logic backup multiplier
  const doubleLogos = [...logos, ...logos, ...logos];

  return (
    <div className="placement-container">
      <div className="placement-title-box">
        <h4>Placement</h4>
        <h4 style={{ color: '#00458b' }}>Opportunities</h4>
        <p>OUR ALUMNI WORK HERE</p>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {doubleLogos.map((logo, index) => (
            <div key={`${logo.id}-${index}`} className="logo-card">
              <img src={logo.url} alt={`${logo.name} Network`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlacementTicker;