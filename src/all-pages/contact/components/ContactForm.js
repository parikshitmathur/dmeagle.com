import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import '../css/ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Live Student Lead Data Submitted:", formData);
    alert("Thank you! Your enquiry has been locked securely.");
    // Yahan backend routing target parameters mapping loops attach honge baad me
  };

  return (
    <section className="contact-core-section">
      <div className="contact-core-container">
        
        {/* LEFT COLUMN - STRATEGIC OFFICE METADATA */}
        <div className="contact-info-workspace">
          <span className="contact-info-tag">Contact Dashboard</span>
          <h2 className="contact-info-heading">Let's Connect & Scale Your Brand</h2>
          <p className="contact-info-sub">
            Have questions about our practical advanced digital curriculum modules or training bootcamps? Drop us a line. Our support team responds within 24 hours.
          </p>

          <div className="contact-meta-stack">
            
            <div className="info-meta-card">
              <div className="info-icon-box"><Phone size={20} /></div>
              <div className="info-card-details">
                <h4>Call Center Operations</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="info-meta-card">
              <div className="info-icon-box"><Mail size={20} /></div>
              <div className="info-card-details">
                <h4>Official Digital Feed</h4>
                <p>info@dmeagle.com</p>
              </div>
            </div>

            <div className="info-meta-card">
              <div className="info-icon-box"><MapPin size={20} /></div>
              <div className="info-card-details">
                <h4>Bhilwara Training Corporate Hub</h4>
                <p>2nd Floor, Textile Tech Avenue Tower, Bhilwara, Rajasthan - 311001</p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN - HIGH CONVERTING DATA CAPTURE FORM */}
        <div className="contact-form-card">
          <form className="contact-form-engine" onSubmit={handleFormSubmit}>
            
            <div className="form-input-row">
              <div className="form-group-block">
                <label>First Name</label>
                <input 
                  type="text" name="firstName" required
                  value={formData.firstName} onChange={handleInputChange}
                  placeholder="Parikshit"
                />
              </div>
              <div className="form-group-block">
                <label>Last Name</label>
                <input 
                  type="text" name="lastName" required
                  value={formData.lastName} onChange={handleInputChange}
                  placeholder="Mathur"
                />
              </div>
            </div>

            <div className="form-input-row">
              <div className="form-group-block">
                <label>Email Address</label>
                <input 
                  type="email" name="email" required
                  value={formData.email} onChange={handleInputChange}
                  placeholder="name@domain.com"
                />
              </div>
              <div className="form-group-block">
                <label>Phone Number</label>
                <input 
                  type="tel" name="phone" required
                  value={formData.phone} onChange={handleInputChange}
                  placeholder="+91 00000 00000"
                />
              </div>
            </div>

            <div className="form-group-block">
              <label>Message / Career Consultation Enquiry</label>
              <textarea 
                name="message" rows="5" required
                value={formData.message} onChange={handleInputChange}
                placeholder="Write your requirement parameters details here..."
              ></textarea>
            </div>

            <button type="submit" className="form-submit-btn">
              Send Live Enquiry
              <Send size={16} />
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}

export default ContactForm;