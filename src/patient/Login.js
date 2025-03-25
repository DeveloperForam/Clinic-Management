import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (loggedInUser && loggedInUser.role === "Patient") {
      navigate("/patient/home", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/patients/login", {
        email,
        password,
      });

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setMessage("Login successful!");
        
        setTimeout(() => {
          navigate("/patient/home", { replace: true });
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="auth-container fade-in">
      <h2 className="auth-title">Login</h2>
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
      <p className="switch-auth">
        Don't have an account? {" "}
        <span onClick={() => navigate("/patient/register")}>Register</span>
      </p>
    </div>
  );
};

export default Login;
