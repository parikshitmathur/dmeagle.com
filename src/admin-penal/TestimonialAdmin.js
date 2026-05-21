import React, { useState } from "react";

function TestimonialAdmin() {
  const [allReviews, setAllReviews] = useState([
    { id: 1, name: "Durgesh Sharma", text: "Best digital marketing institute...", approved: true },
    { id: 2, name: "Pending User", text: "Fake text checking validation...", approved: false }
  ]);

  const [form, setForm] = useState({ name: "", text: "", stars: 5 });

  // Handle Form Inputs
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add Review Logic (POST Call Placeholder)
  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { id: Date.now(), ...form, approved: true };
    setAllReviews([...allReviews, newReview]);
    
    /*
    // API CALL SAMPLE:
    fetch("https://your-api-domain.com/api/testimonials", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(newReview)
    });
    */
    setForm({ name: "", text: "", stars: 5 });
    alert("Testimonial added successfully!");
  };

  // Toggle Approval (PUT Call Placeholder)
  const toggleApprove = (id) => {
    setAllReviews(allReviews.map(item => 
      item.id === id ? { ...item, approved: !item.approved } : item
    ));
  };

  // Delete Review (DELETE Call Placeholder)
  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this review?")) {
      setAllReviews(allReviews.filter(item => item.id !== id));
    }
  };

  return (
    <div style={{ padding: "30px", background: "#ffffff", color: "#0f172a", minHeight: "100vh", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "5px" }}>Testimonials Management System Dashboard</h2>
      <p style={{ color: "#64748b", margin: "0 0 25px 0", fontSize: "14px" }}>Manage, approve, or manually insert customer feedback streams into the live infrastructure.</p>
      
      {/* 1. ADD NEW MANUAL ENTRY */}
      <form onSubmit={handleSubmit} style={{ margin: "30px 0", padding: "25px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "15px", color: "#1e293b" }}>Add Official Client Review Manually</h3>
        <input type="text" name="name" placeholder="Client Name" value={form.name} onChange={handleInput} required style={inputStyle} /><br/>
        <textarea name="text" placeholder="Review Content Text" value={form.text} onChange={handleInput} required style={{...inputStyle, height: "90px", resize: "none"}}></textarea><br/>
        <select name="stars" value={form.stars} onChange={handleInput} style={inputStyle}>
          <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
          <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
          <option value="3">⭐⭐⭐ (3 Stars)</option>
        </select><br/>
        <button type="submit" style={{ padding: "10px 22px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", marginTop: "10px", boxShadow: "0 4px 10px rgba(37, 99, 235, 0.15)" }}>Publish Live</button>
      </form>

      {/* 2. REVIEWS CONTROL LIST */}
      <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "40px 0 15px 0", color: "#1e293b" }}>Active Feedback Databases</h3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}>
          <thead>
            <tr style={{ background: "#f1f5f9", textAlign: "left", borderBottom: "2px solid #e2e8f0" }}>
              <th style={thStyle}>Client</th>
              <th style={thStyle}>Review Message</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allReviews.map(review => (
              <tr key={review.id} style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.2s" }}>
                <td style={{...tdStyle, fontWeight: "600", color: "#0f172a"}}><b>{review.name}</b></td>
                <td style={{...tdStyle, color: "#334155", maxWidth: "450px"}}>{review.text}</td>
                <td style={tdStyle}>
                  <span style={{ padding: "4px 10px", borderRadius: "100px", fontSize: "12px", fontWeight: "600", background: review.approved ? "#dcfce7" : "#fee2e2", color: review.approved ? "#15803d" : "#b91c1c" }}>
                    {review.approved ? "🟢 Live" : "🔴 Hidden"}
                  </span>
                </td>
                <td style={tdStyle}>
                  <button onClick={() => toggleApprove(review.id)} style={btnStyle(review.approved ? "#f1f5f9" : "#dcfce7", review.approved ? "#475569" : "#15803d")}>
                    {review.approved ? "Hide" : "Approve"}
                  </button>
                  <button onClick={() => handleDelete(review.id)} style={btnStyle("#fee2e2", "#b91c1c")}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Crisp White Premium Input & Grid Style Configurations
const inputStyle = { 
  width: "100%", 
  padding: "12px", 
  margin: "8px 0", 
  background: "#ffffff", 
  border: "1px solid #cbd5e1", 
  color: "#0f172a", 
  borderRadius: "8px", 
  fontSize: "14px",
  outline: "none" 
};
const thStyle = { padding: "14px 12px", color: "#475569", fontSize: "14px", fontWeight: "600" };
const tdStyle = { padding: "16px 12px", fontSize: "14px", verticalAlign: "top" };
const btnStyle = (bg, col) => ({ 
  padding: "6px 14px", 
  background: bg, 
  color: col, 
  border: "none", 
  marginRight: "8px", 
  borderRadius: "6px", 
  cursor: "pointer", 
  fontWeight: "600",
  fontSize: "13px"
});

export default TestimonialAdmin;