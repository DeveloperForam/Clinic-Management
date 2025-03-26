import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/appointment.css";

const BookAppointment = () => {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [status, setStatus] = useState("Pending"); // Default status is "Pending"
  const [message, setMessage] = useState("");
  const [fadeMessage, setFadeMessage] = useState(false);

  // Handle appointment booking
  const handleBooking = (e) => {
    e.preventDefault();
    if (!patientName || !doctorName || !appointmentTime || !status) {
      showMessage("Please fill in all details.", "error");
      return;
    }

    // Check if the appointment slot is already taken
    let bookedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const isSlotTaken = bookedAppointments.some(
      (appt) => appt.appointmentTime === appointmentTime && appt.doctorName === doctorName
    );

    if (isSlotTaken) {
      showMessage("This time slot is already booked for the selected doctor.", "error");
      return;
    }

    // Save the appointment details
    bookedAppointments.push({ patientName, doctorName, appointmentTime, status });
    localStorage.setItem("appointments", JSON.stringify(bookedAppointments));

    showMessage("Appointment booked successfully!", "success");
    setTimeout(() => navigate("/patient/view-appointment"), 2000);
  };

  // Display messages with fade effect
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setFadeMessage(true);
    setTimeout(() => setFadeMessage(false), 3000);
  };

  return (
    <div className="appointment-container">
      <h2>Book an Appointment</h2>
      <form className="appointment-form" onSubmit={handleBooking}>
        <div>
          <label htmlFor="patientName">Patient Name:</label>
          <input
            type="text"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="doctorName">Doctor Name:</label>
          <input
            type="text"
            id="doctorName"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="appointmentTime">Appointment Time:</label>
          <input
            type="datetime-local"
            id="appointmentTime"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <button type="submit" className="btn">Book Appointment</button>
      </form>

      {message && (
        <p className={`message ${message.type} ${fadeMessage ? "fade-in" : ""}`}>
          {message.text}
        </p>
      )}
    </div>
  );
};

export default BookAppointment;
