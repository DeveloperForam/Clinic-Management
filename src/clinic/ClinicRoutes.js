import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ClinicLogin from "./ClinicLogin";
import ClinicDashboard from "./ClinicDashboard";
import ManageSchedule from "./ManageSchedule";
import ManageAppointments from "./ManageAppointments";
import ManagePatients from "./ManagePatients";
import Clinicprofile from "./Clinicprofile"; 
import Logout from "./Logout";
import ClinicSidebar from "./ClinicSidebar";

const ClinicRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("clinicAuthenticated") === "true"
  );
  const location = useLocation();

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("clinicAuthenticated") === "true");
  }, [location.pathname]);

  return (
    <div className="app-container">
      {isAuthenticated && location.pathname !== "/clinic/login" && <ClinicSidebar />}
      <div className="content">
        <Routes>
          <Route path="login" element={<ClinicLogin setIsAuthenticated={setIsAuthenticated} />} />
          {isAuthenticated ? (
            <>
            <Route path="login" element={<Navigate to="/clinic/dashboard" replace />} />
              <Route path="dashboard" element={<ClinicDashboard />} />
              <Route path="manage-schedule" element={<ManageSchedule />} />
              <Route path="manage-appointments" element={<ManageAppointments />} />
              <Route path="manage-patients" element={<ManagePatients />} />
              <Route path="profile" element={<Clinicprofile />} /> 
            </>
          ) : (
            <Route path="*" element={<Navigate to="/clinic/login" replace />} />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default ClinicRoutes;
