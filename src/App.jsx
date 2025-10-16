import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegisterUser from "./pages/RegisterUser";
import RegisterHospital from "./pages/RegisterHospital";
import Login from "./pages/Login";
import HospitalDashboard from "./pages/HospitalDashboard";
import DonorDashboard from "./pages/DonorDashboard";
import Layout from "./pages/Layout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register-user" element={<RegisterUser />} />
          <Route path="register-hospital" element={<RegisterHospital />} />
          <Route path="login" element={<Login />} />
          <Route path="hospital-dashboard" element={<HospitalDashboard />} />
          <Route path="donor-dashboard" element={<DonorDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
