import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClinicSidebar from "./ClinicSidebar"; 
import "./clinicDashboard.css";

const ClinicDashboard = () => {
    const navigate = useNavigate();
    const [counts, setCounts] = useState({
        total_appointments: 0,
        total_patients: 0,
        total_schedules: 0, // Added state for total schedules
    });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [appointmentRes, patientRes, scheduleRes] = await Promise.all([
                    fetch("http://localhost:5000/api/appointments/count"),
                    fetch("http://localhost:5000/api/patients/count"),
                    fetch("http://localhost:5000/api/schedules/count"), // Fetch schedules count
                ]);

                const appointmentData = await appointmentRes.json();
                const patientData = await patientRes.json();
                const scheduleData = await scheduleRes.json();

                setCounts({
                    total_appointments: appointmentData.total_appointments || 0, 
                    total_patients: patientData.total || 0, 
                    total_schedules: scheduleData.total_schedules || 0, // Store total schedules count
                });
            } catch (error) {
                console.error("Error fetching counts:", error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="clinic-dashboard">
            <ClinicSidebar />
            <div className="dashboard-content">
                <h1 className="dashboard-title">Clinic Dashboard</h1>
                <div className="dashboard-stats">
                    <div className="stat-card schedule">
                        <h3>Total Schedules</h3>
                        <p>{counts.total_schedules} Schedules</p> {/* Updated schedule count */}
                    </div>
                    <div className="stat-card appointments">
                        <h3>Total Appointments</h3>
                        <p>{counts.total_appointments} Appointments</p>
                    </div>
                    <div className="stat-card patients">
                        <h3>Total Patients</h3>
                        <p>{counts.total_patients} Patients</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClinicDashboard;
