import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import LandingPage from "./pages/LandingPage";
import AdminRoutes from "./admin/AdminRoutes";
import ClinicRoutes from "./clinic/ClinicRoutes";
import PatientRoutes from "./patient/PatientRoutes";
import Login from "./auth/Login";
import Register from "./auth/Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/landing" element={<LandingPage />} />
      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      
      {/* Clinic Routes */}
      <Route path="/clinic/*" element={<ClinicRoutes />} />
      <Route path="/clinic/*" element={<ClinicRoutes />} />
      
      {/* Patient Routes */}
      <Route path="/patient/login" element={<Login />} />
      <Route path="/patient/register" element={<Register />} />
      <Route path="/patient/*" element={<PatientRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
