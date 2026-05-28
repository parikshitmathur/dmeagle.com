import React, { useState, useEffect } from 'react';
import "../../css/PlacementTicker.css"; 

function PlacementTicker() {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultLogos = [
    { id: 1, name: 'Flipkart', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Flipkart_logo.svg' },
    { id: 2, name: 'Fiverr', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Fiverr_logo.svg' },
    { id: 3, name: 'Google', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { id: 4, name: 'Internshala', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Internshala_company_logo.svg' },
    { id: 5, name: 'TCS', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg' }
  ];

  useEffect(() => {
    fetch('https://dmeagleapi.blsonicollege.in/api/Clients')
      .then(res => {
        if (!res.ok) throw new Error("API Offline");
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          const activeLogos = data.filter(logo => {
            return logo.isActive !== undefined ? logo.isActive : (logo.IsActive !== undefined ? logo.IsActive : true);
          });
          setLogos(activeLogos);
        } else {
          setLogos([]); 
        }
        setLoading(false);
      })
      .catch(err => {
        console.log("Marquee fetch breakdown:", err);
        setLogos([]);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (logos.length === 0) return null; 

  const isMarqueeNeeded = logos.length >= 4;
  const displayLogos = isMarqueeNeeded ? [...logos, ...logos, ...logos, ...logos] : logos;

  return (
    <div className="placement-container">
      {/* LEFT STATIC BADGE HEADER */}
      <div className="placement-title-box">
        <span className="corporate-badge">Our Alumni Network</span>
        <h4>Placement <span>Opportunities</span></h4>
        <p>EAGLES ARE HIRED HERE</p>
      </div>

      {/* RIGHT MARQUEE SYSTEM */}
      <div className="marquee-wrapper">
        <div className={isMarqueeNeeded ? "marquee-track" : "static-track-centered"}>
          {displayLogos.map((logo, index) => {
            const idValue = logo.id || logo.Id || index;
            const nameValue = logo.name || logo.Name || logo.companyName || logo.CompanyName || 'Partner';
            
            const urlValue = logo.url || logo.Url || 
                             logo.image || logo.Image || 
                             logo.logo || logo.Logo || 
                             logo.logoUrl || logo.LogoUrl || 
                             logo.imagePath || logo.ImagePath || 
                             logo.path || logo.Path;

            if (!urlValue) return null;

            return (
              // 🚀 BOX REMOVED: Ab ye bina box ke raw style render hoga
              <div key={`${idValue}-${index}`} className="logo-raw-item">
                <img 
                  src={urlValue} 
                  alt={`${nameValue} Corporate`} 
                  onError={(e) => { e.target.style.display = 'none'; }} 
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PlacementTicker;