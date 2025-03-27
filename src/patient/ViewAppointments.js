import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/viewAppointments.css";

const ViewAppointment = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [editPopup, setEditPopup] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState({
    appointment_id: "",
    appointment_time: "",
    date: "",
    status: "",
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetch Appointments
  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/appointments/list");
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const data = await response.json();

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcomingAppointments = data.filter((appt) => {
        const appointmentDate = new Date(appt.date);
        appointmentDate.setHours(0, 0, 0, 0);
        return appointmentDate >= today;
      });

      setAppointments(upcomingAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Delete Appointment
  const handleDelete = async (appointmentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/appointments/delete/${appointmentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete appointment");
      }

      alert("Appointment deleted successfully!");
      fetchAppointments(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment. Please try again.");
    }
  };

  // Open Edit Popup
  const handleEdit = (appointment) => {
    setCurrentAppointment({
      appointment_id: appointment.appointment_id,
      appointment_time: appointment.appointment_time,
      date: appointment.date,
      status: appointment.status,
    });
    setEditPopup(true);
  };

  // Handle Edit Form Submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/appointments/edit/${currentAppointment.appointment_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            appointment_time: currentAppointment.appointment_time,
            date: currentAppointment.date,
            status: currentAppointment.status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update appointment");
      }

      alert("Appointment updated successfully!");
      setEditPopup(false);
      fetchAppointments(); // Refresh list after update
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Failed to update appointment. Please try again.");
    }
  };

  return (
    <div className="appointments-container fade-in">
      <h2>Your Scheduled Appointments</h2>
      {appointments.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Sr No.</th>
              {/* <th>Patient Name</th> */}
              <th>Doctor Name</th>
              <th>Clinic Name</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={appt.appointment_id}>
                <td>{index + 1}</td>
                {/* <td>{appt.patient_name}</td> */}
                <td>{appt.doctor_name}</td>
                <td>{appt.clinic_name}</td>
                <td>{new Date(appt.date).toLocaleDateString()}</td>
                <td>{appt.appointment_time}</td>
                <td>{appt.status}</td>
                <td>
                  <button className="btn edit" onClick={() => handleEdit(appt)}>Edit</button>
                  <button className="btn delete" onClick={() => handleDelete(appt.appointment_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="btn" onClick={() => navigate("/doctor/dashboard")}>
        Back to Dashboard
      </button>

      {/* Edit Appointment Popup */}
      {editPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Edit Appointment</h3>
            <form onSubmit={handleEditSubmit}>
              <label>Appointment Date:</label>
              <input
                type="date"
                value={currentAppointment.date}
                onChange={(e) => setCurrentAppointment({ ...currentAppointment, date: e.target.value })}
                required
              />

              <label>Appointment Time:</label>
              <input
                type="time"
                value={currentAppointment.appointment_time}
                onChange={(e) => setCurrentAppointment({ ...currentAppointment, appointment_time: e.target.value })}
                required
              />

              <label>Status:</label>
              <select
                value={currentAppointment.status}
                onChange={(e) => setCurrentAppointment({ ...currentAppointment, status: e.target.value })}
                required
              >
                <option value="Booked">Booked</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>

              <button type="submit" className="btn save">Save Changes</button>
              <button type="button" className="btn cancel" onClick={() => setEditPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAppointment;
