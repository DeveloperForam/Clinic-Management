import React, { useState, useEffect } from "react";
import "../styles/clinic.css";

const Clinic = () => {
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/clinic")
      .then((response) => response.json())
      .then((data) => setClinics(data))
      .catch((error) => console.error("Error fetching clinics:", error));

    fetch("http://localhost:5000/api/patients")
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error fetching patients:", error));
  }, []);

  const fetchDoctorsByClinic = async (clinicId) => {
    setLoadingDoctors(true);
    setDoctors([]);
    setSelectedDoctor("");

    try {
      const response = await fetch(`http://localhost:5000/api/doctor/list/${clinicId}`);
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    } finally {
      setLoadingDoctors(false);
    }
  };

  const fetchBookedSlots = async (doctorId, date) => {
    if (!doctorId || !date) return;

    try {
      const response = await fetch(`http://localhost:5000/api/appointments/booked-slots?doctor_id=${doctorId}&date=${date}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setBookedSlots(data);
    } catch (error) {
      console.error("Error fetching booked slots:", error);
    }
  };

  useEffect(() => {
    if (selectedClinic) {
      fetchDoctorsByClinic(selectedClinic);
    }
  }, [selectedClinic]);

  const handleClinicChange = (clinicId) => {
    setSelectedClinic(clinicId);
  };

  const handleDoctorChange = (doctorId) => {
    setSelectedDoctor(doctorId);
    setBookedSlots([]);
    if (appointmentDate) {
      fetchBookedSlots(doctorId, appointmentDate);
    }
  };

  const handleDateChange = (date) => {
    setAppointmentDate(date);
    if (selectedDoctor) {
      fetchBookedSlots(selectedDoctor, date);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDoctor) {
      alert("Please select a doctor.");
      return;
    }

    if (!selectedPatient) {
      alert("Please select a patient.");
      return;
    }

    // 🔥 Fix: Get correct patient object by comparing IDs
    const patientObj = patients.find((p) => p.id.toString() === selectedPatient.toString());
    if (!patientObj) {
      alert("Invalid patient selection.");
      return;
    }

    if (bookedSlots.includes(appointmentTime)) {
      alert("This time slot is already booked. Please select another time.");
      return;
    }

    const appointmentData = {
      patient_id: patientObj.id, // Correct patient_id
      doctor_id: selectedDoctor,
      clinic_id: selectedClinic,
      appointment_time: appointmentTime,
      date: appointmentDate,
      mobile_no: mobileNo,
      status: "Booked",
    };

    try {
      const response = await fetch("http://localhost:5000/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error("Failed to book appointment.");
      }

      setShowForm(false);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };

  return (
    <div className="clinic-container">
      <h2>Select a Clinic</h2>
      <div className="clinic-list">
        {clinics.map((clinic) => (
          <div key={clinic.id} className="clinic-card">
            <div className="clinic-info">
              <h3>{clinic.clinic_name}</h3>
              <p><strong>Address:</strong> {clinic.address}</p>
              <p><strong>Contact:</strong> {clinic.mobile_no}</p>
              <p><strong>Email:</strong> {clinic.email}</p>
            </div>
            <button className="book-appointment-btn" onClick={() => {
              setShowForm(true);
              handleClinicChange(clinic.id);
            }}>
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="appointment-form-overlay">
          <div className="appointment-form-card">
            <h2>Book an Appointment</h2>
            <form onSubmit={handleSubmit}>
              <label>Clinic Name:</label>
              <select value={selectedClinic} onChange={(e) => handleClinicChange(e.target.value)}>
                <option value="">Select Clinic</option>
                {clinics.map((clinic) => (
                  <option key={clinic.id} value={clinic.id}>{clinic.clinic_name}</option>
                ))}
              </select>

              <label>Doctor Name:</label>
              <select value={selectedDoctor} onChange={(e) => handleDoctorChange(e.target.value)} disabled={loadingDoctors || doctors.length === 0}>
                <option value="">
                  {loadingDoctors ? "Loading doctors..." : (doctors.length > 0 ? "Select Doctor" : "No doctors available")}
                </option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>{doctor.doctor_name}</option>
                ))}
              </select>

              {/* <label>Patient Name:</label>
              <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
                <option value="">Select Patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>{patient.name}</option>
                ))}
              </select> */}

              <label>Appointment Date:</label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => handleDateChange(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />

              <label>Appointment Time:</label>
              <input
                type="time"
                value={appointmentTime}
                onChange={(e) => {
                  const selectedTime = e.target.value;
                  if (bookedSlots.includes(selectedTime)) {
                    alert("This time slot is already booked. Please select another time.");
                    setAppointmentTime("");
                  } else {
                    setAppointmentTime(selectedTime);
                  }
                }}
                required
                step="1800"
              />

              <label>Mobile No:</label>
              <input type="tel" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} required />

              <div className="appointment-form-buttons">
                <button type="submit" disabled={!selectedDoctor || !selectedPatient}>Submit</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>  
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clinic;
