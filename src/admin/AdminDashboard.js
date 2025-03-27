import React from "react";
import Sidebar from "../admin/Sidebar";
import "./dashboard.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <div className="dashboard-stats">
          <div className="stat-card clinic">
            <h3>Total Clinics</h3>
            <p>8</p>
          </div>
          <div className="stat-card doctor">
            <h3>Total Doctors</h3>
            <p>3</p>
          </div>
          <div className="stat-card patient">
            <h3>Total Patients</h3>
            <p>10</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
