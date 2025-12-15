import React from "react";
import "../styles/ProviderSignup.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/vitelogo.svg";



export default function ProviderSignup() {
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

      {/* PAGE CONTENT */}
      <main className="page">
        <div className="card">

          {/* ROLE TABS */}
          <div className="role-tabs">
            <button
              className="role-tab"
              onClick={() => navigate("/signup/customer")}
            >
              Customer
            </button>

            <button
              className="role-tab active"
            >
              Service Provider
            </button>
          </div>

          <h2 className="card-title">Service Provider Signup</h2>
          <p className="card-sub">
            Create your professional profile so customers can find and book your services.
          </p>

          <form>

            <div className="form-grid-2">
              <div className="field">
                <label>Business Name *</label>
                <input type="text" placeholder="XYZ Plumbing" />
              </div>

              <div className="field">
                <label>Personal Name *</label>
                <input type="text" placeholder="XYZ" />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="field">
                <label>Email *</label>
                <input type="email" placeholder="xyz@email.com" />
              </div>

              <div className="field">
                <label>Phone *</label>
                <input type="tel" placeholder="9876543210" />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="field">
                <label>Service Category *</label>
                <select>
                  <option value="">Select Category</option>
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>Cleaning</option>
                  <option>Appliance Repair</option>
                </select>
              </div>

              <div className="field">
                <label>Pincode *</label>
                <input type="text" placeholder="110001" />
              </div>
            </div>

            <div className="field">
              <label>Service Address *</label>
              <input type="text" placeholder="Hyderabad, India" />
            </div>

            <div className="field">
              <label>Short Bio</label>
              <input type="text" placeholder="24/7 Reliable Service" />
            </div>

            <div className="field">
              <label>About Me</label>
              <textarea placeholder="Write about your professional experience..."></textarea>
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
              <button className="btn-primary" type="submit" onClick={() => navigate("/service-provider/dashboard")}>
                Create Provider Account
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
