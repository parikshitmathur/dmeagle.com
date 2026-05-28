import React, { useState, useEffect } from 'react';

function AdminSliderForm() {
  const [slides, setSlides] = useState([]); 
  const [slideForm, setSlideForm] = useState({
    tag: '',
    title: '',
    description: '',
    btnText: 'Contact Now'
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('');
  const [errorStatus, setErrorStatus] = useState(''); 
  const [editId, setEditId] = useState(null); 
  const [deleteConfirmId, setDeleteConfirmId] = useState(null); 

  // 🚀 LIVE API URL Helper
  const apiBaseUrl = 'https://dmeagleapi.blsonicollege.in/api/heroslider';

  // 🏃 1. GET: Database se saari slides lekar aana
  const fetchSlides = async () => {
    try {
      const response = await fetch(apiBaseUrl);
      if (response.ok) {
        const data = await response.json();
        setSlides(data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setErrorStatus('❌ Live server se data load nahi ho paya.');
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleInput = (e) => {
    setSlideForm({ ...slideForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // 🚀 2. POST / PUT: Submit Handle (Live Server Bypass Ke Saath)
  const submitSlideForm = async (e) => {
    e.preventDefault();
    setStatus('Processing Admin Request...');
    setErrorStatus('');

    const formData = new FormData();
    formData.append('Tag', slideForm.tag || '');
    formData.append('Title', slideForm.title || '');
    formData.append('Description', slideForm.description || '');
    formData.append('BtnText', slideForm.btnText || '');
    
    if (selectedFile) {
      formData.append('ImageFile', selectedFile);
    } else if (!editId) {
      setErrorStatus('⚠️ Error: Bhai, image file select karo!');
      setStatus('');
      return;
    }

    try {
      let url = `${apiBaseUrl}/add`;
      let method = 'POST'; 
      let headers = {};

      // 🔥 LIVE SERVER EDIT FIX: Masking PUT inside a POST request
      if (editId) {
        url = `${apiBaseUrl}/update/${editId}`;
        method = 'POST'; 
        headers = {
          'X-HTTP-Method-Override': 'PUT'
        };
      }

      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: formData 
      });

      if (response.ok) {
        setStatus(editId ? '🎉 Success! Slider updated successfully in Database.' : '🎉 Success! New banner published to SQL Database.');
        
        setSlideForm({ tag: '', title: '', description: '', btnText: 'Contact Now' });
        setSelectedFile(null);
        setEditId(null);
        
        const fileInput = document.getElementById('admin-file-picker');
        if (fileInput) fileInput.value = '';

        fetchSlides();
        setTimeout(() => setStatus(''), 4000);
      } else {
        const errData = await response.json().catch(() => null);
        setErrorStatus(`❌ Failed: ${errData?.message || 'Server ne processing block kar di.'}`);
        setStatus('');
      }
    } catch (err) {
      console.error("Network Exception:", err);
      setErrorStatus('❌ Network/CORS Issue. Live domain check karo.');
      setStatus('');
    }
  };

  // 🛠️ 3. EDIT CLICK: Row ka data form me load karna
  const handleEditClick = (slide) => {
    setEditId(slide.id || slide.Id);
    setSlideForm({
      tag: slide.tag || slide.Tag || '',
      title: slide.title || slide.Title || '',
      description: slide.description || slide.Description || '',
      btnText: slide.btnText || slide.BtnText || 'Contact Now'
    });
    setStatus(`📝 Editing Slider ID: ${slide.id || slide.Id}. Nayi image optional hai.`);
    setErrorStatus('');
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  // 🗑️ 4. INLINE DELETE FIX: (Live Server Delete Bypass)
  const handleDeleteClick = async (id) => {
    setStatus('Deleting banner item...');
    setErrorStatus('');

    try {
      // 🔥 LIVE SERVER DELETE FIX: Masking DELETE inside a POST request
      const response = await fetch(`${apiBaseUrl}/delete/${id}`, {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'DELETE'
        }
      });

      if (response.ok) {
        setStatus("🗑️ Banner item successfully deleted from server.");
        setDeleteConfirmId(null); 
        fetchSlides(); // Table automatic refresh ho jayegi!
        setTimeout(() => setStatus(''), 4000);
      } else {
        const errData = await response.json().catch(() => null);
        setErrorStatus(`❌ Server error: ${errData?.message || 'Delete process fail ho gaya.'}`);
        setStatus('');
        setDeleteConfirmId(null);
      }
    } catch (err) {
      console.error("Delete exception:", err);
      setErrorStatus("❌ Network issues during delete execution.");
      setStatus('');
      setDeleteConfirmId(null);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setSlideForm({ tag: '', title: '', description: '', btnText: 'Contact Now' });
    setSelectedFile(null);
    setStatus('');
    setErrorStatus('');
    const fileInput = document.getElementById('admin-file-picker');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '20px auto', fontFamily: 'Segoe UI, sans-serif', padding: '0 15px' }}>
      
      {/* ==================== FORM SECTION ==================== */}
      <div style={{ background: '#ffffff', padding: '35px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.04)', border: '1px solid #f1f5f9' }}>
        <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '15px', marginBottom: '25px' }}>
          <h3 style={{ margin: 0, color: '#00458b', fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            {editId ? '📝 EDIT HERO SLIDER' : '🚀 ADD NEW HERO SLIDER'}
          </h3>
          <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '13.5px' }}>Control desktop banner items directly from Database</p>
        </div>

        {status && (
          <div style={{ padding: '12px 20px', background: '#f0fdf4', borderLeft: '5px solid #22c55e', color: '#166534', borderRadius: '8px', marginBottom: '20px', fontWeight: '600', fontSize: '14px' }}>
            {status}
          </div>
        )}
        {errorStatus && (
          <div style={{ padding: '12px 20px', background: '#fef2f2', borderLeft: '5px solid #ef4444', color: '#991b1b', borderRadius: '8px', marginBottom: '20px', fontWeight: '600', fontSize: '14px' }}>
            {errorStatus}
          </div>
        )}

        <form onSubmit={submitSlideForm} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#1e293b' }}>Slider Banner Tag</label>
            <input type="text" name="tag" value={slideForm.tag} onChange={handleInput} placeholder="e.g., USE IN-DEMAND DIGITAL SKILLS" required 
                   style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box', outline: 'none' }}/>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#1e293b' }}>Main Title (HTML Safe)</label>
            <input type="text" name="title" value={slideForm.title} onChange={handleInput} placeholder="Use <span>Word</span> for highlighted blue styling text" required 
                   style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box', outline: 'none' }}/>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#1e293b' }}>Description Block Text</label>
            <textarea name="description" value={slideForm.description} onChange={handleInput} rows="3" placeholder="Write high converting details..." required 
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box', resize: 'vertical', outline: 'none' }}></textarea>
          </div>

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#1e293b' }}>CTA Button Label</label>
              <input type="text" name="btnText" value={slideForm.btnText} onChange={handleInput} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box', outline: 'none' }}/>
            </div>
            
            <div style={{ flex: '1', minWidth: '200px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#1e293b' }}>
                Upload Banner Graphic {editId && '(Optional)'}
              </label>
              <input id="admin-file-picker" type="file" accept="image/*" onChange={handleFileChange} required={!editId} 
                     style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '13px', background: '#f8fafc' }}/>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="submit" style={{ flex: 1, background: editId ? '#059669' : '#00458b', color: 'white', border: 'none', padding: '14px', fontSize: '15px', fontWeight: '700', borderRadius: '12px', cursor: 'pointer', transition: 'background 0.2s' }}>
              {editId ? 'Save Changes Now' : 'Publish New Slide Item'}
            </button>
            {editId && (
              <button type="button" onClick={cancelEdit} style={{ background: '#64748b', color: 'white', border: 'none', padding: '14px 25px', fontSize: '15px', fontWeight: '700', borderRadius: '12px', cursor: 'pointer' }}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ==================== TABLE SECTION ==================== */}
      <div style={{ marginTop: '40px', background: '#ffffff', padding: '30px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.04)', border: '1px solid #f1f5f9' }}>
        <h4 style={{ margin: '0 0 20px 0', color: '#1e293b', fontSize: '18px', fontWeight: '800' }}>📋 LIVE BANNER LIST ({slides.length})</h4>
        
        {slides.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>Database me koi banner data nahi mila bhai. Ek naya banner publish karo!</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '12px', color: '#475569', fontWeight: '700' }}>Preview</th>
                  <th style={{ padding: '12px', color: '#475569', fontWeight: '700' }}>Tag / Title</th>
                  <th style={{ padding: '12px', color: '#475569', fontWeight: '700' }}>Description</th>
                  <th style={{ padding: '12px', color: '#475569', fontWeight: '700' }}>Button</th>
                  <th style={{ padding: '12px', color: '#475569', fontWeight: '700', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {slides.map((slide) => {
                  const id = slide.id || slide.Id;
                  const tag = slide.tag || slide.Tag;
                  const title = slide.title || slide.Title;
                  const desc = slide.description || slide.Description;
                  const btn = slide.btnText || slide.BtnText;
                  const img = slide.image || slide.Image || slide.imagePath || slide.ImagePath;

                  return (
                    <tr key={id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                      <td style={{ padding: '12px' }}>
                        <img src={img} alt="Banner" style={{ width: '90px', height: '55px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                      </td>
                      <td style={{ padding: '12px', maxWidth: '180px' }}>
                        <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '2px 6px', borderRadius: '4px', fontWeight: '700', display: 'inline-block', marginBottom: '4px' }}>{tag}</span>
                        <div style={{ fontWeight: '600', color: '#1e293b' }} dangerouslySetInnerHTML={{ __html: title }}></div>
                      </td>
                      <td style={{ padding: '12px', color: '#64748b', maxWidth: '250px' }}>{desc}</td>
                      <td style={{ padding: '12px', fontWeight: '600', color: '#0f172a' }}>{btn}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        
                        {deleteConfirmId === id ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                            <span style={{ fontSize: '11px', color: '#e11d48', fontWeight: '700' }}>Sure?</span>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {/* 🔥 YES CLICK TRIGGER */}
                              <button type="button" onClick={() => handleDeleteClick(id)} style={{ background: '#e11d48', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: '700' }}>
                                Yes
                              </button>
                              <button type="button" onClick={() => setDeleteConfirmId(null)} style={{ background: '#64748b', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: '700' }}>
                                No
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <button type="button" onClick={() => handleEditClick(slide)} style={{ background: '#f1f5f9', color: '#0f172a', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
                              Edit
                            </button>
                            <button type="button" onClick={() => setDeleteConfirmId(id)} style={{ background: '#ffe4e6', color: '#e11d48', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
                              Delete
                            </button>
                          </div>
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

export default AdminSliderForm;