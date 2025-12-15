import React from "react";
import "../styles/Home.css";               // ✅ correct path
import { useNavigate } from "react-router-dom";
import logo from "../assets/vitelogo.svg"; // ✅ correct Vite asset import

export default function Home() {
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

          <nav className="nav-links">
            <a href="#">Features</a>
            <a href="#">How It Works</a>
          </nav>

          <div className="nav-right">
            <button
              className="btn btn-outline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">Local Services, Instantly.</h1>
          <p className="hero-subtitle">
            Connect with skilled professionals or find clients in your
            neighborhood with Quick Serve.
          </p>
          <div className="hero-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/services")}
            >
              Find a Service
            </button>

            <button className="btn btn-outline">Offer a Service</button>
          </div>
        </div>
      </section>

      {/* CHOOSE YOUR PATH */}
      <section className="section">
        <div className="section-inner">
          <h2 className="section-title">Choose Your Path</h2>
          <p className="section-subtitle">
            Whether you're looking for help or offering your skills, we’ve got
            you covered.
          </p>

          <div className="path-grid">
            <div className="card">
              <div className="card-header">
                <div className="icon-circle">👤</div>
                <div className="card-title">For Customers</div>
              </div>
              <p className="card-body">
                Easily find and book verified professionals for any task — home
                repair, cleaning, tutoring, and more.
              </p>
              <div className="card-footer">
                <button className="btn btn-outline">Get Started</button>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="icon-circle">🛠️</div>
                <div className="card-title">For Professionals</div>
              </div>
              <p className="card-body">
                Reach new clients, manage bookings, and get paid securely. Grow
                your business the smart way.
              </p>
              <div className="card-footer">
                <button className="btn btn-outline">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <span>© 2024 Quick Serve. All rights reserved.</span>
          <div className="footer-links">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
