import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../admin/Sidebar";
import "./dashboard.css";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [doctorData, setDoctorData] = useState({
    clinic_id: 3, // This field is preset as per your API call; adjust as needed
    doctor_name: "",
    email: "",
    mobile_no: "",
    specialization: "",
    experience: "",
    gender: "Male",
    // schedule: [{ day: "", start_time: "", end_time: "" }],
  });

  // Fetch Doctors
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctor/clinic-wise", {
        headers: { "Content-Type": "application/json" },
      });
      // alert(response.data);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle input changes for non-schedule fields
  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  // Handle schedule changes
  const handleScheduleChange = (index, field, value) => {
    const updatedSchedule = [...doctorData.schedule];
    updatedSchedule[index][field] = value;
    setDoctorData({ ...doctorData, schedule: updatedSchedule });
  };

  // Add Doctor
  const addDoctor = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/doctor/add", doctorData, {
        headers: { "Content-Type": "application/json" },
      });
      setShowForm(false);
      fetchDoctors();
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  // Update Doctor
  const updateDoctor = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/doctor/update/${editingDoctorId}`, doctorData, {
        headers: { "Content-Type": "application/json" },
      });
      setShowForm(false);
      setEditingDoctorId(null);
      fetchDoctors();
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  // Delete Doctor
  const deleteDoctor = async (doctorId) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axios.delete(`http://localhost:5000/api/doctor/delete/${doctorId}`, {
          headers: { "Content-Type": "application/json" },
        });
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

            
            <button className="btn add" onClick={addDoctor}>Submit</button>
            <button className="btn cancel" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        )}


        <table className="data-table">
          <thead>
            <tr>
              <th>doctor_name</th>
              {/* <th>specialization</th> */}
              <th>gender</th>
              {/* <th>experience</th> */}
              <th>mobile_no</th>
              {/* <th>email</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.doctor_name}</td>
                {/* <td>{doctor.specialization}</td> */}
                <td>{doctor.gender}</td>
                {/* <td>{doctor.experience}</td> */}
                <td>{doctor.mobile_no}</td>
                {/* <td>{doctor.email}</td> */}
                <td>
                  <button
                    className="btn edit"
                    onClick={() => {
                      setEditingDoctorId(doctor.id);
                      setDoctorData({
                        clinic_id: doctor.clinic_id || 3,
                        doctor_name: doctor.doctor_name,
                        email: doctor.email,
                        mobile_no: doctor.mobile_no,
                        specialization: doctor.specialization,
                        experience: doctor.experience,
                        gender: doctor.gender,
                      });
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button className="btn delete" onClick={() => deleteDoctor(doctor.id)}>
                    Delete
                  </button>
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
