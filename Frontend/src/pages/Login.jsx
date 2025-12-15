import React from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/vitelogo.svg";

export default function Login() {
  const navigate = useNavigate();

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

          <form>
            <div className="field">
              <label>Phone Number or Email</label>
              <input type="text" placeholder="Enter phone or email" />
            </div>

            <div className="field">
              <label>Password</label>
              <input type="password" placeholder="Enter password" />
            </div>

            <div className="forgot">Forgot password?</div>

            <button type="button" className="btn btn-primary login-btn" onClick={() => navigate("/service-provider/dashboard")}>
              Login
            </button>

            <p className="secondary">
              New User?{" "}
              <span onClick={() => navigate("/signup/customer")}>
                Create an account
              </span>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
