import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/patients/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");
        setTimeout(() => {
          navigate("/patient/home", { replace: true });
        }, 1000);
      } else {
        setMessage(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/patients/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "nikita",
          birthdate: "2002-08-21",
          mobileno: "1234567880",
          address: "13 City Center, NYC",
          email: "nikita@gmail.com",
          gender: "Female",
          age: 24,
          status: "Active",
          password: "123456",
        }),
      });

      const data = await response.json();
      setMessage(response.ok ? "Registration successful!" : data.message || "Registration failed.");
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred during registration.");
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
        Don't have an account?{" "}
        <span onClick={handleRegister} style={{ cursor: "pointer", color: "blue" }}>
          Register
        </span>
      </p>
      {/* <button className="btn" onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default Login;
