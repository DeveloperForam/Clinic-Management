import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/viewAppointments.css";

const ViewAppointmentts = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const doctorId = "1"; // Assume logged-in doctor ID (replace with real authentication later)

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const doctorAppointments = storedAppointments.filter((appt) => appt.doctorId === doctorId);
    setAppointments(doctorAppointments);
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
              <th>Date</th>
              <th>Time</th>
              <th>Patient</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={index}>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>Anonymous Patient</td>
                <td>
              <button className="btn edit">Edit</button>
              <button className="btn delete">Delete</button>
            </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="btn" onClick={() => navigate("/doctor/dashboard")}>Back to Dashboard</button>
    </div>
  );
};

export default ViewAppointmentts;
