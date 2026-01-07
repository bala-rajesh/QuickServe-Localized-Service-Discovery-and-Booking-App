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
          <div className="nav-left" herf="/">
            <div className="logo-box">
              <img src={logo} alt="Quick Serve Logo" />
            </div>
            <span>Quick Serve</span>
          </div>

          <nav className="nav-links">
            <a href="#why-choose" onClick={(e) => { e.preventDefault(); document.getElementById('why-choose')?.scrollIntoView({ behavior: 'smooth' }); }}>Features</a>
            <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}>How It Works</a>
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
              onClick={() => navigate("/signup/customer")}
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
              onClick={() => navigate("/signup/customer")}
            >
              Find a Service
            </button>

            <button
              className="btn btn-outline"
              onClick={() => navigate("/signup/provider")}
            >
              Offer a Service
            </button>
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
                <button className="btn btn-outline" onClick={() => navigate("/signup/customer")}>Get Started</button>
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
                <button className="btn btn-outline" onClick={() => navigate("/signup/provider")}>Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how-it-works">
        <div className="section-inner">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            A simple, streamlined process to connect and get things done.
          </p>

          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-title">Search or Post</div>
              <p className="step-text">
                Customers find the service they need. Professionals post the services they offer.
              </p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-title">Connect & Book</div>
              <p className="step-text">
                Communicate directly, agree on terms, and book securely.
              </p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-title">Complete & Pay</div>
              <p className="step-text">
                Payment is handled securely and transparently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="section" id="why-choose">
        <div className="section-inner">
          <h2 className="section-title">Why Choose Quick Serve?</h2>
          <p className="section-subtitle">
            We build trust and efficiency into every interaction.
          </p>

          <div className="reasons-grid">
            <div className="reason">
              <div className="reason-icon">✔</div>
              <div className="reason-title">Verified Providers</div>
              <p className="reason-text">Every professional is screened.</p>
            </div>

            <div className="reason">
              <div className="reason-icon">⚡</div>
              <div className="reason-title">Instant Booking</div>
              <p className="reason-text">Book instantly with real-time availability.</p>
            </div>

            <div className="reason">
              <div className="reason-icon">💳</div>
              <div className="reason-title">Secure Payments</div>
              <p className="reason-text">All payments are encrypted.</p>
            </div>

            <div className="reason">
              <div className="reason-icon">📍</div>
              <div className="reason-title">Local Community</div>
              <p className="reason-text">Support local professionals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <span>© 2024 Quick Serve. All rights reserved.</span>
          <div className="footer-links">
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Terms of Service page coming soon!'); }}>Terms</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Privacy Policy page coming soon!'); }}>Privacy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = 'mailto:quickservemsg@gmail.com'; }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
