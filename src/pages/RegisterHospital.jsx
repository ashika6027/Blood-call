import React, { useState } from "react";
import "./Style.css";

export default function RegisterHospital() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const hospitals = JSON.parse(localStorage.getItem("hospitals") || "[]");

    if (hospitals.some((h) => h.email === form.email)) {
      alert("Hospital already registered!");
      return;
    }

    hospitals.push(form);
    localStorage.setItem("hospitals", JSON.stringify(hospitals));
    alert("Hospital registered successfully!");
    setForm({ name: "", email: "", password: "", address: "" });
  };

  return (
    <div className="home-fullscreen">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>🏥 Hospital Registration</h2>
        <input
          name="name"
          placeholder="Hospital Name"
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
        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
        />
        <button type="submit">Register Hospital</button>
      </form>
    </div>
  );
}
