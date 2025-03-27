import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminprofile.css";

const Profile = () => {
  const navigate = useNavigate();

  // Static user data
  const [user] = useState({
    email: "admin@gmail.com",
    role: "Administrator",
  });

  return (
    <div className="profile-container fade-in">
      <h2 className="profile-title">Admin Profile</h2>
      <div className="profile-card">
        <p><strong>Admin</strong></p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Password:</strong> ******</p>
        <button className="btn" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default Profile;
