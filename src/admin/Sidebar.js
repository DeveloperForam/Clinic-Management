import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  FaTachometerAlt, FaClinicMedical, FaUserMd, 
  FaUsers, FaUserCircle, FaSignOutAlt 
} from "react-icons/fa"; 
import "../styles/sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("clinicAuthenticated");
      window.dispatchEvent(new Event("storage")); // Ensure state updates
      navigate("/admin/login");
  }
    // localStorage.removeItem("isAdminAuthenticated");
    // localStorage.removeItem("user"); // Remove user details
    // navigate("/admin/login"); // Redirect to login page
  };

  return (
    <nav className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>

      <ul>
        <li>
          <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaTachometerAlt /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/manage-clinics" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaClinicMedical /> Manage Clinics
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/manage-doctors" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaUserMd /> Manage Doctors
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/manage-patients" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaUsers /> Manage Patients
          </NavLink>
        </li>

        {/* Profile & Logout Buttons */}
        <li>
          <div className="nav-icons">
            {/* Profile Button */}
            <button className="dashboard-btn" onClick={() => navigate("/admin/profile")}>
              <FaUserCircle /> Profile
            </button>
            
            {/* Logout Button */}
            <button className="dashboard-btn logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
