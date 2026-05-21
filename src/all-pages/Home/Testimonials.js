import React, { useState, useEffect } from "react";
import "../../css/Testimonials.css"; // 👈 Ek aur '../' lagaya

function Testimonials() {
  // 1. Local State for Testimonials (Fallback / Mock Data)
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Durgesh Sharma",
      text: "One of the best digital marketing institute covered each & every topic. Staff with bulk of knowledge & experienced faculties. Flexible batches. Provides 100% placement assistance. Wonderful learning experience.",
      stars: 5,
    },
    {
      id: 2,
      name: "Kusum Sharma",
      text: "Digital Marketing Eagle One of the leading and outstanding platforms for learning. It helped me to learn all the modules and aspects properly with deep insights. I would definitely recommend this institute.",
      stars: 5,
    },
    {
      id: 3,
      name: "Rahul Mathur",
      text: "Excellent practical exposure on live ads management and SEO. The trainers are supportive, and the course structure is extremely industry-oriented.",
      stars: 5,
    }
  ]);

  // 2. BACKEND API INTEGRATION PLACEHOLDER
  useEffect(() => {
    /* const fetchReviews = async () => {
      try {
        const response = await fetch("https://your-api-domain.com/api/testimonials");
        const data = await response.json();
        // Sirf approved reviews ko state me save karein
        setReviews(data.filter(review => review.approved === true));
      } catch (error) {
        console.error("Error fetching testimonials from server:", error);
      }
    };
    fetchReviews();
    */
  }, []);

  return (
    <section className="ultra-testimonials-section" id="testimonials">
      
      <div className="testimonials-header">
        <span className="tag">Testimonials</span>
        <h2>What Our Clients Say <br /><span>On Google Reviews</span></h2>
      </div>

      <div className="testimonials-grid">
        {reviews.map((review) => (
          <div className="testimonial-card" key={review.id}>
            <p className="review-text">"{review.text}"</p>
            
            <div className="card-user-info">
              <div className="user-details">
                <h4>{review.name}</h4>
                <div className="stars">
                  {"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}
                </div>
              </div>
              <div className="google-icon-brand">
              <img 
  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_G_Logo.svg" 
  alt="Google Review" 
/>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default Testimonials;