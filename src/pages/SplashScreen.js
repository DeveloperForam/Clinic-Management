import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/splash.css"; // Ensure this file exists

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the Landing Page after 5 seconds
    const timer = setTimeout(() => {
      navigate("/landing");
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigate]);

  return (
    <div className="splash-container">
      <img src="/images/back1.png" alt="Clinic Logo" className="splash-logo" />
    </div>
  );
};

export default SplashScreen;
