import React, { useState, useEffect } from "react";
import Sidebar from "../admin/Sidebar";
import "./dashboard.css";
import "./manageDoctors.css";

const ManageDoctors = () => {
  const [formData, setFormData] = useState({
    clinic_id: "",
    doctor_name: "",
    email: "",
    mobile_no: "",
    specialization: "",
    experience: "",
    gender: "",
    schedule: [{ day: "Monday", time: "10 AM - 2 PM" }],
    dob: "",
    address: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [editDoctorId, setEditDoctorId] = useState(null);

  useEffect(() => {
    fetchClinics();
    fetchDoctors();
  }, []);

  // ✅ Fetch list of clinics from API
  const fetchClinics = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/clinic", {
        method: "GET", // Ensure it's a GET request
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setClinics(data);
    } catch (error) {
      console.error("Error fetching clinics:", error.message);
    }
  };
  

  // ✅ Fetch list of doctors
  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctor/clinic-wise");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Submitting form with data:", formData);  // ✅ Debugging log
  
    const url = editDoctorId
      ? `http://localhost:5000/api/doctor/update/${editDoctorId}`  // ✅ Use Update API
      : "http://localhost:5000/api/doctor/add";
  
    const method = editDoctorId ? "PUT" : "POST";
  
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const responseData = await response.json();  // ✅ Read API response
      console.log("API Response:", responseData);  // ✅ Debugging log
  
      if (response.ok) {
        fetchDoctors(); // Refresh the list after updating
        setShowForm(false);
        setEditDoctorId(null);
      } else {
        console.error("Error saving doctor:", responseData);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,  // ✅ Update formData dynamically
    }));
  };
  
  
  const handleEdit = (doctor) => {
    setFormData(doctor);
    setEditDoctorId(doctor.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/doctor/delete/${id}`, {
        method: "DELETE",
      });
      fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Manage Doctors</h2>
        <button className="btn add" onClick={() => setShowForm(true)}>Add Doctor</button>

        {showForm && (
          <form className="doctor-form" onSubmit={handleSubmit}>
            <div className="form-group">
              {/* ✅ Clinic Dropdown (Fetches from API) */}
              {/* Clinic Dropdown */}
              <select name="clinic_id" value={formData.clinic_id} onChange={handleChange} required>
              <option value="">Select Clinic</option>
              {clinics.length > 0 ? (
                clinics.map((clinic) => (
                  <option key={clinic.id} value={clinic.id}>
                    {clinic.clinic_name} {/* This correctly maps to API response */}
                  </option>
                ))
              ) : (
                <option disabled>Loading clinics...</option>
              )}
              </select>

              <input
                type="text"
                name="doctor_name"
                value={formData.doctor_name}
                onChange={handleInputChange}  // ✅ Ensure input updates formData
              />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="tel" name="mobile_no" placeholder="Mobile No" value={formData.mobile_no} onChange={handleChange} required />
              <input type="text" name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} required />
              <input type="text" name="experience" placeholder="Experience (years)" value={formData.experience} onChange={handleChange} required />
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn submit">{editDoctorId ? "Update" : "Submit"}</button>
              <button type="button" className="btn cancel" onClick={() => { setShowForm(false); setEditDoctorId(null); }}>Cancel</button>
            </div>
          </form>
        )}

        {/* ✅ Doctors Table */}
        <table className="data-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Clinic Name</th>
              <th>Doctor Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Mobile No.</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <tr key={doctor.id || index}>
                  <td>{index + 1}</td>
                  <td>{doctor.clinic_name}</td>
                  <td>{doctor.doctor_name}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.gender}</td>
                  <td>{doctor.mobile_no}</td>
                  <td>{doctor.address}</td>
                  <td>
                    <button className="btn edit" onClick={() => handleEdit(doctor)}>Edit</button>
                    <button className="btn delete" onClick={() => handleDelete(doctor.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>No doctors found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDoctors;
