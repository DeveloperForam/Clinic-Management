import React, { useEffect, useState } from "react";
import "./clinicDashboard.css";
import ClinicSidebar from "./ClinicSidebar";

const ManageSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ doctor_id: "", available_days: "", time: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/schedules/list")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSchedules(data);
        } else {
          setSchedules([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching schedules:", error);
        setSchedules([]);
      });

    fetch("http://localhost:5000/api/doctor/clinic-wise")
      .then((res) => res.json())
      .then((data) => setDoctors(Array.isArray(data) ? data : []));
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch("http://localhost:5000/api/schedules/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => {
      setShowForm(false);
      window.location.reload();
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/schedules/delete/${id}`, {
      method: "DELETE",
    }).then(() => window.location.reload());
  };

  return (
    <div className="clinic-dashboard">
      <ClinicSidebar />
      <div className="dashboard-content">
        <h1 className="dashboard-title">Manage Schedule</h1>
        <button className="btn add" onClick={() => setShowForm(true)}>Add Schedule</button>
        {showForm && (
          <div className="form-modal">
            <select name="doctor_id" onChange={handleInputChange}>
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>{doctor.doctor_name}</option>
              ))}
            </select>
            <input type="text" name="available_days" placeholder="Available Days" onChange={handleInputChange} />
            <input type="text" name="time" placeholder="Time" onChange={handleInputChange} />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        )}
        <table className="data-table">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Available Days</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(schedules) && schedules.length > 0 ? (
              schedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td>{schedule.doctor_name}</td>
                  <td>{schedule.available_days}</td>
                  <td>{schedule.time}</td>
                  <td>
                    <button className="btn delete" onClick={() => handleDelete(schedule.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4">No schedules available</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSchedule;
