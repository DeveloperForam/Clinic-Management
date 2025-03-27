import React, { useState, useEffect } from "react";
import Sidebar from "../admin/Sidebar";
import "./dashboard.css";

const ManageDoctors = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [doctorData, setDoctorData] = useState({
    clinic_id: "",
    doctor_name: "",
    email: "",
    mobile_no: "",
    gender: "Male",
    address: "",
  });

  useEffect(() => {
    fetchDoctors();
    fetchClinics();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctor/clinic-wise");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchClinics = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/clinic");
      const data = await response.json();
      setClinics(data);
    } catch (error) {
      console.error("Error fetching clinics:", error);
    }
  };

  const handleSubmit = async () => {
    if (!doctorData.clinic_id || !doctorData.doctor_name || !doctorData.email || !doctorData.mobile_no || !doctorData.address) {
      alert("Please fill in all fields.");
      return;
    }

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

      alert(editingDoctorId ? "Doctor updated successfully" : "Doctor added successfully");

      setDoctorData({
        clinic_id: "",
        doctor_name: "",
        email: "",
        mobile_no: "",
        gender: "Male",
        address: "",
      });

      setShowForm(false);
      fetchDoctors();
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };

  const handleEdit = (doctor) => {
    setDoctorData(doctor);
    setEditingDoctorId(doctor.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await fetch(`http://localhost:5000/api/doctor/delete/${id}`, { method: "DELETE" });
        alert("Doctor deleted successfully");
        fetchDoctors();
      } catch (error) {
        console.error("Error deleting doctor:", error);
      }
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

        <table className="data-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Clinic Name</th>
              <th>Doctor Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={doctor.id}>
                <td>{index + 1}</td>
                <td>{doctor.clinic_name}</td>
                <td>{doctor.doctor_name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.mobile_no}</td>
                <td>{doctor.gender}</td>
                <td>{doctor.address}</td>
                <td>
                  <button className="btn edit" onClick={() => handleEdit(doctor)}>Edit</button>
                  <button className="btn delete" onClick={() => handleDelete(doctor.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showForm && (
          <div className="card-modal">
            <div className="card-modal-content">
              <h3>{editingDoctorId ? "Edit Doctor" : "Add Doctor"}</h3>
              <form className="doctor-form">
                <div className="form-group">
                  <label>Clinic:</label>
                  <select
                    value={doctorData.clinic_id}
                    onChange={(e) => setDoctorData({ ...doctorData, clinic_id: e.target.value })}
                  >
                    <option value="">Select Clinic</option>
                    {clinics.map((clinic) => (
                      <option key={clinic.id} value={clinic.id}>
                        {clinic.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Doctor Name:</label>
                  <input
                    type="text"
                    placeholder="Enter Doctor's Name"
                    value={doctorData.doctor_name}
                    onChange={(e) => setDoctorData({ ...doctorData, doctor_name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={doctorData.email}
                    onChange={(e) => setDoctorData({ ...doctorData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Mobile No.:</label>
                  <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    value={doctorData.mobile_no}
                    onChange={(e) => setDoctorData({ ...doctorData, mobile_no: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Gender:</label>
                  <select
                    value={doctorData.gender}
                    onChange={(e) => setDoctorData({ ...doctorData, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Address:</label>
                  <input
                    type="text"
                    placeholder="Enter Address"
                    value={doctorData.address}
                    onChange={(e) => setDoctorData({ ...doctorData, address: e.target.value })}
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={handleSubmit}>
                    {editingDoctorId ? "Update" : "Add"}
                  </button>
                  <button type="button" className="cancel" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageDoctors;
