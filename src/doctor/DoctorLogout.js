import { useNavigate } from "react-router-dom";

const DoctorLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("user");

    // Redirect to the landing page (usually the home page)
    navigate("/"); // This will redirect the user to the landing page (home page)
  };

  return (
    <div className="logout-container">
      <h2>Logout</h2>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DoctorLogout;
