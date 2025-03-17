import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Clinic from "./Clinic";
import DoctorDetails from "./DoctorDetails";
import About from "./About";
import Contacts from "./DoctorContact";
import Logout from "./Logout";
import Profile from "../pages/Profile";
import ViewAppointments from "./ViewAppointments";
import Chatbot from "./Chatbot";
import Login from "./Login";
import Register from "./Register";

const PatientRoutes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
      if (!updatedUser) navigate("/patient/login", { replace: true });
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate]);

  useEffect(() => {
    if (!user) {
      navigate("/patient/login", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div>
      {user && <Navbar />}
      <Routes>
        {!user ? (
          <>
            <Route path="login" element={<Login />} />
            <Route path="patient/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/patient/register" replace />} />
          </>
        ) : (
          <>
            <Route path="home" element={<Home />} />
            <Route path="clinics" element={<Clinic />} />
            <Route path="doctors/:id" element={<DoctorDetails />} />
            <Route path="view-appointment" element={<ViewAppointments />} />
            <Route path="chatbot" element={<Chatbot />} />
            <Route path="about" element={<About />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="profile" element={<Profile />} />
            <Route path="logout" element={<Logout />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default PatientRoutes;
