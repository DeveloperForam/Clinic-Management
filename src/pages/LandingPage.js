import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFade(true);
    }, 500);
  }, []);

  const handlePatientClick = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "Patient") {
      navigate("/patient/home"); // Redirect to Patient Home if already logged in
    } else {
      navigate("/patient/login"); // Otherwise, go to Login
    }
  };

  return (
    <div className={`landing-container ${fade ? "fade-in" : ""}`}>
      <h1>Welcome to Clinic Care</h1>
      <div className="role-selection">
        <button onClick={() => navigate("/admin/login")} className="role-btn">Admin</button>
        <button onClick={() => navigate("/clinic/login")} className="role-btn">Clinic</button>
        <button onClick={handlePatientClick} className="role-btn">Patient</button>
      </div>
    </div>
  );
};

export default LandingPage;
