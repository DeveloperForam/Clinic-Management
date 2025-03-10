import "../styles/auth.css"; 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (credentials.email === "admin@example.com" && credentials.password === "admin123") {
      // ✅ Store admin authentication state
      localStorage.setItem("isAdminAuthenticated", "true");

      // ✅ Store admin details in localStorage
      const adminData = {
        email: credentials.email,
        password: credentials.password,  // Not recommended for real apps, but works for this test
        role: "Admin"
      };
      localStorage.setItem("user", JSON.stringify(adminData));

      navigate("/admin/dashboard"); // Redirect to dashboard
    } else {
      setError("Invalid Credentials!");
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
