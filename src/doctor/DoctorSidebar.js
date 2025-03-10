import React from "react";
import { Link } from "react-router-dom";
import { FaUserInjured, FaCalendarAlt, FaClipboardList, FaUserMd, FaSignOutAlt } from "react-icons/fa";
import "./doctorSidebar.css"; // Separate CSS for sidebar

const DoctorSidebar = () => {
    return (
        <div className="doctor-sidebar">
            <h2>Doctor Panel</h2>
            <ul>
                <li>
                <Link to="/doctor/"> 

                        <FaUserInjured /> Dashboard
                </Link>
                </li>
                <li>
                    <Link to="/doctor/manage-patients">
                        <FaUserInjured /> Manage Patients
                    </Link>
                </li>
                <li>
                    <Link to="/doctor/manage-schedule">
                        <FaCalendarAlt /> Manage Schedule
                    </Link>
                </li>
                <li>
                    <Link to="/doctor/manage-appointments">
                        <FaClipboardList /> Manage Appointments
                    </Link>
                </li>
                <li>
                    <Link to="/doctor/profile">
                        <FaUserMd /> My Profile
                    </Link>
                </li>
                <li>
                    <Link to="/doctor/logout">
                        <FaSignOutAlt /> Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default DoctorSidebar;
