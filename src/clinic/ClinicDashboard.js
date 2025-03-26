import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClinicSidebar from "./ClinicSidebar"; 
import "./clinicDashboard.css";

const ClinicDashboard = () => {
    const navigate = useNavigate();

    // useEffect(() => {
    //     const isAuthenticated = localStorage.getItem("clinicAuthenticated");
    //     if (!isAuthenticated) {
    //         navigate("/clinic/login");
    //     }
    // }, [navigate]);

    return (
        <div className="clinic-dashboard">
            <ClinicSidebar />
            <div className="dashboard-content">
                <h1 className="dashboard-title">Clinic Dashboard</h1>
                <div className="dashboard-stats">
                    <div className="stat-card schedule">
                        <h3>Today's Schedule</h3>
                        <p>1 Schedule</p>
                    </div>
                    <div className="stat-card appointments">
                        <h3>Today's Appointments</h3>
                        <p>2 Appointments</p>
                    </div>
                    <div className="stat-card patients">
                        <h3>Number of Patients</h3>
                        <p>8 Patients</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClinicDashboard;
