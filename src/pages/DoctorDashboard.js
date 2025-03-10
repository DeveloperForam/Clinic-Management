import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import Logout from "../pages/Logout";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container fade-in">
      <h2 className="dashboard-title">Doctor Dashboard</h2>
      <div className="dashboard-menu">
        <button className="dashboard-btn" onClick={() => navigate("/doctor/view-appointments")}>
          View Appointments
        </button>
        <button className="dashboard-btn" onClick={() => navigate("/doctor/schedule")}>
          Manage Schedule
        </button>
        <button className="dashboard-btn" onClick={() => navigate("/profile")}>
          My Profile
        </button>
      </div>
      <Logout />
    </div>
  );
};

export default DoctorDashboard;
