import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminprofile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/admin/login"); // Redirect if user not found
    }
  }, [navigate]);

  return (
    <div className="profile-container fade-in">
      <h2 className="profile-title">Admin Profile</h2>
      {user ? (
        <div className="profile-card">
          <p><strong>Admin</strong></p>
          <p><strong>Email: admin@gmail.com</strong> {user.email}</p>
          <p><strong>Password: ******</strong></p>
          {/* <p><strong>Role:</strong> {user.role}</p> */}
          <button className="btn" onClick={() => navigate(-1)}>Back</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
