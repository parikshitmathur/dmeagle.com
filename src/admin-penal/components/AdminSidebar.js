import React from 'react';
import './AdminSidebar.css'; 

function AdminSidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: '📊' },
    { id: 'slider', label: 'Hero Slider Engine', icon: '🚀' },
    { id: 'placement', label: 'Placement Partners', icon: '🏢' }, 
    { id: 'testimonials', label: 'Manage Testimonials', icon: '⭐' }, 
    { id: 'courses', label: 'Course Management', icon: '🎓' },
    { id: 'leads', label: 'Enquiry Leads', icon: '📩' },
    { id: 'settings', label: 'Portal Settings', icon: '⚙️' },
  ];

  const handleTabChange = (id) => {
    setActiveTab(id);
    // 🚀 URL CHANGE LOGIC: Ye line URL badal degi (e.g., http://localhost:3000/#placement)
    window.location.hash = id;
  };

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
              onClick={() => handleTabChange(item.id)}
              style={{ cursor: 'pointer' }}
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