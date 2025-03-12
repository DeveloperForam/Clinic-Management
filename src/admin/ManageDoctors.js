import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../admin/Sidebar";
import "./dashboard.css";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    clinic_id: 1,
    d_name: "",
    d_email: "",
    d_contact: "",
    d_specialization: "",
    d_gender: "Male",
    d_experience: "",
    d_qualification: "",
    d_schedule: ""
  });

  // Fetch doctors from API
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost/cms/fetchDoctor.php");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value });
  };

  // Add doctor function
  const addDoctor = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost/cms/addDoctor.php", newDoctor, {
        headers: { "Content-Type": "application/json" }
      });
      setShowForm(false);
      fetchDoctors(); // Refresh list after adding
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Manage Doctors</h2>
        <button className="btn add" onClick={() => setShowForm(true)}>Add Doctor</button>

         {showForm && (
          <div className="clinic-form">
            <input type="text" name="d_name" placeholder="Doctor Name" value={newDoctor.d_name} onChange={handleChange} />
            <input type="email" name="d_email" placeholder="Email" value={newDoctor.c_email} onChange={handleChange} />
            <input type="tel" name="d_contact" placeholder="Contact No." value={newDoctor.d_contact} onChange={handleChange} />
            <input type="" name="d_specialization" placeholder="Specialization" value={newDoctor.d_specialization} onChange={handleChange} />
            <div className="form-group">
            <label>Gender</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="d_gender"
                  value="Male"
                  checked={newDoctor.d_gender === "Male"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="d_gender"
                  value="Female"
                  checked={newDoctor.d_gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="d_gender"
                  value="Other"
                  checked={newDoctor.d_gender === "Other"}
                  onChange={handleChange}
                />
                Other
              </label>
            </div>
          </div>

            <input type="" name="d_experience" placeholder="Experience" value={newDoctor.d_experience} onChange={handleChange} />
            <input type="" name="d_qualification" placeholder="Qualification" value={newDoctor.d_qualification} onChange={handleChange} />
            <input type="" name="d_schedule" placeholder="Schedule" value={newDoctor.d_schedule} onChange={handleChange} />
            <button className="btn add" onClick={addDoctor}>Submit</button>
            <button className="btn cancel" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        )}
        <table className="data-table">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Specialization</th>
              <th>Gender</th>
              <th>Experience</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Qualification</th>
              <th>Schedule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={index}>
                <td>{doctor.d_name}</td>
                <td>{doctor.d_specialization}</td>
                <td>{doctor.d_gender}</td>
                <td>{doctor.d_experience}</td>
                <td>{doctor.d_contact}</td>
                <td>{doctor.d_email}</td>
                <td>{doctor.d_qualification}</td>
                <td>{doctor.d_schedule}</td>
                <td>
                  <button className="btn edit">Edit</button>
                  <button className="btn delete">Delete</button>
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