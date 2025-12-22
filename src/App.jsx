import { useState } from "react";
import ProfilePage from "./ProfilePage";

export default function App() {
  const [activePage, setActivePage] = useState("Profile");
  const [menuOpen, setMenuOpen] = useState(true); // toggle sidebar

  const menuItems = ["Home", "Profile", "Bookings", "Find Services"];

  return (
    <div className="app">
      {/* Sidebar / Hamburger Menu */}
      <div className={`sidebar ${menuOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
          <div className="logo">QuickServe</div>
        </div>
        <div className="menu-items">
          {menuItems.map((item) => (
            <div
              key={item}
              className={`menu-item ${activePage === item ? "active" : ""}`}
              onClick={() => setActivePage(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activePage === "Profile" && <ProfilePage />}
        {activePage === "Home" && <h2>Home Page Content</h2>}
        {activePage === "Bookings" && <h2>Bookings Page Content</h2>}
        {activePage === "Find Services" && <h2>Find Services Page Content</h2>}
      </div>
    </div>
  );
}
