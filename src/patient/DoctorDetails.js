import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/doctor.css";

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/doctor/list/${id}`) // Corrected the template literal syntax
      .then((response) => response.json())
      .then((data) => setDoctor(data))
      .catch((error) => console.error("Error fetching doctor details:", error));
  }, [id]);

  return (
    <div className="doctor-details-container">
      {doctor ? (
        <div className="doctor-info">
          <h1>{doctor.name}</h1>
          <p><strong>Specialty:</strong> {doctor.specialization}</p>
          <p><strong>Experience:</strong> {doctor.experience} years</p>
          <p><strong>Contact:</strong> {doctor.mobile_no}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Address:</strong> {doctor.address}</p>
        </div>
      ) : (
        <p>Loading doctor details...</p>
      )}
    </div>
  );
};

export default DoctorDetails;
