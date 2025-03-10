import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("isAdminAuthenticated");
      window.dispatchEvent(new Event("storage"));  // Force authentication update
      navigate("/admin/login");
    } else {
      navigate(-1); // Stay on the same page if user cancels
    }
  }, [navigate]);

  return null;
};

export default Logout;
