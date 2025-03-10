import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle, FaSignOutAlt, FaHome, FaUserMd,
  FaCalendarCheck, FaInfoCircle, FaPhoneAlt, FaHospital, FaComments
} from "react-icons/fa";
import "../styles/navbar.css";
import hospitalLogo from "../assets/hospital_logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user"))); // Update user state
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("storage"));
      navigate("/patient/login", { replace: true });
      setTimeout(() => window.location.reload(), 500);
    }
    // localStorage.removeItem("user"); // Remove user from storage
    // setUser(null); // Update state to trigger re-render
    // navigate("/patient/login", { replace: true }); // Redirect to login
  };

  if (!user) return null; // If user is null, don't show navbar

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo-container">
        <img src={hospitalLogo} alt="Hospital Logo" className="hospital-logo" />
        <span className="logo-text">Clinic Care</span>
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li><Link to="/patient/home"><FaHome /> Home</Link></li>
        <li><Link to="/patient/clinics"><FaHospital /> Clinics</Link></li>
        <li><Link to="/patient/view-appointment"><FaCalendarCheck /> Appointments</Link></li>
        <li><Link to="/patient/chatbot"><FaComments /> Chatbot</Link></li>
        <li><Link to="/patient/about"><FaInfoCircle /> About</Link></li>
        <li><Link to="/patient/contacts"><FaPhoneAlt /> Contact</Link></li>
      </ul>

      {/* Profile & Logout Buttons */}
      <div className="nav-icons">
        <button className="dashboard-btn" onClick={() => navigate("/patient/profile")}>
          <FaUserCircle /> Profile
        </button>
        <button className="dashboard-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
