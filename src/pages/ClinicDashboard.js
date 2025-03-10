import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import Logout from "../patient/Logout";

const ClinicDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container fade-in">
      <h2 className="dashboard-title">Clinic Dashboard</h2>
      <div className="dashboard-menu">
        <button className="dashboard-btn" onClick={() => navigate("/clinic/manage-doctors")}>
          Manage Doctors
        </button>
        <button className="dashboard-btn" onClick={() => navigate("/clinic/view-appointments")}>
          View Appointments
        </button>
        <button className="dashboard-btn" onClick={() => navigate("/profile")}>
          My Profile
        </button>
      </div>
      <Logout />
    </div>
  );
};

export default ClinicDashboard;
