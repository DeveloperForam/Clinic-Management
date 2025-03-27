import React, { useEffect, useState } from "react";
import Sidebar from "../admin/Sidebar";
import "./dashboard.css";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    total_clinics: 0,
    total_doctors: 0,
    total_patients: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [clinicRes, doctorRes, patientRes] = await Promise.all([
          fetch("http://localhost:5000/api/clinic/count"),
          fetch("http://localhost:5000/api/doctor/count"),
          fetch("http://localhost:5000/api/patients/count"),
        ]);

        const clinicData = await clinicRes.json();
        const doctorData = await doctorRes.json();
        const patientData = await patientRes.json();

        setCounts({
          total_clinics: clinicData.total_clinics || 0,
          total_doctors: doctorData.total_doctors || 0, // Assuming API returns { count: number }
          total_patients: patientData.total_patients || 0, // Assuming API returns { count: number }
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <div className="dashboard-stats">
          <div className="stat-card clinic">
            <h3>Total Clinics</h3>
            <p>{counts.total_clinics}</p>
          </div>
          <div className="stat-card doctor">
            <h3>Total Doctors</h3>
            <p>{counts.total_doctors}</p>
          </div>
          <div className="stat-card patient">
            <h3>Total Patients</h3>
            <p>{counts.total_patients}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
