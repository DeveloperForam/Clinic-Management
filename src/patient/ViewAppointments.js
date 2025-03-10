import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/viewAppointments.css";

const ViewAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [history, setHistory] = useState([]);
  const [notification, setNotification] = useState("");
  const [expandedDoctors, setExpandedDoctors] = useState({});

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const currentTime = new Date();
    const upcomingAppointments = [];
    const pastAppointments = [];

    storedAppointments.forEach((appt) => {
      const appointmentTime = new Date(`${appt.date} ${appt.time}`);
      if (appointmentTime >= currentTime) {
        upcomingAppointments.push(appt);
      } else {
        pastAppointments.push(appt);
      }
    });

    setAppointments(upcomingAppointments);
    setHistory(pastAppointments);
    localStorage.setItem("appointmentHistory", JSON.stringify(pastAppointments));
  }, []);

  useEffect(() => {
    const checkUpcomingAppointments = () => {
      const currentTime = new Date();
      appointments.forEach((appt) => {
        const appointmentTime = new Date(`${appt.date} ${appt.time}`);
        const diff = (appointmentTime - currentTime) / (1000 * 60);
        if (diff > 0 && diff <= 5) {
          setNotification(`Reminder: Your appointment with Dr. ${appt.doctorName} is in ${Math.ceil(diff)} minutes!`);
        }
      });
    };

    const interval = setInterval(checkUpcomingAppointments, 60000);
    return () => clearInterval(interval);
  }, [appointments]);

  const groupedAppointments = appointments.reduce((acc, appt) => {
    if (!acc[appt.doctorName]) {
      acc[appt.doctorName] = [];
    }
    acc[appt.doctorName].push(appt);
    return acc;
  }, {});

  const groupedHistory = history.reduce((acc, appt) => {
    if (!acc[appt.doctorName]) {
      acc[appt.doctorName] = [];
    }
    acc[appt.doctorName].push(appt);
    return acc;
  }, {});

  const toggleDoctor = (doctorName) => {
    setExpandedDoctors((prev) => ({
      ...prev,
      [doctorName]: !prev[doctorName],
    }));
  };

  return (
    <div className="appointments-container fade-in">
      <h2>Your Appointments</h2>
      {notification && <div className="notification-bar">{notification}</div>}

      {Object.keys(groupedAppointments).length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        Object.keys(groupedAppointments).map((doctorName) => (
          <div key={doctorName} className="doctor-section">
            <h3 onClick={() => toggleDoctor(doctorName)}>
              Dr. {doctorName} <span>{expandedDoctors[doctorName] ? "▲" : "▼"}</span>
            </h3>
            {expandedDoctors[doctorName] && (
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedAppointments[doctorName].map((appt, index) => (
                    <tr key={index}>
                      <td>{appt.date}</td>
                      <td>{appt.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))
      )}

      <h2>Appointment History</h2>
      {Object.keys(groupedHistory).length === 0 ? (
        <p>No past appointments.</p>
      ) : (
        Object.keys(groupedHistory).map((doctorName) => (
          <div key={doctorName} className="doctor-section">
            <h3 onClick={() => toggleDoctor(doctorName)}>
              Dr. {doctorName} <span>{expandedDoctors[doctorName] ? "▲" : "▼"}</span>
            </h3>
            {expandedDoctors[doctorName] && (
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedHistory[doctorName].map((appt, index) => (
                    <tr key={index}>
                      <td>{appt.date}</td>
                      <td>{appt.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))
      )}

      <button className="btn" onClick={() => navigate("/patient/home")}>Back to Home</button>
    </div>
  );
};

export default ViewAppointments;
