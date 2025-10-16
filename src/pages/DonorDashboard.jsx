import React, { useEffect, useState } from "react";
import "./Style.css";

export default function DonorDashboard() {
  const [donor, setDonor] = useState(
    JSON.parse(localStorage.getItem("loggedIn"))
  );
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const allRequests = JSON.parse(localStorage.getItem("requests") || "[]");
    const pending = allRequests.filter(
      (r) => r.donorEmail === donor.email && r.status === "pending"
    );
    setRequests(pending);
  }, [donor.email]);

  const acceptRequest = (req) => {
    // 1. Mark donor as unavailable and save donation date
    const allDonors = JSON.parse(localStorage.getItem("donors") || "[]");
    const updatedDonors = allDonors.map((d) =>
      d.email === donor.email
        ? { ...d, available: false, donationDate: new Date().toISOString() }
        : d
    );
    localStorage.setItem("donors", JSON.stringify(updatedDonors));

    // 2. Update loggedIn donor too
    const updatedDonor = {
      ...donor,
      available: false,
      donationDate: new Date().toISOString(),
    };
    setDonor(updatedDonor);
    localStorage.setItem("loggedIn", JSON.stringify(updatedDonor));

    // 3. Mark request as accepted
    const allRequests = JSON.parse(localStorage.getItem("requests") || "[]");
    const updatedRequests = allRequests.map((r) =>
      r.donorEmail === req.donorEmail &&
      r.hospitalEmail === req.hospitalEmail &&
      r.status === "pending"
        ? { ...r, status: "accepted" }
        : r
    );
    localStorage.setItem("requests", JSON.stringify(updatedRequests));
    setRequests([]);
    alert("Request accepted. You are now unavailable for 90 days.");
  };

  return (
    <div className="home-fullscreen">
      <div className="form-card">
        <h2>Welcome, {donor?.name}</h2>
        <p>
          <strong>Email:</strong> {donor?.email}
        </p>
        <p>
          <strong>Blood Group:</strong> {donor?.bloodGroup}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {donor?.available ? "✅ Available" : "❌ Not Available"}
        </p>

        {requests.length > 0 && (
          <>
            <h3 style={{ marginTop: "2rem" }}>Incoming Requests</h3>
            <ul>
              {requests.map((r, i) => (
                <li key={i} style={{ marginBottom: "1rem" }}>
                  <strong>{r.hospitalName}</strong> needs your blood group:{" "}
                  {r.bloodGroup}
                  <button
                    style={{
                      marginLeft: "1rem",
                      padding: "0.4rem 0.8rem",
                      background: "#2e7d32",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                    onClick={() => acceptRequest(r)}
                  >
                    Accept
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
