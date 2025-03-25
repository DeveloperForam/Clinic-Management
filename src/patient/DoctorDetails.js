import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/doctor.css";
import "../styles/appointment.css";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [message, setMessage] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetch(`http://localhost:5000/api/doctor/list/:clinic_id`, { // Use doctor ID from params
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDoctor(data);
        generateSlots(data);
      })
      .catch((error) => console.error("Error fetching doctor details:", error));
  }, [id]);
  

  const generateSlots = (doctorData) => {
    if (!doctorData) return;

    let slots = [];
    let start = new Date(`2023-01-01T${doctorData.start_time}`);
    let end = new Date(`2023-01-01T${doctorData.end_time}`);

    while (start < end) {
      slots.push(start.toTimeString().substring(0, 5));
      start.setMinutes(start.getMinutes() + doctorData.slot_duration);
    }
    setAvailableSlots(slots);
  };

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
            <h1 className="clinic-name">{doctor.clinic_name}</h1>
          </div>

          <div className="doctor-info-panel">
            <img src={doctor.image || "/images/default-doctor.jpg"} alt={doctor.name} className="doctor-image" />

            <div className="doctor-text">
              <h2>{doctor.name}</h2>
              <p><strong>Specialty:</strong> {doctor.specialization}</p>
              <p><strong>Experience:</strong> {doctor.experience} years</p>
              <p><strong>Gender:</strong> {doctor.gender}</p>
              <p><strong>Date of Birth:</strong> {doctor.dob}</p>
              <p><strong>Contact:</strong> {doctor.mobile_no}</p>
              <p><strong>Email:</strong> {doctor.email}</p>
              <p><strong>Address:</strong> {doctor.address}</p>
              <p><strong>Available:</strong> {doctor.start_time} - {doctor.end_time}</p>
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
