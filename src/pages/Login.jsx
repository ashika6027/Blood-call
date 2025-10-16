import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("donor");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const key = type === "donor" ? "donors" : "hospitals";
    const users = JSON.parse(localStorage.getItem(key) || "[]");

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedIn", JSON.stringify(user));
      navigate(type === "donor" ? "/donor-dashboard" : "/hospital-dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="home-fullscreen">
      <div className="form-card">
        <h2>🔐 Login</h2>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="donor">Donor</option>
          <option value="hospital">Hospital</option>
        </select>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </div>
    </div>
  );
}
