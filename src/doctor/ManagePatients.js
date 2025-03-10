import React, { useState } from "react";
import "../styles/dashboard.css";

const ManagePatients = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", age: 30, condition: "Flu", doctor: "Dr. Smith" },
    { id: 2, name: "Jane Smith", age: 25, condition: "Cold", doctor: "Dr. Brown" },
  ]);

  const [newPatient, setNewPatient] = useState({ name: "", age: "", condition: "", doctor: "" });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const addPatient = () => {
    if (newPatient.name && newPatient.age && newPatient.condition && newPatient.doctor) {
      setPatients([...patients, { id: patients.length + 1, ...newPatient }]);
      setNewPatient({ name: "", age: "", condition: "", doctor: "" });
    }
  };

  const editPatient = (index) => {
    setNewPatient(patients[index]);
    setEditIndex(index);
  };

  const updatePatient = () => {
    const updatedPatients = [...patients];
    updatedPatients[editIndex] = { id: patients[editIndex].id, ...newPatient };
    setPatients(updatedPatients);
    setNewPatient({ name: "", age: "", condition: "", doctor: "" });
    setEditIndex(null);
  };

  const deletePatient = (id) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  return (
    <div className="dashboard-container">
      <h2>Doctor - Manage Patients</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Condition</th>
            <th>Doctor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.condition}</td>
              <td>{patient.doctor}</td>
              <td>
                <button className="dashboard-btn" onClick={() => editPatient(index)}>Edit</button>
                <button className="dashboard-btn logout" onClick={() => deletePatient(patient.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="dashboard-content">
        <h3>{editIndex !== null ? "Edit Patient" : "Add New Patient"}</h3>
        <input type="text" name="name" placeholder="Name" value={newPatient.name} onChange={handleInputChange} />
        <input type="number" name="age" placeholder="Age" value={newPatient.age} onChange={handleInputChange} />
        <input type="text" name="condition" placeholder="Condition" value={newPatient.condition} onChange={handleInputChange} />
        <input type="text" name="doctor" placeholder="Doctor's Name" value={newPatient.doctor} onChange={handleInputChange} />
        {editIndex !== null ? (
          <button className="dashboard-btn" onClick={updatePatient}>Update Patient</button>
        ) : (
          <button className="dashboard-btn" onClick={addPatient}>Add Patient</button>
        )}
      </div>
    </div>
  );
};

export default ManagePatients;
