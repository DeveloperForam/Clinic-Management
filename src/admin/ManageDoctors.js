import React, { useState, useEffect } from "react";
import Sidebar from "../admin/Sidebar";
import "./dashboard.css";

const ManageDoctors = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [doctorData, setDoctorData] = useState({
    clinic_id: 3,
    doctor_name: "",
    email: "",
    mobile_no: "",
    specialization: "",
    experience: "",
    gender: "Male",
    schedule: []
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctor/clinic-wise");
      const data = await response.json();
      console.log("Fetched Data:", data);
  
      // Flatten the nested structure
      const doctorList = data.flatMap(clinic => clinic.doctors || []);
      
      setDoctors(doctorList);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleDelete = async (doctorId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/doctor/delete/${doctorId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete doctor");
      fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };
  

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const url = editingDoctorId 
      ? `http://localhost:5000/api/doctor/update/${editingDoctorId}`
      : "http://localhost:5000/api/doctor/add";
    const method = editingDoctorId ? "PUT" : "POST";
  
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctorData),
      });
  
      if (!response.ok) throw new Error("Failed to save doctor");
  
      // Clear the form data
      setDoctorData({
        clinic_id: 3,
        doctor_name: "",
        email: "",
        mobile_no: "",
        specialization: "",
        experience: "",
        gender: "Male",
        schedule: [],
      });
  
      setShowForm(false);
      fetchDoctors(); // Fetch updated list immediately
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };
  

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Manage Doctors</h2>
        <button className="btn add" onClick={() => { setShowForm(true); setEditingDoctorId(null); }}>
          Add Doctor
        </button>

        {showForm && (
          <div className="clinic-form">
            <input type="text" name="doctor_name" placeholder="Doctor Name" value={doctorData.doctor_name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={doctorData.email} onChange={handleChange} />
            <input type="tel" name="mobile_no" placeholder="Contact No." value={doctorData.mobile_no} onChange={handleChange} />
            <input type="text" name="specialization" placeholder="Specialization" value={doctorData.specialization} onChange={handleChange} />
            
            <div className="form-group">
              <label>Gender</label>
              <div className="radio-group">
                <label>
                  <input type="radio" name="gender" value="Male" checked={doctorData.gender === "Male"} onChange={handleChange} />
                  Male
                </label>
                <label>
                  <input type="radio" name="gender" value="Female" checked={doctorData.gender === "Female"} onChange={handleChange} />
                  Female
                </label>
                <label>
                  <input type="radio" name="gender" value="Other" checked={doctorData.gender === "Other"} onChange={handleChange} />
                  Other
                </label>
              </div>
            </div>

            <input type="text" name="experience" placeholder="Experience" value={doctorData.experience} onChange={handleChange} />
            <input type="text" name="qualification" placeholder="Qualification" value={doctorData.qualification} onChange={handleChange} />

            <button className="btn add" onClick={handleSubmit}>Submit</button>
            <button className="btn cancel" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        )}

        <table className="data-table">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.doctor_name}</td>
                <td>{doctor.gender}</td>
                <td>{doctor.email}</td>
                <td>{doctor.mobile_no}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.experience}</td>
                <td>
                  <button className="btn edit" onClick={() => { setShowForm(true); setEditingDoctorId(doctor.id); setDoctorData(doctor); }}>Edit</button>
                  <button className="btn delete" onClick={() => handleDelete(doctor.id)}>Delete</button>                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDoctors;
