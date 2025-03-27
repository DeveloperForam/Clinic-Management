import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/viewAppointments.css";

const ManageAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/appointments/list");
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
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
              <th>Sr No.</th>
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
                <td>{index + 1}</td>
                <td>{new Date(appt.date).toLocaleDateString()}</td>
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
