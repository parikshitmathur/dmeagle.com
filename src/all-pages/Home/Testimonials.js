import React, { useState, useEffect } from "react";
import "../../css/Testimonials.css"; 

function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default fallback data agar server queue down ho
  const defaultReviews = [
    { id: 1, name: "Durgesh Sharma", post: "Digital Marketing Graduate", description: "One of the best digital marketing institute covered each & every topic. Provides 100% placement assistance." },
    { id: 2, name: "Kusum Sharma", post: "SEO Professional Student", description: "Digital Marketing Eagle One of the leading and outstanding platforms for learning. It helped me learn with deep insights." },
    { id: 3, name: "Rahul Mathur", post: "Live Ads Specialist", description: "Excellent practical exposure on live ads management and SEO. The trainers are supportive, and course is industry-oriented." }
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://dmeagleapi.blsonicollege.in/api/Testimonial");
        if (response.ok) {
          const data = await response.json();
          
          // 🔥 EXTRA CRITICAL FILTER: Screen pe sirf wahi dikhao jo admin pane se Live (Approved) hain!
          const approvedReviews = data.filter(review => {
            const isApproved = review.approved !== undefined ? review.approved : (review.Approved !== undefined ? review.Approved : true);
            return isApproved === true;
          });

          setReviews(approvedReviews.length > 0 ? approvedReviews : defaultReviews);
        } else {
          setReviews(defaultReviews);
        }
      } catch (error) {
        console.error("Error fetching testimonials from server:", error);
        setReviews(defaultReviews);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, []);

  if (loading) return null;

  return (
    <section className="ultra-testimonials-section" id="testimonials">
      
      <div className="testimonials-header">
        <span className="tag">Testimonials</span>
        <h2>What Our Clients Say <br /><span>On Google Reviews</span></h2>
      </div>

      <div className="testimonials-grid">
        {reviews.map((review) => {
          const id = review.id || review.Id;
          const name = review.name || review.Name;
          const post = review.post || review.Post || "Student Verified";
          const desc = review.description || review.Description || review.text;

          return (
            <div className="testimonial-card" key={id}>
              <p className="review-text">"{desc}"</p>
              
              <div className="card-user-info">
                <div className="user-details">
                  <h4>{name}</h4>
                  <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#00458b", fontWeight: "700" }}>{post}</p>
                  <div className="stars" style={{ marginTop: "4px", color: "#ffb703" }}>
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
                <div className="google-icon-brand">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_G_Logo.svg" 
                    alt="Google Review Source Connection" 
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}

export default Testimonials;