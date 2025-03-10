import React, { useState } from "react";
import "../styles/dashboard.css";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, patient: "John Doe", date: "2025-03-10", time: "10:30 AM" },
    { id: 2, patient: "Jane Smith", date: "2025-03-12", time: "1:00 PM" },
  ]);

  const [newPatient, setNewPatient] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const addAppointment = () => {
    if (newPatient && newDate && newTime) {
      const newAppointment = {
        id: appointments.length + 1,
        patient: newPatient,
        date: newDate,
        time: newTime,
      };
      setAppointments([...appointments, newAppointment]);
      setNewPatient("");
      setNewDate("");
      setNewTime("");
      alert("Doctor has been notified of the new appointment.");
    }
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  const updateAppointment = (id) => {
    const updatedDate = prompt("Enter new date (YYYY-MM-DD):");
    const updatedTime = prompt("Enter new time (e.g., 10:00 AM):");
    if (updatedDate && updatedTime) {
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === id
            ? { ...appointment, date: updatedDate, time: updatedTime }
            : appointment
        )
      );
      alert("Doctor has been notified of the update.");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Manage Appointments</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.patient}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>
                <button onClick={() => updateAppointment(appointment.id)}>Edit</button>
                <button onClick={() => deleteAppointment(appointment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="dashboard-content">
        <h3>Add New Appointment</h3>
        <input
          type="text"
          placeholder="Patient Name"
          value={newPatient}
          onChange={(e) => setNewPatient(e.target.value)}
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
        <button onClick={addAppointment} className="dashboard-btn">
          Add Appointment
        </button>
      </div>
    </div>
  );
};

export default ManageAppointments;