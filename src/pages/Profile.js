import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details from local storage (Dummy Data)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  return (
    <div className="profile-container fade-in">
      <h2 className="profile-title">My Profile</h2>
      {user ? (
        <div className="profile-card">
          <p><strong>Name: Nikita</strong> {user.name}</p>
          <p><strong>Email: nikita@gmail.com</strong> {user.email}</p>
          <p><strong>Mobile No.: 1231231230</strong> {user.mobile}</p>
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
