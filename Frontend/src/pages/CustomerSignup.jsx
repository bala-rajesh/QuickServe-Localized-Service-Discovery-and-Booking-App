import React from "react";
import "../styles/CustomerSignup.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/vitelogo.svg";


export default function CustomerSignup() {
  const navigate = useNavigate();

  return (
    <div>

      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-inner">
          <div className="nav-left">
            <div className="logo-box">
              <img src={logo} alt="Quick Serve Logo" />
            </div>
            <span>Quick Serve</span>
          </div>

          <button className="btn-primary" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </header>

      {/* PAGE */}
      <main className="page">
        <div className="card">

          {/* ROLE SWITCH */}
          <div className="role-tabs">
            <button
              className="role-tab active"
            >
              Customer
            </button>

            <button
              className="role-tab"
              onClick={() => navigate("/provider-signup")}
            >
              Service Provider
            </button>
          </div>

          <h2 className="card-title">Customer Signup</h2>
          <p className="card-sub">Create your account to quickly book services near you.</p>

          <form>

            <div className="form-grid-2">
              <div className="field">
                <label>First Name *</label>
                <input type="text" placeholder="Rajkumar" />
              </div>

              <div className="field">
                <label>Last Name *</label>
                <input type="text" placeholder="Kothakota" />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="field">
                <label>Email *</label>
                <input type="email" placeholder="you@example.com" />
              </div>

              <div className="field">
                <label>Phone *</label>
                <input type="tel" placeholder="9876543210" />
              </div>
            </div>

            <div className="field">
              <label>Address *</label>
              <textarea placeholder="Street, House No., Landmark"></textarea>
            </div>

            <div className="form-grid-2">
              <div className="field">
                <label>City *</label>
                <input type="text" placeholder="Tirupati" />
              </div>

              <div className="field">
                <label>Pincode *</label>
                <input type="text" placeholder="517501" />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="field">
                <label>Password *</label>
                <input type="password" placeholder="Create password" />
              </div>

              <div className="field">
                <label>Confirm Password *</label>
                <input type="password" placeholder="Re-enter password" />
              </div>
            </div>

            <div className="actions">
              <button type="submit" className="btn-primary">
                Create Customer Account
              </button>

              <p className="secondary">
                Already have an account?{" "}
                <a onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
                  Login
                </a>
              </p>
            </div>

          </form>

        </div>
      </main>
    </div>
  );
}
