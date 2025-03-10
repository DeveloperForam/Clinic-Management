import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/appointment.css";

// Example clinics and doctors
const clinics = {
  1: { id: 1, name: "Health Clinic A", doctorIds: [1, 2] },
  2: { id: 2, name: "Wellness Clinic B", doctorIds: [3, 4] }
};

const doctors = {
  1: { id: 1, name: "Dr. John Doe", startTime: "16:00", endTime: "18:00", slotDuration: 15 },
  2: { id: 2, name: "Dr. Sarah Smith", startTime: "10:00", endTime: "13:00", slotDuration: 20 },
  3: { id: 3, name: "Dr. Jane Brown", startTime: "14:00", endTime: "17:00", slotDuration: 15 },
  4: { id: 4, name: "Dr. Mark Wilson", startTime: "13:00", endTime: "16:00", slotDuration: 15 }
};

const BookAppointment = () => {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState(""); // New state for patient name
  const [patientEmail, setPatientEmail] = useState(""); // New state for patient email
  const [patientPhone, setPatientPhone] = useState(""); // New state for patient phone
  const [clinicId, setClinicId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [message, setMessage] = useState("");
  const [fadeMessage, setFadeMessage] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Generate available time slots when a doctor is selected
  useEffect(() => {
    if (doctorId) {
      const doctor = doctors[doctorId];
      let slots = [];
      let start = new Date(`2022-01-01T${doctor.startTime}`);
      let end = new Date(`2022-01-01T${doctor.endTime}`);

      while (start < end) {
        slots.push(start.toTimeString().substring(0, 5)); // Format HH:MM
        start.setMinutes(start.getMinutes() + doctor.slotDuration);
      }
      setAvailableSlots(slots);
    }
  }, [doctorId]);

  // Handle appointment booking
  const handleBooking = (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (date < today) {
      showMessage("You cannot book an appointment for a past date.", "error");
      return;
    }

    if (!patientName || !patientEmail || !patientPhone || !clinicId || !doctorId || !date || !time) {
      showMessage("Please fill in all details.", "error");
      return;
    }

    let bookedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const isSlotTaken = bookedAppointments.some(
      (appt) => appt.date === date && appt.time === time && appt.clinicId === clinicId && appt.doctorId === doctorId
    );

    if (isSlotTaken) {
      showMessage("This time slot is already booked. Please select another slot.", "error");
      return;
    }

    // Save appointment details with patient details
    bookedAppointments.push({ patientName, patientEmail, patientPhone, clinicId, doctorId, date, time });
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

      {/* Patient Details */}
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
        <label htmlFor="patientEmail">Patient Email:</label>
        <input
          type="email"
          id="patientEmail"
          value={patientEmail}
          onChange={(e) => setPatientEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="patientPhone">Patient Phone:</label>
        <input
          type="text"
          id="patientPhone"
          value={patientPhone}
          onChange={(e) => setPatientPhone(e.target.value)}
          required
        />
      </div>

      {/* Clinic Selection */}
      <div>
        <label htmlFor="clinic">Select Clinic:</label>
        <select id="clinic" value={clinicId} onChange={(e) => setClinicId(e.target.value)} required>
          <option value="">Select a Clinic</option>
          {Object.values(clinics).map((clinic) => (
            <option key={clinic.id} value={clinic.id}>
              {clinic.name}
            </option>
          ))}
        </select>
      </div>

      {/* Doctor Selection */}
      {clinicId && (
        <div>
          <label htmlFor="doctor">Select Doctor:</label>
          <select id="doctor" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required>
            <option value="">Select a Doctor</option>
            {clinics[clinicId].doctorIds.map((docId) => (
              <option key={docId} value={docId}>
                {doctors[docId].name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Appointment Date & Time Selection */}
      {doctorId && (
        <form className="appointment-form" onSubmit={handleBooking}>
          <div>
            <label htmlFor="date">Select Date:</label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} min={today} required />
          </div>

          <div>
            <label htmlFor="time">Select Time Slot:</label>
            <select id="time" value={time} onChange={(e) => setTime(e.target.value)} required>
              <option value="">Select Time Slot</option>
              {availableSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn">Book Appointment</button>
        </form>
      )}

      {/* Error or Success Message */}
      {message && (
        <p className={`message ${message.type} ${fadeMessage ? "fade-in" : ""}`}>
          {message.text}
        </p>
      )}
    </div>
  );
};

export default BookAppointment;
