import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/Style.css";

export default function Navbar() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedIn"));

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  const isDonor = loggedInUser?.bloodGroup !== undefined; // crude check

  return (
    <nav className="navbar">
      {!loggedInUser ? (
        <>
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/register-user">
            Donor Register
          </Link>
          <Link className="nav-link" to="/register-hospital">
            Hospital Register
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </>
      ) : (
        <>
          <Link
            className="nav-link"
            to={isDonor ? "/donor-dashboard" : "/hospital-dashboard"}
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.1rem",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
