import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import Logout from "../pages/Logout";
import Chatbot from "../pages/Chatbot"; // Import Chatbot

const PatientDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container fade-in">
      <h2 className="dashboard-title">Patient Dashboard</h2>
      <div className="dashboard-menu">
        <button className="dashboard-btn" onClick={() => navigate("/appointment")}>
          Book Appointment
        </button>
        <button className="dashboard-btn" onClick={() => navigate("/patient/view-appointments")}>
          View Appointments
        </button>
        <button className="dashboard-btn" onClick={() => navigate("/profile")}>
          My Profile
        </button>
      </div>
      <Logout />
      <Chatbot /> {/* Add Chatbot */}
    </div>
  );
};

export default PatientDashboard;
