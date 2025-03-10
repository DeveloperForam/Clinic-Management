import React from "react";
import DoctorSidebar from "./DoctorSidebar"; // Import Sidebar
import "./doctorDashboard.css"; // Use separate CSS for doctor dashboard

const DoctorDashboard = () => {
    return (
        <div className="doctor-dashboard">
            

            {/* Main Content */}
            <div className="dashboard-content">
                <h1 className="dashboard-title">Doctor Dashboard</h1>
                <div className="dashboard-stats">
                    <div className="stat-card schedule">
                        <h3>Today's Schedule</h3>
                        <p>4 Scheduled Appointments</p>
                    </div>
                    <div className="stat-card appointments">
                        <h3>Today's Appointments</h3>
                        <p>2 Completed</p>
                    </div>
                    <div className="stat-card patients">
                        <h3>Patients Treated</h3>
                        <p>15 Total</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
