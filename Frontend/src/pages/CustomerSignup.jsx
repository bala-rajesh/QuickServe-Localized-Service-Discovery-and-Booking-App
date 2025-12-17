import React, { useState } from "react";
import "../styles/CustomerSignup.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/vitelogo.svg";
import AuthService from "../api/AuthService";


export default function CustomerSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    try {
      // Exclude confirmPassword from the payload
      const { confirmPassword, ...signupData } = formData;

      await AuthService.registerCustomer(signupData);

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>

      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-inner">
          <div className="nav-left" herf="/">
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
              onClick={() => navigate("/signup/customer")}
            >
              Customer
            </button>

            <button
              className="role-tab"
              onClick={() => navigate("/signup/provider")}
            >
              Service Provider
            </button>
          </div>

          <h2 className="card-title">Customer Signup</h2>
          <p className="card-sub">Create your account to quickly book services near you.</p>

          <form onSubmit={handleSubmit}>

            <div className="field">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                placeholder="XYZ"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-grid-2">
              <div className="field">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Mobile No *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>Address *</label>
              <textarea
                name="address"
                placeholder="Street, House No., Landmark"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-grid-2">
              <div className="field">
                <label>Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="517501"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

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
