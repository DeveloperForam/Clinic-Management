import React, { useState } from "react";
import "../styles/profile.css";

const DoctorProfile = () => {
  const doctor = {
    name: "Dr. John Doe",
    email: "johndoe@example.com",
    specialty: "Cardiology",
    clinic: "City Health Clinic",
  };

  const [patients, setPatients] = useState([
    { id: 1, name: "John Smith", age: 45, condition: "Hypertension" },
    { id: 2, name: "Emily Davis", age: 32, condition: "Diabetes" },
  ]);

  return (
    <div className="profile-container">
      <h2>Doctor Profile</h2>
      <p><strong>Name:</strong> {doctor.name}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Specialty:</strong> {doctor.specialty}</p>
      <p><strong>Clinic:</strong> {doctor.clinic}</p>

      <h3>Patient List</h3>
      <table className="profile-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Condition</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorProfile;