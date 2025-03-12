import "../styles/auth.css"; 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/admin/dashboard"); // Redirect to dashboard
      } else {
        setError(data.message || "Invalid Credentials!");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-container fade-in">
      <h1 className="auth-title">Admin Login</h1>
      
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        <button className="btn" type="submit">Login</button>
      </form>

      {error && <p className="message">{error}</p>}
    </div>
  );
};

export default AdminLogin;
