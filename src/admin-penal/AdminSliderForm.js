// src/admin-penal/AdminSliderForm.js
import React, { useState } from 'react';

function AdminSliderForm() {
  const [slideForm, setSlideForm] = useState({
    tag: '',
    title: '',
    description: '',
    btnText: 'Contact Now'
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleInput = (e) => {
    setSlideForm({ ...slideForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

const submitNewSlide = async (e) => {
    e.preventDefault();
    setStatus('Processing Admin Upload Request...');

    if (!selectedFile) {
      setStatus('⚠️ Error: Bhai, image file select karo!');
      return;
    }

    const formData = new FormData();
    formData.append('tag', slideForm.tag);
    formData.append('title', slideForm.title);
    formData.append('description', slideForm.description);
    formData.append('btnText', slideForm.btnText);
    formData.append('imageFile', selectedFile);

    try {
      const response = await fetch('https://localhost:7067/api/heroslider/add', {
        method: 'POST',
        body: formData // No headers explicitly needed for FormData
      });

      if (response.ok) {
        setStatus('✅ Success! Banner Published with Uploaded Image.');
        alert("Boom! New slider banner published successfully to SQL Database!");
        
        // Form fields clear karo
        setSlideForm({ tag: '', title: '', description: '', btnText: 'Contact Now' });
        setSelectedFile(null);
        
        const fileInput = document.getElementById('admin-file-picker');
        if (fileInput) fileInput.value = '';
      } else {
        // Agar response ok nahi hai, tabhi json ya text read karo
        const errorText = await response.text();
        setStatus(`❌ Failed: ${errorText || 'Server processed block with execution issues.'}`);
      }
    } catch (err) {
      console.error("Network Exception:", err);
      setStatus('❌ Network/CORS Issue. Check Console Logs.');
      alert("Panga ho gaya! Ek baar inspect karke console error check karo.");
    }
  };

  return (
    <div style={{
      maxWidth: '650px', margin: '20px auto', background: '#ffffff', padding: '35px',
      borderRadius: '24px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.04)',
      border: '1px solid #f1f5f9', fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '15px', marginBottom: '25px' }}>
        <h3 style={{ margin: 0, color: '#00458b', fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>🚀 ADD NEW HERO SLIDER</h3>
        <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '13.5px' }}>Control desktop banner items directly from Database</p>
      </div>

      <form onSubmit={submitNewSlide} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
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
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#1e293b' }}>Upload Banner Graphic</label>
            <input id="admin-file-picker" type="file" accept="image/*" onChange={handleFileChange} required 
                   style={{ 
                     width: '100%', 
                     padding: '9px 12px', 
                     borderRadius: '10px', 
                     border: '1px solid #cbd5e1', 
                     boxSizing: 'border-box',
                     fontSize: '13px',
                     background: '#f8fafc'
                   }}/>
          </div>
        </div>

        <button type="submit" style={{
          background: '#00458b', color: 'white', border: 'none', padding: '14px', fontSize: '15px',
          fontWeight: '700', borderRadius: '12px', cursor: 'pointer', transition: 'background 0.2s', marginTop: '10px'
        }}>
          Publish New Slide Item
        </button>

        {status && <p style={{ textAlign: 'center', color: '#00458b', fontWeight: '600', fontSize: '14px', margin: 0 }}>{status}</p>}
      </form>
    </div>
  );
}

export default AdminSliderForm;