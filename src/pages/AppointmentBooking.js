import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/appointment.css";

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [message, setMessage] = useState("");

  // Dummy doctor data with working hours
  useEffect(() => {
    const dummyDoctors = [
      { id: 1, name: "Dr. John Doe", startTime: "16:00", endTime: "18:00", slotDuration: 15 },
      { id: 2, name: "Dr. Jane Smith", startTime: "10:00", endTime: "12:00", slotDuration: 20 },
    ];
    setDoctors(dummyDoctors);
  }, []);

  // Generate available time slots
  const generateTimeSlots = (doctor) => {
    let slots = [];
    let start = new Date(`2022-01-01T${doctor.startTime}`);
    let end = new Date(`2022-01-01T${doctor.endTime}`);

    while (start < end) {
      slots.push(start.toTimeString().substring(0, 5)); // Format HH:MM
      start.setMinutes(start.getMinutes() + doctor.slotDuration);
    }
    return slots;
  };

  // Handle doctor selection
  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    setSelectedDoctor(doctorId);
    setTime("");
    if (doctorId) {
      const doctor = doctors.find((doc) => doc.id.toString() === doctorId);
      setAvailableSlots(generateTimeSlots(doctor));
    } else {
      setAvailableSlots([]);
    }
  };

  // Handle appointment booking
  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedDoctor || !date || !time) {
      setMessage("Please fill in all details.");
      return;
    }

    // Store booked appointment
    let bookedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const isSlotTaken = bookedAppointments.some(
      (appt) => appt.date === date && appt.time === time && appt.doctorId === selectedDoctor
    );

    if (isSlotTaken) {
      setMessage("This time slot is already booked. Please select another slot.");
      return;
    }

    bookedAppointments.push({ doctorId: selectedDoctor, date, time });
    localStorage.setItem("appointments", JSON.stringify(bookedAppointments));
    
    setMessage("Appointment booked successfully!");
    setTimeout(() => navigate("/patient/view-appointments"), 1500);
  };

  return (
    <div className="appointment-container fade-in">
      <h2>Book an Appointment</h2>
      <form className="appointment-form" onSubmit={handleBooking}>
        <select value={selectedDoctor} onChange={handleDoctorChange} required>
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>{doc.name}</option>
          ))}
        </select>

        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <select value={time} onChange={(e) => setTime(e.target.value)} required>
          <option value="">Select Time Slot</option>
          {availableSlots.map((slot, index) => (
            <option key={index} value={slot}>{slot}</option>
          ))}
        </select>

        <button type="submit" className="btn">Book Appointment</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AppointmentBooking;
