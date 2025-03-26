import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/viewAppointments.css";

const ManageAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  // For filtering, you can match by doctor name or ID (depending on your backend).
  // Example: const doctorName = "Dr. Smith"; 
  // Then filter below using appt.doctor_name === doctorName if needed.
  const doctorId = "1"; // If your backend still uses doctorId, adapt accordingly

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/appointments");
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();

        // If your backend still has a doctorId, you can filter like this:
        // const doctorAppointments = data.filter((appt) => appt.doctorId === doctorId);
        // Otherwise, remove or adapt the filtering if you only have doctor_name
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="appointments-container fade-in">
      <h2>Your Scheduled Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Appointment Date</th>
              <th>Status</th>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={index}>
                <td>{new Date(appt.appointment_date).toLocaleDateString()}</td>
                <td>{appt.status}</td>
                <td>{appt.patient_name}</td>
                <td>{appt.doctor_name}</td>
                <td>
                  <button className="btn edit">Edit</button>
                  <button className="btn delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageAppointments;