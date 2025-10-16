import React, { useState } from "react";
import "./Style.css";

export default function RegisterUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bloodGroup: "",
    address: "",
    disease: "",
    distance: "",
    lastDonated: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("donors") || "[]");

    if (users.some((u) => u.email === form.email)) {
      alert("User already registered!");
      return;
    }

    users.push({ ...form, available: true });
    localStorage.setItem("donors", JSON.stringify(users));
    alert("Donor registered successfully!");
    setForm({
      name: "",
      email: "",
      password: "",
      bloodGroup: "",
      address: "",
      disease: "",
      distance: "",
      lastDonated: "",
    });
  };

  return (
    <div className="home-fullscreen">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>📝 Donor Registration</h2>
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <select name="bloodGroup" onChange={handleChange} required>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          <option value="O+">O+</option>
          <option value="AB+">AB+</option>
        </select>
        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
        />
        <input
          name="distance"
          type="number"
          placeholder="Distance from Hospital (km)"
          onChange={handleChange}
        />
        <input
          name="disease"
          placeholder="Any Disease (if any)"
          onChange={handleChange}
        />
        <button type="submit">Register as Donor</button>
      </form>
    </div>
  );
}
