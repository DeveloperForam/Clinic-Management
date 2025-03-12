import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // 🔹 Input validation: Ensure fields are not empty
    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage("All fields are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((u) => u.email === email);

    if (userExists) {
      setMessage("User already exists. Please login.");
      return;
    }

    const newUser = { name, email, password, role: "Patient" };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    setMessage("Registration successful! Redirecting...");
    
    setTimeout(() => {
      navigate("/patient/login");
    }, 1000);
  };

  return (
    <div className="auth-container fade-in">
      <h2 className="auth-title">Register</h2>
      <form className="auth-form" onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Full Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="btn">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
      
      {/* 🔹 Improved navigation to Login page */}
      <p className="switch-auth">
        Already have an account?{" "}
        <span 
          onClick={() => navigate("/patient/login")}
          style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;