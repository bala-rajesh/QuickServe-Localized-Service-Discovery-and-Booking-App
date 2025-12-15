import React from "react";
import "./Header.css";

// Using your existing images
import logo from "../assets/images/vite.svg";
import profilePic from "../assets/images/user_alex.png";

function Header({
    currentView,
    onBookServiceClick,
    onServicesClick,
    onMessagesClick,
    onProfileClick,
}) {
    return (
        <header className="qs-header">
            
            {/* Left → Logo + Title */}
            <div className="qs-left">
                <img src={logo} alt="Logo" className="qs-logo" />
                <h2 className="qs-title">QuickServe</h2>
            </div>

            {/* Center → Nav Links */}
            <nav className="qs-nav">
                <span
                    className={currentView === "services" ? "active" : ""}
                    onClick={onServicesClick}
                >
                    Find Services
                </span>

                <span
                    className={currentView === "messages" ? "active" : ""}
                    onClick={onMessagesClick}
                >
                    Messages
                </span>

                <span
                    className={currentView === "profile" ? "active" : ""}
                    onClick={onProfileClick}
                >
                    Profile
                </span>
            </nav>

            {/* Right → Button + Profile */}
            <div className="qs-right">
                <button
                    className="qs-book-btn"
                    onClick={() => onBookServiceClick("")}
                >
                    Book a New Service
                </button>

                <img
                    src={profilePic}
                    alt="User"
                    className="qs-profile-img"
                />
            </div>
        </header>
    );
}

export default Header;
