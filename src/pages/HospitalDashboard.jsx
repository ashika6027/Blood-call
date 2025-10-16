import React, { useState, useEffect } from "react";
import "./Style.css";

export default function HospitalDashboard() {
  const [group, setGroup] = useState("");
  const [filteredDonors, setFilteredDonors] = useState([]);

  const hospital = JSON.parse(localStorage.getItem("loggedIn"));
  const allDonors = JSON.parse(localStorage.getItem("donors") || "[]");
  const allRequests = JSON.parse(localStorage.getItem("requests") || "[]");

  useEffect(() => {
    // Show all donors by default
    setFilteredDonors(allDonors);
  }, []);

  const search = () => {
    if (!group) {
      setFilteredDonors(allDonors);
    } else {
      const filtered = allDonors.filter((d) => d.bloodGroup === group);
      setFilteredDonors(filtered);
    }
  };

  const sendRequest = (donor) => {
    const newReq = {
      donorEmail: donor.email,
      donorName: donor.name,
      hospitalEmail: hospital.email,
      hospitalName: hospital.name,
      bloodGroup: donor.bloodGroup,
      status: "pending",
      date: new Date().toISOString(),
    };
    const updatedRequests = [...allRequests, newReq];
    localStorage.setItem("requests", JSON.stringify(updatedRequests));
    alert("Request sent to donor!");
    search(); // Refresh the donor list
  };

  const getRequestDetails = (donorEmail) => {
    const req = allRequests.find(
      (r) =>
        r.donorEmail === donorEmail &&
        r.hospitalEmail === hospital.email &&
        (r.status === "pending" || r.status === "accepted")
    );
    return req;
  };

  return (
    <div className="home-fullscreen">
      <div className="form-card">
        <h2>Hospital Dashboard</h2>
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <select onChange={(e) => setGroup(e.target.value)} value={group}>
            <option value="">All Blood Groups</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="O+">O+</option>
            <option value="AB+">AB+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="O-">O-</option>
            <option value="AB-">AB-</option>
          </select>
          <button onClick={search} style={{ width: "80%" }}>
            Filter
          </button>
        </div>
        {filteredDonors.length > 0 ? (
          <div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.95rem",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f8bbd0", color: "#880e4f" }}>
                  <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Name
                  </th>
                  <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Email
                  </th>
                  <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Blood Group
                  </th>
                  <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Distance (km)
                  </th>
                  <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Status
                  </th>
                  <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Date
                  </th>
                  <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDonors.map((donor, index) => {
                  const req = getRequestDetails(donor.email);
                  return (
                    <tr key={index}>
                      <td style={{ padding: "8px", border: "1px solid #eee" }}>
                        {donor.name}
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #eee" }}>
                        {donor.email}
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #eee" }}>
                        {donor.bloodGroup}
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #eee" }}>
                        {donor.distance}
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          border: "1px solid #eee",
                          fontWeight: "bold",
                        }}
                      >
                        {req ? (
                          req.status === "accepted" ? (
                            <span style={{ color: "green" }}>✅ Accepted</span>
                          ) : (
                            <span style={{ color: "#ff9800" }}>⏳ Pending</span>
                          )
                        ) : (
                          "-"
                        )}
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #eee" }}>
                        {req ? new Date(req.date).toLocaleString() : "-"}
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #eee" }}>
                        {!req && (
                          <button
                            style={{
                              padding: "0.4rem 0.8rem",
                              background: "#d32f2f",
                              color: "white",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                            }}
                            onClick={() => sendRequest(donor)}
                          >
                            Send Request
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No donors found.</p>
        )}
      </div>
    </div>
  );
}
