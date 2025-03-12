import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const ClinicLogin = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ reference_id: "", password: "" });
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/clinic/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clinic_name: "CITI Clinic",
          reference_id: credentials.reference_id,
          password: credentials.password,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsAuthenticated(true);
        setMessage("Login successful! Redirecting...");
        navigate("/clinic/dashboard");
      } else {
        setMessage(data.message || "Invalid credentials!");
      }
    } catch (error) {
      setMessage("Error logging in. Please try again later.");
    }
  };

  return (
    <div className="auth-container fade-in">
      <h2 className="auth-title">Clinic Login</h2>
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter Reference ID"
          value={credentials.reference_id}
          onChange={(e) => setCredentials({ ...credentials, reference_id: e.target.value })}
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