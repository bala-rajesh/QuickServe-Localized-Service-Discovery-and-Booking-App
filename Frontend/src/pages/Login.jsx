import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/vitelogo.svg";
import { useAuth } from "../components/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { email, password } = formData;

    try {
      const data = await login(email, password);

      if (data.redirectUrl) {
        navigate(data.redirectUrl);
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-inner">
          <div className="nav-left">
            <div className="logo-box">
              <img src={logo} alt="Quick Serve Logo" />
            </div>
            <span>Quick Serve</span>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/signup/customer")}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* LOGIN CARD */}
      <main className="page">
        <div className="card login-card">
          <h2 className="card-title">Login</h2>
          <p className="card-sub">
            Login using your phone number or email and password.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="forgot">
              <span
                onClick={() => navigate("/forgot-password")}
                style={{ cursor: "pointer", color: "#2563eb" }}
              >
                Forgot password?
              </span>
            </div>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

            <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="secondary">
              New User?{" "}
              <span onClick={() => navigate("/signup/customer")} style={{ cursor: "pointer", color: "#2563eb" }}>
                Create an account
              </span>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
