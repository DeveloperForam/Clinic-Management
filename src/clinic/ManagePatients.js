import React, { useEffect, useState } from "react";
import Sidebar from "../clinic/ClinicSidebar";
// import "./clinicprofile.css";

const ManagePatient = () => {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [newPatient, setNewPatient] = useState({
    name: "",
    birthdate: "",
    mobileno: "",
    address: "",
    email: "",
    gender: "",
    age: "",
    status: "",
    password: "",
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/patients");
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleSave = async () => {
    if (editingPatient) {
      await handleUpdate(editingPatient.id);
    } else {
      await handleRegister();
    }
  };

  const handleRegister = async () => {
    try {
      await fetch("http://localhost:5000/api/patients/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPatient),
      });
      fetchPatients();
      setShowForm(false);
      setNewPatient({
        name: "",
        birthdate: "",
        mobileno: "",
        address: "",
        email: "",
        gender: "",
        age: "",
        status: "",
        password: "",
      });
      setEditingPatient(null);
    } catch (error) {
      console.error("Error registering patient:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/patients/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPatient),
      });
      fetchPatients();
      setShowForm(false);
      setEditingPatient(null);
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await fetch(`http://localhost:5000/api/patients/delete/${id}`, {
          method: "DELETE",
        });
        fetchPatients();
      } catch (error) {
        console.error("Error deleting patient:", error);
      }
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Manage Patient</h2>
        <button className="btn add" onClick={() => { setShowForm(true); setEditingPatient(null); }}>Add Patient</button>
        {showForm && (
          <div className="patient-form">
            <h3>{editingPatient ? "Edit Patient" : "Add Patient"}</h3>
            <input type="text" placeholder="Name" value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} />
            <input type="date" placeholder="Birthdate" value={newPatient.birthdate} onChange={(e) => setNewPatient({ ...newPatient, birthdate: e.target.value })} />
            <input type="text" placeholder="Mobile No" value={newPatient.mobileno} onChange={(e) => setNewPatient({ ...newPatient, mobileno: e.target.value })} />
            <input type="text" placeholder="Address" value={newPatient.address} onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })} />
            <input type="email" placeholder="Email" value={newPatient.email} onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })} />
            <div>
              <label>Gender:</label>
              <input type="radio" name="gender" value="Male" checked={newPatient.gender === "Male"} onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })} /> Male
              <input type="radio" name="gender" value="Female" checked={newPatient.gender === "Female"} onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })} /> Female
            </div>
            <input type="number" placeholder="Age" value={newPatient.age} onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} />
            <input type="text" placeholder="Status" value={newPatient.status} onChange={(e) => setNewPatient({ ...newPatient, status: e.target.value })} />
            <input type="password" placeholder="Password" value={newPatient.password} onChange={(e) => setNewPatient({ ...newPatient, password: e.target.value })} />
            <button className="btn save" onClick={handleSave}>Save</button>
            <button className="btn cancel" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        )}
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Birthdate</th>
              <th>Mobile No</th>
              <th>Address</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{new Date(patient.birthdate).toLocaleDateString()}</td>
                <td>{patient.mobileno}</td>
                <td>{patient.address}</td>
                <td>{patient.email}</td>
                <td>{patient.gender}</td>
                <td>{patient.age}</td>
                <td>{patient.status}</td>
                <td>
                  <button className="btn edit" onClick={() => { setNewPatient(patient); setEditingPatient(patient); setShowForm(true); }}>Edit</button>
                  <button className="btn delete" onClick={() => handleDelete(patient.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePatient;
