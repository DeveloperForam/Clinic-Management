import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import ManageClinics from "./ManageClinics";
import ManageDoctors from "./ManageDoctors";
import ManagePatients from "./ManagePatient";
import Profile from "./Profile";
import Sidebar from "./Sidebar";

const AdminRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAdminAuthenticated") === "true"
  );
  const location = useLocation();

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(localStorage.getItem("isAdminAuthenticated") === "true");
    };

    window.addEventListener("storage", handleAuthChange);
    return () => {
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAdminAuthenticated") === "true");
  }, [location.pathname]);

  const isLoginPage = location.pathname === "/admin/login"; // ✅ Check if current page is login

  return (
    <div className="app-container">
      {/* ✅ Only show Sidebar if admin is authenticated & NOT on the login page */}
      {isAuthenticated && !isLoginPage && <Sidebar />}  

      <div className={isLoginPage ? "full-width-content" : "content"}>
        <Routes>
          <Route path="login" element={<AdminLogin />} />
          {isAuthenticated ? (
            <>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="manage-clinics" element={<ManageClinics />} />
              <Route path="manage-doctors" element={<ManageDoctors />} />
              <Route path="manage-patients" element={<ManagePatients />} />
              <Route path="profile" element={<Profile />} />  {/* ✅ Profile Route */}
              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/admin/login" replace />} />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default AdminRoutes;
