import React, { useState, useEffect } from "react";
import Sidebar from "../admin/Sidebar";
import "./dashboard.css";

const ManageDoctors = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [errors, setErrors] = useState({});
  const [doctorData, setDoctorData] = useState({
    clinic_id: 3,
    doctor_name: "",
    email: "",
    mobile_no: "",
    specialization: "",
    experience: "",
    gender: "Male",
    dob: "",
    address: "",
    schedule: "",
    dob: "",
    address: ""
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctor/clinic-wise");
      const data = await response.json();
      console.log("Fetch Data:", data);
      setDoctors(data.flatMap(clinic => clinic.doctors || []));
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!doctorData.doctor_name || doctorData.doctor_name.length < 3) {
      errors.doctor_name = "Doctor name must be at least 3 characters";
    }
    if (!doctorData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Invalid email address";
    }
    if (!doctorData.mobile_no.match(/^\d{10}$/)) {
      errors.mobile_no = "Mobile number must be exactly 10 digits";
    }
    if (!doctorData.specialization) {
      errors.specialization = "Specialization is required";
    }
    if (!doctorData.experience || isNaN(doctorData.experience)) {
      errors.experience = "Experience must be a number";
    }
    if (!doctorData.dob) {
      errors.dob = "Date of Birth is required";
    }
    if (!doctorData.address || doctorData.address.length < 5) {
      errors.address = "Address must be at least 5 characters";
    }
    try {
      JSON.parse(doctorData.schedule);
    } catch {
      errors.schedule = "Schedule must be a valid ";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

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

      setDoctorData({
        clinic_id: 3,
        doctor_name: "",
        email: "",
        mobile_no: "",
        specialization: "",
        experience: "",
        gender: "Male",
        dob: "",
        address: "",
        schedule: "",
        dob: "",
        address: "",
      });

      setShowForm(false);
      fetchDoctors();
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
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
            {errors.doctor_name && <span className="error">{errors.doctor_name}</span>}

            <input type="email" name="email" placeholder="Email" value={doctorData.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}

            <input type="tel" name="mobile_no" placeholder="Contact No." value={doctorData.mobile_no} onChange={handleChange} pattern="\d{10}" />
            {errors.mobile_no && <span className="error">{errors.mobile_no}</span>}

            <input type="text" name="specialization" placeholder="Specialization" value={doctorData.specialization} onChange={handleChange} />
            {errors.specialization && <span className="error">{errors.specialization}</span>}

            <label>Gender :</label>
            <label><input type="radio" name="gender" value="Male" checked={doctorData.gender === "Male"} onChange={handleChange} /> Male</label>
            <label><input type="radio" name="gender" value="Female" checked={doctorData.gender === "Female"} onChange={handleChange} /> Female</label>
            <label><input type="radio" name="gender" value="Other" checked={doctorData.gender === "Other"} onChange={handleChange} /> Other</label>

            <input type="date" name="dob" placeholder="Date of Birth" value={doctorData.dob} onChange={handleChange} />
            {errors.dob && <span className="error">{errors.dob}</span>}

            <input type="text" name="address" placeholder="Address" value={doctorData.address} onChange={handleChange} />
            {errors.address && <span className="error">{errors.address}</span>}

            <input type="text" name="experience" placeholder="Experience (Years)" value={doctorData.experience} onChange={handleChange} />
            {errors.experience && <span className="error">{errors.experience}</span>}

            <textarea name="schedule" placeholder='Schedule' value={doctorData.schedule} onChange={handleChange}></textarea>
            {errors.schedule && <span className="error">{errors.schedule}</span>}

            <input type="date" placeholder='Birthdate' value={doctorData.dob} onChange={handleChange}></input>
            {errors.dob && <span className="error">{errors.dob}</span>}

            <textarea name="address" placeholder='address' value={doctorData.address} onChange={handleChange}></textarea>
            {errors.address && <span className="error">{errors.address}</span>}

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
              <th>DOB</th>
              <th>Address</th>
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
                <td>{new Date(doctor.dob).toLocaleDateString()}</td>
                <td>{doctor.address}</td>
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
