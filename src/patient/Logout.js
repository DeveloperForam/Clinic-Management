import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("user"); // Remove user session
      window.dispatchEvent(new Event("storage")); // Notify other components

      navigate("/patient/login", { replace: true }); // Redirect to login

      setTimeout(() => {
        window.location.reload(); // Ensure full state update
      }, 200);
    } else {
      navigate(-1); // Go back if user cancels logout
    }
  }, [navigate]);

  return (
    <div className="logout-message">
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
