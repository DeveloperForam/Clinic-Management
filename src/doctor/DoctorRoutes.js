import React from "react";
import { useRoutes } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import DoctorSidebar from "./DoctorSidebar";
import DoctorDashboard from "./DoctorDashboard";
import ManagePatients from "./ManagePatients";
import ManageSchedule from "./ManageSchedule";
import ManageAppointments from "./ManageAppointments";
import DoctorProfile from "./DoctorProfile";
import DoctorLogout from "./DoctorLogout";

const DoctorRoutes = () => {
    const routes = useRoutes([
      { path: "/", element: <DoctorDashboard /> },
      { path: "manage-patients", element: <ManagePatients /> },
      { path: "manage-schedule", element: <ManageSchedule /> },
      { path: "manage-appointments", element: <ManageAppointments /> },
      { path: "profile", element: <DoctorProfile /> },
      { path: "logout", element: <DoctorLogout /> },
    ]);
  
    return (
      <div className="doctor-dashboard">
        <DoctorSidebar />
        <div className="doctor-content">{routes}</div>
      </div>
    );
  };

export default DoctorRoutes;
