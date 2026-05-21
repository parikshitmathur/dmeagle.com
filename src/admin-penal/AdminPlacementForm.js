// src/admin-penal/AdminPlacementForm.js
import React, { useState } from 'react';

function AdminPlacementForm() {
  const [companyName, setCompanyName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadLogoSubmit = (e) => {
    e.preventDefault();
    setStatus('Streaming logo bundle payload to core database...');

    const formData = new FormData();
    formData.append('companyName', companyName);
    if (selectedFile) {
      formData.append('logoFile', selectedFile);
    }

    /* =======================================================
       // TODO: C# CORE API FOR BRAND LOGO UPLOAD [POST]
       
       fetch('https://localhost:XXXX/api/placements/add', {
         method: 'POST',
         body: formData
       })
       .then(res => {
         if(res.ok) {
           setStatus('Success! Corporate Partner Synced to Marquee.');
           setCompanyName('');
           setSelectedFile(null);
         } else {
           setStatus('Server responded with formatting or validation error.');
         }
       })
       .catch(err => {
         console.error(err);
         setStatus('ASP.NET Runtime host is unreachable.');
       });
       ======================================================= */

    setTimeout(() => {
      alert(`Success! "${companyName}" logo structure appended locally via FormData object.`);
      setStatus('Success (Mock Broadcast Saved)!');
      setCompanyName('');
      setSelectedFile(null);
      const input = document.getElementById('logo-file-selector');
      if (input) input.value = '';
    }, 1200);
  };

  return (
    <div style={{
      maxWidth: '650px', margin: '20px auto', background: '#ffffff', padding: '35px',
      borderRadius: '24px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.04)',
      border: '1px solid #f1f5f9', fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '15px', marginBottom: '25px' }}>
        <h3 style={{ margin: 0, color: '#00458b', fontSize: '22px', fontWeight: '800' }}>🏢 RECRUITMENT PARTNER PANEL</h3>
        <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '13.5px' }}>Add active corporate networks onto ticker line</p>
      </div>

      <form onSubmit={uploadLogoSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#1e293b' }}>Company Name</label>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g., Google India" required 
                 style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box', outline: 'none' }}/>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#1e293b' }}>Upload SVG/PNG Clear Logo</label>
          <input id="logo-file-selector" type="file" accept="image/*" onChange={handleFile} required 
                 style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box', background: '#f8fafc' }}/>
        </div>

        <button type="submit" style={{
          background: '#00458b', color: 'white', border: 'none', padding: '14px', fontSize: '15px',
          fontWeight: '700', borderRadius: '12px', cursor: 'pointer', transition: 'background 0.2s'
        }}>
          Inject Partner Logo
        </button>

        {status && <p style={{ textAlign: 'center', color: '#00458b', fontWeight: '600', fontSize: '14px', margin: 0 }}>{status}</p>}
      </form>
    </div>
  );
}

export default AdminPlacementForm;