import React from "react";
import "./Header.css";

import logo from "../assets/images/vite.svg";
import profilePic from "../assets/images/user_alex.png";

function Header({ currentView, onBookServiceClick, onLogoClick }) {
    return (
        <header className="qs-header">
            <div className="qs-header-container">
                {/* Left → Logo + Title */}
                <div className="qs-left" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
                    <img src={logo} alt="Logo" className="qs-logo" />
                    <h2 className="qs-title">QuickServe</h2>
                </div>

                {/* Right → Action Button + Profile */}
                <div className="qs-right">
                    {currentView !== 'booking' && (
                        <button
                            className="qs-book-btn"
                            onClick={() => onBookServiceClick("")}
                        >
                            Book a New Service
                        </button>
                    )}

                    <div className="qs-profile-wrapper">
                        <img
                            src={profilePic}
                            alt="User"
                            className="qs-profile-img"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;