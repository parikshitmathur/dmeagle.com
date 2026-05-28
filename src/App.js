import React, { useState, useEffect } from 'react';
import './css/App.css'; 

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import AdminSidebar from './admin-penal/components/AdminSidebar';

// Pages aur Admin Panels
import Home from './all-pages/Home/home';
import AboutPage from './all-pages/About/About'; 
import ContactPage from './all-pages/contact/Contact';
import AdminSliderForm from './admin-penal/AdminSliderForm';
import AdminPlacementForm from './admin-penal/AdminPlacementForm'; 
import TestimonialAdmin from './admin-penal/TestimonialAdmin';

// =========================================================================
// 📊 DASHBOARD OVERVIEW COMPONENT (Alag se file banaye bina live inline desk)
// =========================================================================
function DashboardOverview() {
  const [slidesCount, setSlidesCount] = useState(0);
  const [logosCount, setLogosCount] = useState(0);

  useEffect(() => {
    fetch('https://dmeagleapi.blsonicollege.in/api/heroslider')
      .then(res => res.json())
      .then(data => setSlidesCount(data?.length || 0))
      .catch(() => setSlidesCount(0));

    fetch('https://dmeagleapi.blsonicollege.in/api/Clients')
      .then(res => res.json())
      .then(data => setLogosCount(data?.length || 0))
      .catch(() => setLogosCount(0));
  }, []);

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', padding: '10px' }}>
      <div style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '15px', marginBottom: '30px' }}>
        <h2 style={{ margin: 0, color: '#00458b', fontSize: '26px', fontWeight: '800' }}>📊 EAGLE CONTROL TERMINAL</h2>
        <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Welcome Live server stats and analytical configurations.</p>
      </div>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '240px', background: 'linear-gradient(135deg, #00458b, #0066cc)', color: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0,69,139,0.1)' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>Hero Slider Engine</h3>
          <p style={{ margin: '15px 0 0 0', fontSize: '36px', fontWeight: '800' }}>{slidesCount}</p>
        </div>
        <div style={{ flex: '1', minWidth: '240px', background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 20px rgba(15,23,42,0.1)' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>Placement Partners</h3>
          <p style={{ margin: '15px 0 0 0', fontSize: '36px', fontWeight: '800' }}>{logosCount}</p>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 👑 MAIN APP CORE COMPONENT (URL Hash Extraction Fix)
// =========================================================================
function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('home'); 
  
  // 🚀 REFRESH FIX 1: Initial load par check karo agar URL me direct koi admin hash hai
  const [activeTab, setActiveTab] = useState(() => {
    const initialHash = window.location.hash.replace('#', '').toLowerCase();
    const adminTabs = ['dashboard', 'slider', 'placement', 'testimonials', 'courses', 'leads', 'settings'];
    return adminTabs.includes(initialHash) ? initialHash : 'slider'; // Default fallback slider
  }); 

  useEffect(() => {
    const checkRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const cleanHash = window.location.hash.replace('#', '').toLowerCase();

      // Saare admin items ki list tracking ke liye
      const adminTabs = ['dashboard', 'slider', 'placement', 'testimonials', 'courses', 'leads', 'settings'];

      // ==========================================
      // 1. ADMIN PANEL ROUTING & HASH RE-CHECK
      // ==========================================
      if (hash === '#admin' || path.includes('/admin') || adminTabs.includes(cleanHash)) {
        setIsAdminView(true);
        
        // 🚀 REFRESH FIX 2: Agar hash me valid admin sub-page id mili, toh activeTab state update karo!
        if (adminTabs.includes(cleanHash)) {
          setActiveTab(cleanHash);
        } else if (hash === '#admin') {
          // Agar direct empty #admin par aaye ho, toh use safe side dashboard ya slider par push karo
          setActiveTab('dashboard');
          window.location.hash = 'dashboard';
        }
      } else {
        setIsAdminView(false);

        // ==========================================
        // 2. PUBLIC PAGES ROUTING MATRIX
        // ==========================================
        if (hash === '#about' || path.includes('/about')) {
          setCurrentRoute('about'); 
        } else if (hash === '#contact' || path.includes('/contact')) {
          setCurrentRoute('contact'); 
        } else {
          setCurrentRoute('home'); 
        }
      }
    };

    checkRoute();

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

        <main className="admin-main-content" style={{ flex: 1, padding: '40px', boxSizing: 'border-box' }}>
          {activeTab === 'dashboard' && <DashboardOverview />}

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
      <Header />

      <main style={{ flex: 1, paddingTop: '40px' }}>
        {currentRoute === 'about' && <AboutPage />}
        {currentRoute === 'contact' && <ContactPage />} 
        {currentRoute === 'home' && <Home />}
      </main>

      <Footer />
    </div>
  );
}

export default App;