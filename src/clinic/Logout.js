import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    
    if (confirmLogout) {
      fetch("http://localhost:5000/api/clinic/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies if needed
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Logout failed");
          }
          localStorage.removeItem("clinicAuthenticated");
          window.dispatchEvent(new Event("storage")); // 🔹 Force authentication update
          navigate("/clinic/login");
        })
        .catch((error) => {
          console.error("Logout error:", error);
          alert("Logout failed. Please try again.");
        });
    } else {
      navigate(-1); // Go back if user cancels
    }
  }, [navigate]);

  return null;
};

export default Logout;
