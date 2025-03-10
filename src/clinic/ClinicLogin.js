import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const ClinicLogin = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (credentials.email === "clinic@example.com" && credentials.password === "clinic123") {
      localStorage.setItem("clinicAuthenticated", "true");
      setIsAuthenticated(true);
      setMessage("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/clinic/dashboard");
      }, 1500);
    } else {
      setMessage("Invalid credentials!");
    }
  };

  return (
    <div className="auth-container fade-in">
      <h2 className="auth-title">Clinic Login</h2>
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
        <button type="submit" className="btn">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ClinicLogin;
