import React, { useState, useEffect } from "react";
import "../styles/clinic.css";

const Clinic = () => {
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [patientName, setPatientName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  // Fetch clinics on page load
  useEffect(() => {
    fetch("http://localhost:5000/api/clinic")
      .then((response) => response.json())
      .then((data) => setClinics(data))
      .catch((error) => console.error("Error fetching clinics:", error));
  }, []);

  // Fetch doctors when a clinic is selected
  const fetchDoctorsByClinic = async (clinicId) => {
    setLoadingDoctors(true);
    setDoctors([]); // Clear previous doctors list
    setSelectedDoctor(""); // Reset selected doctor
    try {
      const response = await fetch(`http://localhost:5000/api/doctor/list/${clinicId}`);
      const data = await response.json();
      console.log('data>>>',data);
      console.log('clinicId>>',clinicId,response);
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    } finally {
      setLoadingDoctors(false);
    }
  };

  // Open form when clicking "Book Appointment"
  useEffect(() => {
    if (selectedClinic) {
        fetchDoctorsByClinic(selectedClinic);
        console.log("selected Clinic",selectedClinic);
    }
  }, [selectedClinic]); // Dependency array: Runs when `selectedClinic` changes

  const handleClinicChange = (clinicId) => {
    // const clinicbyId =   
    setSelectedClinic(clinicId); // This will trigger useEffect
    console.log("clinic id",clinicId);
  };
  // Submit the final appointment details
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDoctor) {
      alert("Please select a doctor.");
      return;
    }

    const appointmentData = {
      patient_id: 9, // Replace with actual patient ID
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

      const result = await response.json();
      console.log("Final Appointment Submitted:", result);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };

  return (
    <div className="clinic-container">
      <h2>Select a Clinic</h2>
      <div className="clinic-list">
        {console.log("clinic",clinics)}
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
              <select 
                value={selectedClinic} 
                onChange={(e) => handleClinicChange(e.target.value)}
              >
                <option value="">Select Clinic</option>
                {clinics.map((clinic) => (
                  <option key={clinic.id} value={clinic.id}>{clinic.clinic_name}</option>
                ))}
              </select>

              <label>Doctor Name:</label>
              <select 
                value={selectedDoctor} 
                onChange={(e) => setSelectedDoctor(e.target.value)}
                disabled={loadingDoctors || doctors.length === 0}
              >
                <option value="">
                  {loadingDoctors ? "Loading doctors..." : (doctors.length > 0 ? "Select Doctor" : "No doctors available")}
                </option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>{doctor.doctor_name}</option>
                ))}
              </select>

              <label>Patient Name:</label>
              <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />

              <label>Appointment Date:</label>
              <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />

              <label>Appointment Time:</label>
              <select value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} required>
                {["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM"].map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>

              <label>Mobile No:</label>
              <input type="tel" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} required />

              <div className="appointment-form-buttons">
                <button type="submit" disabled={!selectedDoctor}>Submit</button>
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
