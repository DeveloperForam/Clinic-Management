import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../admin/Sidebar";
import "./dashboard.css";

const ManageClinics = () => {
  const [clinics, setClinics] = useState([]);
  const [clinicData, setClinicData] = useState({
    c_name: "",
    c_mobileno: "",
    c_address: "",
    c_email: ""
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const response = await axios.get("http://localhost:80/cms/fetchClinic.php");
      setClinics(response.data);
    } catch (error) {
      console.error("Error fetching clinics:", error);
    }
  };

  const handleInputChange = (e) => {
    setClinicData({ ...clinicData, [e.target.name]: e.target.value });
  };

  const addClinic = async () => {
    try {
      const response = await axios.post(
        "http://localhost/cms/addClinic.php",
        clinicData,
        {
          headers: { 
            "Content-Type": "application/json"
          },
          withCredentials: true, // Include credentials if required
        }
      );
      setClinics([...clinics, { id: response.data.id, ...clinicData }]); 
      setClinicData({ c_name: "", c_mobileno: "", c_address: "", c_email: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding clinic:", error);
    }
  };
  

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Manage Clinics</h2>
        <button className="btn add" onClick={() => setShowForm(true)}>Add Clinic</button>
        {showForm && (
          <div className="clinic-form">
            <input type="text" name="c_name" placeholder="Clinic Name" value={clinicData.c_name} onChange={handleInputChange} />
            <input type="text" name="c_mobileno" placeholder="Mobile No" value={clinicData.c_mobileno} onChange={handleInputChange} />
            <input type="text" name="c_address" placeholder="Address" value={clinicData.c_address} onChange={handleInputChange} />
            <input type="email" name="c_email" placeholder="Email" value={clinicData.c_email} onChange={handleInputChange} />
            <button className="btn add" onClick={addClinic}>Submit</button>
            <button className="btn cancel" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        )}
        <table className="data-table">
          <thead>
            <tr>
              <th>Clinic Name</th>
              <th>Mobile No</th>
              <th>Address</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clinics.map((clinic) => (
              <tr key={clinic.id}>
                <td>{clinic.c_name}</td>
                <td>{clinic.c_mobileno}</td>
                <td>{clinic.c_address}</td>
                <td>{clinic.c_email}</td>
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

export default ManageClinics;