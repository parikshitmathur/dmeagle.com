import React, { useState, useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminSliderForm from './AdminSliderForm';
import AdminPlacementForm from './AdminPlacementForm';
import TestimonialAdmin from './TestimonialAdmin';

// =========================================================================
// 📊 DASHBOARD OVERVIEW COMPONENT (Inline Reference)
// =========================================================================
function DashboardOverview({ totalSlides, totalLogos }) {
  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '15px', marginBottom: '30px' }}>
        <h2 style={{ margin: 0, color: '#00458b', fontSize: '26px', fontWeight: '800' }}>📊 EAGLE CONTROL TERMINAL</h2>
        <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Welcome back! Control room configuration overview.</p>
      </div>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '240px', background: 'linear-gradient(135deg, #00458b, #0066cc)', color: 'white', padding: '30px', borderRadius: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>Hero Slider Engine</h3>
          <p style={{ margin: '15px 0 0 0', fontSize: '36px', fontWeight: '800' }}>{totalSlides}</p>
        </div>
        <div style={{ flex: '1', minWidth: '240px', background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', padding: '30px', borderRadius: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>Placement Partners</h3>
          <p style={{ margin: '15px 0 0 0', fontSize: '36px', fontWeight: '800' }}>{totalLogos}</p>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 👑 MAIN ADMIN PANEL ROOT COMPONENT (Bulls-Eye URL Routing Fix)
// =========================================================================
function AdminPanel() {
  // 🚀 CRITICAL REFRESH FIX: Page refresh hote hi sabsay pehle URL ka window hash read hoga!
  const [activeTab, setActiveTab] = useState(() => {
    // window.location.hash se '#placement' milega, use replace karke sirf 'placement' nikalenge
    const currentHash = window.location.hash.replace('#', '');
    
    // Agar URL me hash hai toh wahi open hoga, nahi toh 'dashboard' khulega
    return currentHash || 'dashboard'; 
  });

  const [slidesCount, setSlidesCount] = useState(0);
  const [logosCount, setLogosCount] = useState(0);

  // 🔄 LOOP SYNC EFFECT: Jab bhi activeTab badlega, browser URL hash automatic sync ho jayega
  useEffect(() => {
    if (activeTab) {
      window.location.hash = activeTab;
    }
  }, [activeTab]);

  // 📡 DYNAMIC EVENT LISTENER: Agar user browser ke back/forward arrow daba kar URL badle
  useEffect(() => {
    const handleUrlHashChange = () => {
      const currentHash = window.location.hash.replace('#', '');
      if (currentHash) {
        setActiveTab(currentHash);
      }
    };

    window.addEventListener('hashchange', handleUrlHashChange);
    return () => window.removeEventListener('hashchange', handleUrlHashChange);
  }, []);

  // Dashboard metric counter loader
  useEffect(() => {
    fetch('https://dmeagleapi.blsonicollege.in/api/heroslider')
      .then(res => res.json())
      .then(data => setSlidesCount(data?.length || 0))
      .catch(() => setSlidesCount(0));

    fetch('https://dmeagleapi.blsonicollege.in/api/Clients')
      .then(res => res.json())
      .then(data => setLogosCount(data?.length || 0))
      .catch(() => setLogosCount(0));
  }, [activeTab]);

  // 🏃 CONDITION ENGINE: Active Tab ke mutabik component display mapping
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview totalSlides={slidesCount} totalLogos={logosCount} />;
      case 'slider':
        return <AdminSliderForm />;
      case 'placement':
        return <AdminPlacementForm />; // 👈 Yeh khulega jab URL me #placement hoga!
      case 'testimonials':
        return <TestimonialAdmin />;
      case 'courses':
        return <div style={{ padding: '20px', color: '#64748b' }}>🎓 Course Management Coming Soon...</div>;
      case 'leads':
        return <div style={{ padding: '20px', color: '#64748b' }}>📩 Leads Logger Coming Soon...</div>;
      case 'settings':
        return <div style={{ padding: '20px', color: '#64748b' }}>⚙️ Terminal Portal Settings Coming Soon...</div>;
      default:
        return <DashboardOverview totalSlides={slidesCount} totalLogos={logosCount} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Sidebar navigation controls */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Display workflow workplace sheet area */}
      <div style={{ flex: '1', padding: '40px', boxSizing: 'border-box' }}>
        {renderTabContent()}
      </div>
    </div>
  );
}

export default AdminPanel;