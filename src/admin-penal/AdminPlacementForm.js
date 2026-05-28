import React, { useState, useEffect } from 'react';

function AdminPlacementForm() {
  const [logos, setLogos] = useState([]); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null); 

  // 🚀 BASE LIVE API URL
  const apiBaseUrl = 'https://dmeagleapi.blsonicollege.in/api/Clients';

  // 🏃 1. GET: Server se saare logos lekar aana
  const fetchLogos = async () => {
    try {
      const response = await fetch(apiBaseUrl);
      if (response.ok) {
        const data = await response.json();
        setLogos(data);
      }
    } catch (err) {
      console.error("Fetch logos error:", err);
      setErrorStatus('❌ Live server se corporate brands load nahi ho paye.');
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // 🚀 2. POST: Upload Logo (Exact Swagger Mapping Fixed!)
  const uploadLogoSubmit = async (e) => {
    e.preventDefault();
    setStatus('Uploading logo asset onto server core...');
    setErrorStatus('');

    if (!selectedFile) {
      setErrorStatus('⚠️ Please select an image!');
      setStatus('');
      return;
    }

    const formData = new FormData();
    // 🔥 FIXED: Swagger screenshot ke mutabik parameter key name exact 'ImageFile' hi chalega
    formData.append("ImageFile", selectedFile);

    try {
      // 🔥 FIXED: Endpoint path exact /api/Clients/add chalega jaisa screenshot me hai
      const response = await fetch(`${apiBaseUrl}/add`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setStatus('✅ Logo uploaded successfully!');
        setSelectedFile(null);

        const input = document.getElementById('logo-file-selector');
        if (input) input.value = '';

        fetchLogos(); // Table instant sync refresh
        setTimeout(() => setStatus(''), 3000);
      } else {
        const text = await response.text();
        setErrorStatus(`❌ ${text || 'Server validation failed.'}`);
        setStatus('');
      }
    } catch (err) {
      console.error(err);
      setErrorStatus('❌ Upload failed');
      setStatus('');
    }
  };

  // 🚀 3. DELETE: Safe removal using Header Overrides
  const handleDeleteClick = async (id) => {
    setStatus('Purging brand entity bundle from server directory...');
    setErrorStatus('');
    try {
      // 🛠️ SWAGGER FIXED: /api/Clients/delete/{id} path matched
      const response = await fetch(`${apiBaseUrl}/delete/${id}`, {
        method: 'POST', 
        headers: { 'X-HTTP-Method-Override': 'DELETE' }
      });
      if (response.ok) {
        setStatus("🗑️ Recruitment partner removed successfully.");
        setDeleteConfirmId(null);
        fetchLogos(); 
        setTimeout(() => setStatus(''), 3000);
      } else {
        setErrorStatus("❌ Server processed block on delete pipeline execution.");
        setStatus('');
        setDeleteConfirmId(null);
      }
    } catch (err) {
      console.error(err);
      setErrorStatus("❌ Network fault during deletion task execution.");
      setStatus('');
      setDeleteConfirmId(null);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Segoe UI, sans-serif', padding: '0 15px' }}>
      
      {/* ==================== FORM SECTION ==================== */}
      <div style={{ background: '#ffffff', padding: '35px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.04)', border: '1px solid #f1f5f9' }}>
        <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '15px', marginBottom: '25px' }}>
          <h3 style={{ margin: 0, color: '#00458b', fontSize: '22px', fontWeight: '800' }}>🏢 RECRUITMENT PARTNER PANEL</h3>
          <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '13.5px' }}>Upload clear branding assets directly onto marquee stream</p>
        </div>

        {status && <div style={{ padding: '12px 20px', background: '#f0fdf4', borderLeft: '5px solid #22c55e', color: '#166534', borderRadius: '8px', marginBottom: '20px', fontWeight: '600', fontSize: '14px' }}>{status}</div>}
        {errorStatus && <div style={{ padding: '12px 20px', background: '#fef2f2', borderLeft: '5px solid #ef4444', color: '#991b1b', borderRadius: '8px', marginBottom: '20px', fontWeight: '600', fontSize: '14px' }}>{errorStatus}</div>}

        <form onSubmit={uploadLogoSubmit}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#1e293b' }}>
              Select Corporate Logo Image
            </label>
            <input id="logo-file-selector" type="file" accept="image/*" onChange={handleFile} required 
                   style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box', background: '#f8fafc', fontSize: '13.5px' }}/>
          </div>

          <div style={{ marginTop: '20px' }}>
            <button type="submit" style={{ width: '100%', background: '#00458b', color: 'white', border: 'none', padding: '14px', fontSize: '15px', fontWeight: '700', borderRadius: '12px', cursor: 'pointer' }}>
              Inject Partner Logo
            </button>
          </div>
        </form>
      </div>

      {/* ==================== TRACKING TABLE SECTION ==================== */}
      <div style={{ marginTop: '40px', background: '#ffffff', padding: '30px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.04)', border: '1px solid #f1f5f9' }}>
        <h4 style={{ margin: '0 0 20px 0', color: '#1e293b', fontSize: '17px', fontWeight: '800' }}>📋 ACTIVE LOGO STACK ({logos.length})</h4>
        
        {logos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '14px', margin: 0 }}>Database client stack queue is empty.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '15px', color: '#475569', fontWeight: '700' }}>Logo Image Asset</th>
                  <th style={{ padding: '15px', color: '#475569', fontWeight: '700', textAlign: 'center' }}>Action Matrix</th>
                </tr>
              </thead>
              <tbody>
                {logos.map((logo) => {
                  const id = logo.id || logo.Id;
                  
                  // Fail-safe property extraction keys mapping
                  const url = logo.url || logo.Url || logo.image || logo.Image || logo.logo || logo.Logo || logo.imagePath || logo.ImagePath || logo.path || logo.Path;

                  return (
                    <tr key={id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '15px' }}>
                        {url ? (
                          <img src={url} alt="Server Asset" style={{ height: '50px', maxWidth: '160px', objectFit: 'contain', mixBlendMode: 'multiply' }} 
                               onError={(e) => { e.target.style.opacity = '0.3'; }} />
                        ) : (
                          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>Missing Resource URL</span>
                        )}
                      </td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        
                        {deleteConfirmId === id ? (
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ fontSize: '12px', color: '#e11d48', fontWeight: '700' }}>Uda dein?</span>
                            <button type="button" onClick={() => handleDeleteClick(id)} style={{ background: '#e11d48', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}>Yes</button>
                            <button type="button" onClick={() => setDeleteConfirmId(null)} style={{ background: '#64748b', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}>No</button>
                          </div>
                        ) : (
                          <button type="button" onClick={() => setDeleteConfirmId(id)} style={{ background: '#ffe4e6', color: '#e11d48', border: 'none', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}>
                            Delete Logo
                          </button>
                        )}

                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

export default AdminPlacementForm;