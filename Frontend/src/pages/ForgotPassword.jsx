import React, { useState } from "react";
import "../styles/Login.css"; // Reusing Login styles for consistency
import { useNavigate } from "react-router-dom";
import logo from "../assets/vitelogo.svg";
import AuthService from "../api/AuthService";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            const response = await AuthService.forgotPassword(email);
            setMessage(response.message || "Reset link sent to your email.");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper">
            <header className="navbar">
                <div className="nav-inner">
                    <div className="nav-left">
                        <div className="logo-box">
                            <img src={logo} alt="Quick Serve Logo" />
                        </div>
                        <span>Quick Serve</span>
                    </div>
                    <button className="btn btn-primary" onClick={() => navigate("/login")}>
                        Login
                    </button>
                </div>
            </header>

            <main className="page">
                <div className="card login-card">
                    <h2 className="card-title">Forgot Password</h2>
                    <p className="card-sub">
                        Enter your email address to receive a password reset link.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
                        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

                        <button
                            type="submit"
                            className="btn btn-primary login-btn"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
