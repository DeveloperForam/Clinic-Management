import React from "react";
import { FaUserMd, FaHeartbeat, FaHospitalAlt, FaStethoscope } from "react-icons/fa";
import "../styles/about.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <div className="about-banner">
        <h1>🏥 Welcome to Our Clinic</h1>
        <p>Your health is our priority. Experience world-class care with us.</p>
      </div>

      {/* About Content */}
      <div className="about-content">
        <h2>Why Choose Us?</h2>
        <p>
          At <strong>Elite Care Clinic</strong>, we provide top-notch medical care with experienced doctors, advanced treatments, and a patient-centered approach. Our goal is to ensure that you receive the best healthcare in a comfortable and friendly environment.
        </p>

        <h3>✨ Our Mission</h3>
        <p>
          To offer exceptional healthcare services with compassion, innovation, and excellence. We aim to improve lives through personalized treatment and cutting-edge medical technology.
        </p>

        <h3>🏆 Our Values</h3>
        <ul className="about-values">
          <li>✔ Compassionate Patient Care</li>
          <li>✔ Advanced Medical Technology</li>
          <li>✔ Ethical and Transparent Practices</li>
          <li>✔ Commitment to Innovation</li>
        </ul>

        {/* Animated Statistics Section */}
        <div className="about-stats">
          <div className="stat-item">
            <FaUserMd className="stat-icon" />
            <h2>50+</h2>
            <p>Expert Doctors</p>
          </div>
          <div className="stat-item">
            <FaHospitalAlt className="stat-icon" />
            <h2>10K+</h2>
            <p>Patients Treated</p>
          </div>
          <div className="stat-item">
            <FaHeartbeat className="stat-icon" />
            <h2>20+</h2>
            <p>Years of Experience</p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="about-services">
        <h2>🩺 Our Services</h2>
        <div className="services-grid">
          <div className="service-item">
            <FaStethoscope className="service-icon" />
            <h3>General Checkups</h3>
            <p>Routine health assessments to ensure your well-being.</p>
          </div>
          <div className="service-item">
            <FaHeartbeat className="service-icon" />
            <h3>Cardiology</h3>
            <p>Advanced heart care and diagnostic treatments.</p>
          </div>
          <div className="service-item">
            <FaHospitalAlt className="service-icon" />
            <h3>Emergency Care</h3>
            <p>24/7 emergency medical assistance with expert care.</p>
          </div>
          <div className="service-item">
            <FaUserMd className="service-icon" />
            <h3>Specialist Consultations</h3>
            <p>Experienced specialists in multiple medical fields.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
