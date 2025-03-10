import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("clinicAuthenticated");
      window.dispatchEvent(new Event("storage")); // 🔹 Force authentication update
      navigate("/clinic/login");
    } else {
      navigate(-1); // Go back if user cancels
    }
  }, [navigate]);

  return null;
};

export default Logout;
