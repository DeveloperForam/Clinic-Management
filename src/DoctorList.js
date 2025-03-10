import React, { useState } from "react";
import './DoctorList.css';
import AppointmentFormm from "./components/AppointmentFormm";
const doctors = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    image: "/images/doctor1.jpg",
    degree: "MBBS, MD (Cardiology)",
    experience: "15 Years",
    available: "Mon - Fri, 10 AM - 5 PM",
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    image: "/images/doctor2.jpg",
    degree: "BDS, MDS (Dentistry)",
    experience: "10 Years",
    available: "Mon - Sat, 9 AM - 4 PM",
  },
  {
    id: 3,
    name: "Dr. Amit Verma",
    image: "/images/doctor3.jpg",
    degree: "MBBS, MS (Orthopedics)",
    experience: "8 Years",
    available: "Tue - Sun, 11 AM - 6 PM",
  },
  {
    id: 4,
    name: "Dr. Neha Gupta",
    image: "/images/doctor4.jpg",
    degree: "MBBS, MD (Gynecology)",
    experience: "12 Years",
    available: "Mon - Fri, 9 AM - 3 PM",
  },
  {
    id: 5,
    name: "Dr. Arjun Patel",
    image: "/images/doctor5.jpg",
    degree: "MBBS, MS (Neurosurgery)",
    experience: "20 Years",
    available: "Mon - Sat, 8 AM - 2 PM",
  },
  {
    id: 6,
    name: "Dr. Ritu Sen",
    image: "/images/doctor6.jpg",
    degree: "BDS, MDS (Pediatric Dentistry)",
    experience: "7 Years",
    available: "Mon - Sun, 10 AM - 6 PM",
  },
  
];

const DoctorList = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="doctor-list">
      <h1>Hospital Appointment Booking</h1>
      <h2>Choose a Doctor</h2>
      <div className="doctor-container">
        {doctors.map((doc) => (
          <div key={doc.id} className="doctor-card">
            <img src={doc.image} alt={doc.name} />
            <h3>{doc.name}</h3>
            <p>{doc.degree}</p>
            <p>{doc.specialty}</p>
            <p>{doc.experience}</p>
            <p>{}</p>
            <button onClick={() => setSelectedDoctor(doc)}>Book Appointment</button>
          </div>
        ))}
      </div>
      {selectedDoctor && (
        <AppointmentFormm doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}
    </div>
  );
};

export default DoctorList;
