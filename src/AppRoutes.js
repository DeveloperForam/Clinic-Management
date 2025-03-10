import React from "react";
import { Routes, Route } from "react-router-dom"; // ❌ No <Router> here
import SplashScreen from "./pages/SplashScreen";
import LandingPage from "./pages/LandingPage";
import AdminRoutes from "./admin/AdminRoutes";
import ClinicRoutes from "./clinic/ClinicRoutes";
import PatientRoutes from "./patient/PatientRoutes";
import AdminLogin from "./admin/AdminLogin";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/landing" element={<LandingPage />} />
      {/* Admin Routes */}
      {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
      <Route path="/admin/*" element={<AdminRoutes />} />
       
        {/* Clinic Routes */}
        {/* <Route path="/clinic/login" element={<ClinicLogin />} /> */}
        <Route path="/clinic/*" element={<ClinicRoutes />} />
       
      <Route path="/patient/*" element={<PatientRoutes />} />
    </Routes>
  );
};

export default AppRoutes;