import React, { useState } from "react";
import "../styles/general.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaStar } from "react-icons/fa";

const DoctorContact = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState("");
  const [rating, setRating] = useState(0);
  const [showReviews, setShowReviews] = useState(false);

  const handleReviewSubmit = () => {
    if (reviewInput.trim() === "" || rating === 0) return;
    setReviews([...reviews, { text: reviewInput, rating }]);
    setReviewInput("");
    setRating(0);
  };

  return (
    <div className="contact-container">
      <h2>Contact Our Clinic</h2>

      <div className="contact-panels">
        <div className="contact-panel">
          <FaPhone className="contact-icon" /> 
          <p><strong>Phone:</strong> +1 234 567 890</p>
        </div>
        <div className="contact-panel">
          <FaEnvelope className="contact-icon" /> 
          <p><strong>Email:</strong> clinic@example.com</p>
        </div>
        <div className="contact-panel">
          <FaMapMarkerAlt className="contact-icon" /> 
          <p><strong>Location:</strong> 123 Medical Street, City, Country</p>
        </div>
      </div>

      <div className="review-section">
        <h3>Leave a Review</h3>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar 
              key={star} 
              className={star <= rating ? "star active" : "star"} 
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <textarea 
          placeholder="Write your review..." 
          value={reviewInput} 
          onChange={(e) => setReviewInput(e.target.value)}
        ></textarea>
        <button onClick={handleReviewSubmit}>Submit Review</button>
      </div>

      <button className="toggle-btn" onClick={() => setShowReviews(!showReviews)}>
        {showReviews ? "Hide Reviews" : "Show Reviews"}
      </button>

      {showReviews && (
        <div className="reviews-list">
          <h3>User Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="star active" />
                  ))}
                </div>
                <p>{review.text}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to leave one!</p>
          )}
        </div>
      )}

      <div className="social-media">
        <h3>Follow Us</h3>
        <a href="#" className="social-icon"><FaFacebook /></a>
        <a href="#" className="social-icon"><FaTwitter /></a>
        <a href="#" className="social-icon"><FaInstagram /></a>
      </div>

      <div className="map-container">
        <h3>Find Us Here</h3>
        <iframe
          title="clinic-location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094233!2d144.96305791531597!3d-37.81627977975115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577b0a30e2c1f0!2sMedical%20Clinic!5e0!3m2!1sen!2sus!4v1646746077624!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default DoctorContact;
