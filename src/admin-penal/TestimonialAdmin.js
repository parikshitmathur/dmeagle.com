import React, { useState, useEffect } from "react";

function TestimonialAdmin() {
  const [allReviews, setAllReviews] = useState([]);
  const [form, setForm] = useState({ name: "", post: "", description: "" });
  const [status, setStatus] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [editId, setEditId] = useState(null); // Tracking dynamic edits
  const [deleteConfirmId, setDeleteConfirmId] = useState(null); // Inline prompt step

  // 🚀 Swagger matched base endpoint url
  const apiBaseUrl = "https://dmeagleapi.blsonicollege.in/api/Testimonial";

  // 🏃 1. GET: Live server se saare reviews load karna
  const fetchReviews = async () => {
    try {
      const response = await fetch(apiBaseUrl);
      if (response.ok) {
        const data = await response.json();
        setAllReviews(data);
      }
    } catch (err) {
      console.error(err);
      setErrorStatus("❌ Live server se reviews fetch nahi ho paye.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 2. POST / PUT: Naya review jodna ya purane wale ko live update karna
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Processing testimonial payload streams...");
    setErrorStatus("");

    const formData = new FormData();
    // Swagger validation parameters matching
    formData.append("Name", form.name);
    formData.append("Post", form.post);
    formData.append("Description", form.description);

    try {
      let url = `${apiBaseUrl}/add`;
      let method = "POST";
      let headers = {};

      // If configuration is on edit mode, apply PUT overriding pipeline
      if (editId) {
        url = `${apiBaseUrl}/update/${editId}`;
        method = "POST";
        headers = { "X-HTTP-Method-Override": "PUT" };
      }

      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: formData
      });

      if (response.ok) {
        setStatus(editId ? "🎉 Testimonial successfully updated live!" : "🎉 New client testimonial published live!");
        setForm({ name: "", post: "", description: "" });
        setEditId(null);
        fetchReviews(); // Instant tracking refresh
        setTimeout(() => setStatus(""), 4000);
      } else {
        const errText = await response.text();
        setErrorStatus(`❌ Failed: ${errText || "Validation issue on core keys."}`);
        setStatus("");
      }
    } catch (err) {
      console.error(err);
      setErrorStatus("❌ Network fault during database streaming update.");
      setStatus("");
    }
  };

  // 🛠️ 3. EDIT TRIGGER: Row data ko wapas upar form dabba me set karna
  const handleEditClick = (review) => {
    setEditId(review.id || review.Id);
    setForm({
      name: review.name || review.Name || "",
      post: review.post || review.Post || "",
      description: review.description || review.Description || ""
    });
    setStatus(`📝 Editing entry ID: ${review.id || review.Id}. Updates directly targeting live database.`);
    setErrorStatus("");
    window.scrollTo({ top: 0, behavior: "smooth" }); // Screen focus back to top form
  };

  // 🚀 4. PATCH (Via POST override): Status Toggle (Live / Hidden)
  const toggleApprove = async (id) => {
    setStatus("Configuring live feedback visibility flag...");
    setErrorStatus("");
    try {
      const response = await fetch(`${apiBaseUrl}/toggle-status/${id}`, {
        method: "POST",
        headers: { "X-HTTP-Method-Override": "PATCH" }
      });
      if (response.ok) {
        setStatus("⚡ Visibility index modified successfully.");
        fetchReviews();
        setTimeout(() => setStatus(""), 3000);
      } else {
        setErrorStatus("❌ Server block encountered on toggling operation workflow.");
        setStatus("");
      }
    } catch (err) {
      setErrorStatus("❌ Server connection lost during verification state refresh.");
      setStatus("");
    }
  };

  // 🚀 5. DELETE (Via POST override): Database queue content deletion
  const handleDeleteClick = async (id) => {
    setStatus("Purging customer entry object from server stack...");
    setErrorStatus("");
    try {
      const response = await fetch(`${apiBaseUrl}/delete/${id}`, {
        method: "POST",
        headers: { "X-HTTP-Method-Override": "DELETE" }
      });
      if (response.ok) {
        setStatus("🗑️ Testimonial completely removed from active database.");
        setDeleteConfirmId(null);
        fetchReviews();
        setTimeout(() => setStatus(""), 4000);
      } else {
        setErrorStatus("❌ Delete script invocation rejected by system endpoint configuration.");
        setStatus("");
        setDeleteConfirmId(null);
      }
    } catch (err) {
      setErrorStatus("❌ Connection lost during server execution task.");
      setStatus("");
      setDeleteConfirmId(null);
    }
  };

  const cancelEditMode = () => {
    setForm({ name: "", post: "", description: "" });
    setEditId(null);
    setStatus("");
    setErrorStatus("");
  };

  return (
    <div style={{ padding: "30px", background: "#ffffff", color: "#0f172a", minHeight: "100vh", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)", fontFamily: "Segoe UI, sans-serif" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "5px", color: "#00458b" }}>
        {editId ? "📝 TESTIMONIAL RE-CONFIGURATION MODE" : "⭐ TESTIMONIALS CONFIGURATION ENGINE"}
      </h2>
      <p style={{ color: "#64748b", margin: "0 0 25px 0", fontSize: "14px" }}>Manage, approve, edit or manually insert customer feedback streams into the live infrastructure lines.</p>
      
      {/* Inline Messaging Boxes */}
      {status && <div style={{ padding: "12px 20px", background: "#f0fdf4", borderLeft: "5px solid #22c55e", color: '#166534', borderRadius: "8px", marginBottom: "20px", fontWeight: "600", fontSize: "14px" }}>{status}</div>}
      {errorStatus && <div style={{ padding: "12px 20px", background: "#fef2f2", borderLeft: "5px solid #ef4444", color: '#991b1b', borderRadius: "8px", marginBottom: "20px", fontWeight: "600", fontSize: "14px" }}>{errorStatus}</div>}

      {/* 1. ADD NEW / EDIT ENTRY FORM */}
      <form onSubmit={handleSubmit} style={{ margin: "30px 0", padding: "25px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "15px", color: "#1e293b", textTransform: "uppercase" }}>
          {editId ? "Modify Target Entity Attributes" : "Add Official Client Review Manually"}
        </h3>
        
        <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569" }}>Client Full Name</label>
        <input type="text" name="name" placeholder="e.g., Durgesh Sharma" value={form.name} onChange={handleInput} required style={inputStyle} />
        
        {/* Swagger DTO matching added field */}
        <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", marginTop: "10px", display: "block" }}>Client Designation / Course Post</label>
        <input type="text" name="post" placeholder="e.g., Digital Marketing Student / CEO" value={form.post} onChange={handleInput} required style={inputStyle} />
        
        <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", marginTop: "10px", display: "block" }}>Review Content Message Description</label>
        <textarea name="description" placeholder="Write feedback details..." value={form.description} onChange={handleInput} required style={{...inputStyle, height: "100px", resize: "none"}}></textarea>
        
        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button type="submit" style={{ padding: "12px 25px", background: editId ? "#059669" : "#00458b", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,69,139,0.15)" }}>
            {editId ? "Save Review Overrides" : "Publish Live Review"}
          </button>
          {editId && (
            <button type="button" onClick={cancelEditMode} style={{ padding: "12px 25px", background: "#64748b", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* 2. REVIEWS CONTROL LIST TABLE */}
      <h3 style={{ fontSize: "17px", fontWeight: "800", margin: "40px 0 15px 0", color: "#1e293b", textTransform: "uppercase" }}>📋 Active Feedback Core Dataset ({allReviews.length})</h3>
      
      {allReviews.length === 0 ? (
        <p style={{ color: "#94a3b8", fontSize: "14px" }}>Database entry logger is entirely blank.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}>
            <thead>
              <tr style={{ background: "#f8fafc", textAlign: "left", borderBottom: "2px solid #e2e8f0" }}>
                <th style={thStyle}>Client Details</th>
                <th style={thStyle}>Review Content Description</th>
                <th style={thStyle}>Live Status</th>
                <th style={{...thStyle, textAlign: "center"}}>Dashboard Actions</th>
              </tr>
            </thead>
            <tbody>
              {allReviews.map((review) => {
                const id = review.id || review.Id;
                const name = review.name || review.Name;
                const post = review.post || review.Post || "Student";
                const desc = review.description || review.Description;
                const isApproved = review.approved !== undefined ? review.approved : (review.Approved !== undefined ? review.Approved : true);

                return (
                  <tr key={id} style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.2s" }}>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: "700", color: "#0f172a" }}>{name}</div>
                      <div style={{ fontSize: "12px", color: "#00458b", fontWeight: "600" }}>{post}</div>
                    </td>
                    <td style={{...tdStyle, color: "#334155", maxWidth: "400px", lineHeight: "1.5" }}>{desc}</td>
                    <td style={tdStyle}>
                      <span style={{ padding: "5px 12px", borderRadius: "100px", fontSize: "11.5px", fontWeight: "700", background: isApproved ? "#dcfce7" : "#f1f5f9", color: isApproved ? "#15803d" : "#64748b" }}>
                        {isApproved ? "🟢 Live" : "⚪ Hidden"}
                      </span>
                    </td>
                    <td style={{...tdStyle, textAlign: "center"}}>
                      
                      {deleteConfirmId === id ? (
                        <div style={{ display: "flex", gap: "6px", justifyContent: "center", alignItems: "center" }}>
                          <span style={{ fontSize: "12px", color: "#e11d48", fontWeight: "700" }}>Uda dein?</span>
                          <button type="button" onClick={() => handleDeleteClick(id)} style={{ background: "#e11d48", color: "white", border: "none", padding: "4px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "11px", fontWeight: "700" }}>Yes</button>
                          <button type="button" onClick={() => setDeleteConfirmId(null)} style={{ background: "#64748b", color: "white", border: "none", padding: "4px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "11px", fontWeight: '700' }}>No</button>
                        </div>
                      ) : (
                        <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                          <button type="button" onClick={() => handleEditClick(review)} style={{ border: "none", background: "#f1f5f9", color: "#0f172a", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "12.5px" }}>
                            Edit
                          </button>
                          <button type="button" onClick={() => toggleApprove(id)} style={{ border: "none", background: "#f1f5f9", color: isApproved ? "#475569" : "#15803d", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "12.5px" }}>
                            {isApproved ? "Hide" : "Approve"}
                          </button>
                          <button type="button" onClick={() => setDeleteConfirmId(id)} style={{ border: "none", background: "#fee2e2", color: "#b91c1c", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "12.5px" }}>
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
  );
}

const inputStyle = { 
  width: "100%", 
  padding: "12px 16px", 
  margin: "8px 0 16px 0", 
  background: "#ffffff", 
  border: "1px solid #cbd5e1", 
  color: "#0f172a", 
  borderRadius: "8px", 
  fontSize: "14px",
  boxSizing: "border-box",
  outline: "none" 
};
const thStyle = { padding: "14px 12px", color: "#475569", fontSize: "13.5px", fontWeight: "700" };
const tdStyle = { padding: "16px 12px", fontSize: "13.5px", verticalAlign: "top" };

export default TestimonialAdmin;