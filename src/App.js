// src/App.js
import React, { useState, useEffect } from 'react';
import './css/App.css'; 

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import AdminSidebar from './admin-penal/components/AdminSidebar';

// Pages aur Admin Panels
import Home from './all-pages/Home/home';
import AboutPage from './all-pages/About/About'; // 👈 Casing exact checked!
// 🟢 FIXED: BlogPage ka missing import yahan se poora hata diya hai crash rokne ke liye!
import AdminSliderForm from './admin-penal/AdminSliderForm';
import AdminPlacementForm from './admin-penal/AdminPlacementForm'; 
import TestimonialAdmin from './admin-penal/TestimonialAdmin';

function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('home'); 
  const [activeTab, setActiveTab] = useState('slider'); 

  useEffect(() => {
    const checkRoute = () => {
      // URL normalize kiya lower case me
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();

      // ==========================================
      // 1. ADMIN PANEL ROUTING CHECK
      // ==========================================
      if (hash === '#admin' || path.includes('/admin')) {
        setIsAdminView(true);
      } else {
        setIsAdminView(false);

        // ==========================================
        // 2. PUBLIC PAGES ROUTING MATRIX
        // ==========================================
        if (hash === '#about' || path.includes('/about')) {
          setCurrentRoute('about'); // 👈 URL me #about aate hi yeh activate hoga
        } else {
          setCurrentRoute('home');  // Default: Home Page
        }
      }
    };

    // Initial check load cycle
    checkRoute();

    // Event listeners window sync ke liye
    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('load', checkRoute);

    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('load', checkRoute);
    };
  }, []);

  // ==========================================================
  // 1. DYNAMIC ADMIN CONTROL WORKSPACE (Full Screen Sidebar Look)
  // ==========================================================
  if (isAdminView) {
    return (
      <div className="admin-layout">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="admin-main-content">
          {activeTab === 'dashboard' && (
            <div style={{ padding: '25px', background: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.01)' }}>
              <h2 style={{ color: '#0f172a', margin: 0 }}>📊 Control Desk Analytics</h2>
              <p style={{ color: '#64748b', margin: '5px 0 0 0' }}>Welcome Live server stats, performance counters aur leads aggregate data dashboard yahan render hoga.</p>
            </div>
          )}

          {activeTab === 'slider' && (
            <div>
              <AdminSliderForm />
            </div>
          )}

          {activeTab === 'placement' && (
            <div>
              <AdminPlacementForm />
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div>
              <TestimonialAdmin />
            </div>
          )}

          {activeTab === 'courses' && (
            <div style={{ padding: '25px', background: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.01)' }}>
              <h2 style={{ color: '#0f172a', margin: 0 }}>🎓 Syllabus Curriculum Configurations</h2>
              <p style={{ color: '#64748b' }}>Bhilwara workspace ke standard courses grids ko instant control karne ka dashboard block.</p>
            </div>
          )}

          {activeTab === 'leads' && (
            <div style={{ padding: '25px', background: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.01)' }}>
              <h2 style={{ color: '#0f172a', margin: 0 }}>📩 Realtime Student Enquiries</h2>
              <p style={{ color: '#64748b' }}>Frontend contact forms ke entries live dynamic feeds ban kar database table se fetch honge.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div style={{ padding: '25px', background: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.01)' }}>
              <h2 style={{ color: '#0f172a', margin: 0 }}>⚙️ Core System Parameters</h2>
              <p style={{ color: '#64748b' }}>C# ASP.NET REST API endpoint token credentials settings toggle mapping dashboard.</p>
            </div>
          )}
        </main>
      </div>
    );
  }

  // ==========================================================
  // 2. LIVE PUBLIC WEBSITE VIEW (Normal Users Mode)
  // ==========================================================
  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* CAPSULE NAVBAR */}
      <Header />

      {/* CORE DISPLAY STAGE */}
      <main style={{ flex: 1, paddingTop: '40px' }}>
        {/* 🟢 FIXED: Ab sirf valid active modules hi screen pipeline par render honge */}
        {currentRoute === 'about' && <AboutPage />}
        {currentRoute === 'home' && <Home />}
      </main>

      {/* REFINED CLEAN FOOTER */}
      <Footer />
    </div>
  );
}

export default App;