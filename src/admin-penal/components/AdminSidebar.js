// src/admin-penal/components/AdminSidebar.js
import React from 'react';
import './AdminSidebar.css'; // Sahi local path

function AdminSidebar({ activeTab, setActiveTab }) {
  // Yahan aapke saare tabs hain aur 'testimonials' ko sahi jagah par add kar diya hai
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: '📊' },
    { id: 'slider', label: 'Hero Slider Engine', icon: '🚀' },
    { id: 'placement', label: 'Placement Partners', icon: '🏢' }, 
    { id: 'testimonials', label: 'Manage Testimonials', icon: '⭐' }, // 👈 Yeh raha aapka Testimonials tab option!
    { id: 'courses', label: 'Course Management', icon: '🎓' },
    { id: 'leads', label: 'Enquiry Leads', icon: '📩' },
    { id: 'settings', label: 'Portal Settings', icon: '⚙️' },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="brand-dot"></div>
        <span className="brand-text">EAGLE CONTROL</span>
      </div>

      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.id}>
            <div
              className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span style={{ fontSize: '18px', marginRight: '10px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <div 
          className="menu-item" 
          onClick={() => { window.location.hash = ''; }}
          style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.05)', cursor: 'pointer' }}
        >
          <span style={{ marginRight: '10px' }}>🔑</span>
          <span>Exit Terminal</span>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;