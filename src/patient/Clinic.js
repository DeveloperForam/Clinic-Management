import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/clinic.css";

const clinics = [
  { id: 1, name: "City Health Clinic", address: "123 Main St, City", contact: "9876543210", image: "/images/clinic1.jpg" },
  { id: 2, name: "Green Valley Hospital", address: "456 Elm St, Town", contact: "9123456780", image: "/images/clinic2.jpg" }
];

const doctors = {
  1: [
    { id: 1, name: "Dr. John Doe", specialty: "Cardiologist", image: "/images/doctor1.jpg" },
    { id: 2, name: "Dr. Sarah Smith", specialty: "Pediatrician", image: "/images/doctor2.jpg" }
  ],
  2: [
    { id: 3, name: "Dr. Jane Brown", specialty: "Dermatologist", image: "/images/doctor3.jpg" },
    { id: 4, name: "Dr. Mark Wilson", specialty: "Neurologist", image: "/images/doctor4.jpg" }
  ]
};

const Clinic = () => {
  const navigate = useNavigate();
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className={`clinic-container ${fadeIn ? "fade-in" : ""}`}>
      <h2>
        {selectedClinic ? `Doctors in ${clinics.find(c => c.id === selectedClinic).name}` : "Select a Clinic"}
      </h2>

      {!selectedClinic ? (
        <div className="clinic-list">
          {clinics.map((clinic) => (
            <div
              key={clinic.id}
              className="clinic-card"
              onClick={() => {
                setFadeIn(false);
                setTimeout(() => {
                  setSelectedClinic(clinic.id);
                  setFadeIn(true);
                }, 300);
              }}
            >
              <img src={clinic.image} alt={clinic.name} className="clinic-image" />
              <div className="clinic-info">
                <h3>{clinic.name}</h3>
                <p><strong>Address:</strong> {clinic.address}</p>
                <p><strong>Contact:</strong> {clinic.contact}</p>
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
              }, 300);
            }}
          >
            ← Back to Clinics
          </button>
          <div className="doctor-list">
            {doctors[selectedClinic].map((doc) => (
              <div key={doc.id} className="doctor-card" onClick={() => navigate(`/patient/doctors/${doc.id}`)}>
                <img src={doc.image} alt={doc.name} className="doctor-image" />
                <h3>{doc.name}</h3>
                <p>{doc.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Clinic;
