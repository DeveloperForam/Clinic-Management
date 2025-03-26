import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert(data.message);

      if (data.success) {
        setTimeout(() => navigate("/patient/login"), 500); // ✅ Prevents instant re-renders
      }
    } catch (error) {
      console.error("Register error:", error);
      alert(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Patient Registration</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{" "}
        <span className="auth-link" onClick={() => navigate("/patient/login")}>Login here</span>
      </p>
    </div>
  );
};

export default Register;