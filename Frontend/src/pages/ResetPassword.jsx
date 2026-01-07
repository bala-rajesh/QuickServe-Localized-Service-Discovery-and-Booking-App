import React, { useState } from "react";
import "../styles/Login.css"; // Reusing Login styles
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/vitelogo.svg";
import AuthService from "../api/AuthService";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (formData.newPassword !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!token) {
            setError("Invalid or missing token.");
            return;
        }

        setLoading(true);

        try {
            const response = await AuthService.resetPassword(token, formData.newPassword);
            setMessage(response.message || "Password reset successfully!");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
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
                </div>
            </header>

            <main className="page">
                <div className="card login-card">
                    <h2 className="card-title">Reset Password</h2>
                    <p className="card-sub">Enter your new password below.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label>New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="New Password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="field">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
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
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
