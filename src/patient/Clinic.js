import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/clinic.css";

const Clinic = () => {
  const navigate = useNavigate();
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    fetch("http://localhost:5000/api/clinic", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setClinics(data))
      .catch((error) => console.error("Error fetching clinics:", error));
  }, []);

  useEffect(() => {
    if (selectedClinic) {
      fetch(`http://localhost:5000/api/doctor/list/${clinic_id}`, {
        // fetch(`http://localhost:5000/api/doctor/clinic-wise`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setDoctors(data))
        .catch((error) => console.error("Error fetching doctors:", error));
    }
  }, [selectedClinic]);

  return (
    <div className={`clinic-container ${fadeIn ? "fade-in" : ""}`}>
      <h2>
        {selectedClinic
          ? `Doctors in ${clinics.find((c) => c.id === selectedClinic)?.clinic_name}`
          : "Select a Clinic"}
      </h2>

      {!selectedClinic ? (
        <div className="clinic-list">
          {clinics.map((clinic, index) => (
            <div
              key={clinic.id || index} // Ensure unique key
              className="clinic-card"
              onClick={() => {
                setFadeIn(false);
                setTimeout(() => {
                  setSelectedClinic(clinic.id);
                  setFadeIn(true);
                }, 300);
              }}
            >
              <div className="clinic-info">
                <h3>{clinic.clinic_name}</h3>
                <p>
                  <strong>Address:</strong> {clinic.address}
                </p>
                <p>
                  <strong>Contact:</strong> {clinic.mobile_no}
                </p>
                <p>
                  <strong>Email:</strong> {clinic.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            className="back-btn"
            onClick={() => {
              setFadeIn(false);
              setTimeout(() => {
                setSelectedClinic(null);
                setFadeIn(true);
                setDoctors([]);
              }, 300);
            }}
          >
            ← Back to Clinics
          </button>
          <div className="doctor-list">
            {doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <div key={doctor.id || index} className="doctor-card">
                  <h3>{doctor.name}</h3>
                  <p>
                    <strong>Clinic:</strong> {doctor.clinic_name}
                  </p>
                  <p>
                    <strong>Email:</strong> {doctor.email}
                  </p>
                  <p>
                    <strong>Mobile No:</strong> {doctor.mobile_no}
                  </p>
                  <p>
                    <strong>Specialization:</strong> {doctor.specialization}
                  </p>
                  <p>
                    <strong>Experience:</strong> {doctor.experience} years
                  </p>
                  <p>
                    <strong>Gender:</strong> {doctor.gender}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {doctor.dob}
                  </p>
                  <p>
                    <strong>Address:</strong> {doctor.address}
                  </p>
                </div>
              ))
            ) : (
              <p>No doctors found for this clinic.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Clinic;
