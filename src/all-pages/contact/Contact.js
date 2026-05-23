import React from 'react';
import PageBanner from '../About/components/PageBanner'; // 👈 Path mapping cross check kar lena
import ContactForm from './components/ContactForm';

function ContactPage() {
  return (
    <div className="contact-page-pipeline" style={{ minHeight: '100vh', background: '#ffffff' }}>
      
      {/* 1. TOP DYNAMIC CUSTOM LIGHT BANNER (As seen in snapshot) */}
      <PageBanner 
        title="Get in Touch – We Value" 
        highlightText="Your Questions!" 
        currentPage="Contact Us" 
      />

      {/* 2. LOWER FORM WORKSPACE MODULE */}
      <ContactForm />

    </div>
  );
}

export default ContactPage;