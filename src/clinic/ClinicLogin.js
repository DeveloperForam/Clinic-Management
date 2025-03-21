import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const ClinicLogin = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ clinic_name: "", reference_id: "", password: "" });
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
          clinic_name: credentials.clinic_name,
          reference_id: credentials.reference_id,
          password: credentials.password,
        }),
      });

      const data = await response.json();
      // const data = await response.json().catch(() => ({ message: "Invalid server response" }));

      
    //   if (response.message) {
    //     localStorage.setItem("token", data.token); // Save token for authenticated requests
    //     setMessage("Login successful! Redirecting...");
    //     navigate("/clinic/dashboard");
    // }
    // if (data.token) {
    //   localStorage.setItem("token", data.token); // Save token for authenticated requests
    //   setMessage("Login successful! Redirecting...");
    //   navigate("/clinic/dashboard");
    // }

    if (data.token) {
      localStorage.setItem("token", data.token); // Store token
      localStorage.setItem("clinicAuthenticated", "true"); // Store auth status
      setIsAuthenticated(true); // Update state
      setMessage("Login successful! Redirecting...");
      navigate("/clinic/dashboard");
    }
     else {
      setMessage(data.message || "Invalid credentials!");
    }
    
    
    //  else {
    //     setMessage(data.message || "Invalid credentials!");
    //   }

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
          placeholder="Enter Clinic Name"
          value={credentials.clinic_name}
          onChange={(e) => setCredentials({ ...credentials, clinic_name: e.target.value })}
          required
        />
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
