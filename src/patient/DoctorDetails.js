import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/doctor.css"; 
import "../styles/appointment.css"; 

// Sample doctor data
const doctors = {
  1: { id: 1, name: "Dr. John Doe", specialty: "Cardiologist", startTime: "10:00", endTime: "21:00", slotDuration: 15, image: "/images/doctor1.jpg" },
  2: { id: 2, name: "Dr. Sarah Smith", specialty: "Pediatrician", startTime: "10:00", endTime: "20:00", slotDuration: 20, image: "/images/doctor2.jpg" },
  3: { id: 3, name: "Dr. Jane Brown", specialty: "Dermatologist", startTime: "09:00", endTime: "17:00", slotDuration: 15, image: "/images/doctor3.jpg" },
  4: { id: 4, name: "Dr. Mark Wilson", specialty: "Neurologist", startTime: "08:00", endTime: "20:00", slotDuration: 15, image: "/images/doctor4.jpg" },
};

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors[Number(id)]; // Convert id to a number

  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [message, setMessage] = useState("");

  const today = new Date().toISOString().split("T")[0];

  // Generate available slots
  useEffect(() => {
    if (!doctor) return;

    let slots = [];
    let start = new Date(`2023-01-01T${doctor.startTime}`);
    let end = new Date(`2023-01-01T${doctor.endTime}`);

    while (start < end) {
      slots.push(start.toTimeString().substring(0, 5));
      start.setMinutes(start.getMinutes() + doctor.slotDuration);
    }
    setAvailableSlots(slots);
  }, [doctor]);

  // Handle appointment booking
  const handleBooking = (e) => {
    e.preventDefault();

    if (date < today) {
      setMessage("⚠️ You cannot book an appointment for a past date.");
      return;
    }

    if (!date || !time) {
      setMessage("⚠️ Please select both date and time.");
      return;
    }

    let bookedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const isSlotTaken = bookedAppointments.some(
      (appt) => appt.date === date && appt.time === time && appt.doctorId === Number(id)
    );

    if (isSlotTaken) {
      setMessage("⚠️ This time slot is already booked. Please select another slot.");
      return;
    }

    bookedAppointments.push({ doctorId: Number(id), doctorName: doctor.name, date, time });
    localStorage.setItem("appointments", JSON.stringify(bookedAppointments));

    setMessage("");
    setShowPopup(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigate("/patient/view-appointment");
    }, 3000);
  };

  return (
    <div className="doctor-details-container">
      {doctor ? (
        <>
          <div className="clinic-banner">
                <h1 className="clinic-name">City Health Clinic</h1> 
          </div>


          <div className="doctor-info-panel">
            <img src={doctor.image} alt={doctor.name} className="doctor-image" />

            <div className="doctor-text">
              <h2>{doctor.name}</h2>
              <p><strong>Specialty:</strong> {doctor.specialty}</p>
              <p><strong>Available:</strong> {doctor.startTime} - {doctor.endTime}</p>
              <button className="book-btn" onClick={() => setShowPopup(true)}>Book Appointment</button>
            </div>
          </div>

          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <h3>📅 Book an Appointment</h3>
                <p><strong>Doctor:</strong> {doctor.name}</p>
                <form className="appointment-form" onSubmit={handleBooking}>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={today} required />
                  <select value={time} onChange={(e) => setTime(e.target.value)} required>
                    <option value="">Select Time Slot</option>
                    {availableSlots.map((slot, index) => (
                      <option key={index} value={slot}>{slot}</option>
                    ))}
                  </select>
                  <button type="submit" className="confirm-btn">Confirm</button>
                  <button type="button" className="close-btn" onClick={() => setShowPopup(false)}>Cancel</button>
                </form>
                {message && <p className="message">{message}</p>}
              </div>
            </div>
          )}

          {showSuccess && (
            <div className="success-popup">
              <p>✅ Appointment booked successfully!</p>
            </div>
          )}
        </>
      ) : (
        <p className="error-message">❌ Doctor not found. Please check the URL.</p>
      )}
    </div>
  );
};

export default DoctorDetails;
