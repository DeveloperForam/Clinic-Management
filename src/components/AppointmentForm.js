import React, { useState } from "react";
import { bookAppointment } from "../services/api";

const AppointmentForm = () => {
    const [patientId, setPatientId] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await bookAppointment({ patient_id: patientId, doctor_id: doctorId, appointment_date: appointmentDate });
        alert("Appointment booked successfully!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Patient ID" onChange={(e) => setPatientId(e.target.value)} required />
            <input type="text" placeholder="Doctor ID" onChange={(e) => setDoctorId(e.target.value)} required />
            <input type="datetime-local" onChange={(e) => setAppointmentDate(e.target.value)} required />
            <button type="submit">Book Appointment</button>
        </form>
    );
};

export default AppointmentForm;
