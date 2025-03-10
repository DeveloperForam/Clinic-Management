import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaUsers, FaList, FaUser, FaSignOutAlt, FaHome } from "react-icons/fa";
import "./clinicDashboard.css";

const ClinicSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        
            if (window.confirm("Are you sure you want to logout?")) {
                localStorage.removeItem("clinicAuthenticated");
                window.dispatchEvent(new Event("storage")); // Ensure state updates
                navigate("/clinic/login");
            }
        };
        // localStorage.removeItem("clinicAuthenticated"); // Clear authentication
        // navigate("/clinic/login"); // Redirect to login
    

    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Clinic Panel</h2>
            <ul>
                <li>
                    <NavLink to="/clinic/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                        <FaHome /> Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/clinic/manage-schedule" className={({ isActive }) => (isActive ? "active" : "")}>
                        <FaCalendarAlt /> Manage Schedule
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/clinic/manage-appointments" className={({ isActive }) => (isActive ? "active" : "")}>
                        <FaList /> Manage Appointments
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/clinic/manage-patients" className={({ isActive }) => (isActive ? "active" : "")}>
                        <FaUsers /> Manage Patients
                    </NavLink>
                </li>
            </ul>

            {/* My Profile & Logout in a Single Row */}
            <div className="profile-logout">
                <NavLink to="/clinic/profile" className={({ isActive }) => (isActive ? "active" : "")}>
                    <FaUser /> My Profile
                </NavLink>
                <button className="logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </div>
    );
};

export default ClinicSidebar;
