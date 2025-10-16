import React from "react";
import "./Style.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-fullscreen">
      <div className="home-header">
        <h1>🩸 BloodCall</h1>
        <h2>Your Smart Blood Donation Platform</h2>
        <p>
          Welcome to <strong>BloodCall</strong> — the bridge between lifesaving
          donors and hospitals in need.
        </p>
        <ul>
          <li>👨‍⚕️ Register as a donor and help save lives</li>
          <li>🏥 Hospitals can broadcast urgent blood requirements</li>
          <li>📱 Get notified instantly when your blood group is needed</li>
          <li>⏱️ Manage eligibility (90-day donation cycle)</li>
        </ul>
      </div>

      <div className="home-cards">
        <Link to="/register-user" className="home-card">
          <h3>📝 Become a Donor</h3>
          <p>Join the donor network and save lives near you.</p>
        </Link>

        <Link to="/register-hospital" className="home-card">
          <h3>🏥 Register Hospital</h3>
          <p>Connect with potential donors in real-time.</p>
        </Link>

        <Link to="/login" className="home-card">
          <h3>🔐 Login</h3>
          <p>Access your dashboard and manage your requests.</p>
        </Link>
      </div>
    </div>
  );
}
