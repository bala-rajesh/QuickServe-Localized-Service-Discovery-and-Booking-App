import React, { useState } from "react";
import "../styles/ProviderSignup.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/vitelogo.svg";
import AuthService from "../api/AuthService";

export default function ProviderSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    fullName: "",
    email: "",
    phone: "",
    category: "",
    pincode: "",
    address: "",
    bioShort: "",
    about: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const { confirmPassword, ...signupData } = formData;
      const response = await AuthService.registerProvider(signupData);

      // Navigate to email verification page with email
      navigate("/verify-email", { state: { email: response.email || formData.email } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

          <form onSubmit={handleSubmit}>

            <div className="form-grid-2">
              <div className="field">
                <label>Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  placeholder="XYZ Plumbing"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Personal Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="field">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="xyz@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Phone *</label>
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

            <div className="form-grid-2">
              <div className="field">
                <label>Service Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">Select Category</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Appliance Repair">Appliance Repair</option>
                </select>
              </div>

              <div className="field">
                <label>Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="110001"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>Service Address *</label>
              <input
                type="text"
                name="address"
                placeholder="Your business address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Short Bio</label>
              <input
                type="text"
                name="bioShort"
                placeholder="24/7 Reliable Service"
                value={formData.bioShort}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>About Me</label>
              <textarea
                name="about"
                placeholder="Write about your professional experience..."
                value={formData.about}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-grid-2">
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
            </div>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

            <div className="actions">
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? "Creating Account..." : "Create Provider Account"}
              </button>

              <p className="secondary">
                Already have an account?{" "}
                <a onClick={() => navigate("/login")} style={{ cursor: "pointer", color: "#2563eb" }}>
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
