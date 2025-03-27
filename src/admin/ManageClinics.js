import React, { useState, useEffect } from "react";
import Sidebar from "../admin/Sidebar";
import "./dashboard.css";

const ManageClinics = () => {
  const [clinics, setClinics] = useState([]);
  const [clinicData, setClinicData] = useState({
    c_name: "",
    c_mobileno: "",
    c_address: "",
    c_email: "",
    c_password: "",
    reference_id: "", // New field added
  });
  const [showForm, setShowForm] = useState(false);
  const [editingClinicId, setEditingClinicId] = useState(null);

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/clinic", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setClinics(data);
    } catch (error) {
      console.error("Error fetching clinics:", error);
    }
  };

  const handleInputChange = (e) => {
    setClinicData({ ...clinicData, [e.target.name]: e.target.value });
  };

  const addClinic = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/clinic/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clinic_name: clinicData.c_name,
          mobile_no: clinicData.c_mobileno,
          address: clinicData.c_address,
          email: clinicData.c_email,
          password: clinicData.c_password,
          reference_id: clinicData.reference_id, // Added reference_id
        }),
      });

      if (response.ok) {
        fetchClinics();
        setClinicData({ c_name: "", c_mobileno: "", c_address: "", c_email: "", c_password: "", reference_id: "" });
        setShowForm(false);
      } else {
        console.error("Error adding clinic");
      }
    } catch (error) {
      console.error("Error adding clinic:", error);
    }
  };

  const updateClinic = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/clinic/update/${editingClinicId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clinic_name: clinicData.c_name,
          mobile_no: clinicData.c_mobileno,
          address: clinicData.c_address,
          email: clinicData.c_email,
          password: clinicData.c_password,
          reference_id: clinicData.reference_id, // Added reference_id
        }),
      });

      if (response.ok) {
        fetchClinics();
        setClinicData({ c_name: "", c_mobileno: "", c_address: "", c_email: "", c_password: "", reference_id: "" });
        setShowForm(false);
        setEditingClinicId(null);
      } else {
        console.error("Error updating clinic");
      }
    } catch (error) {
      console.error("Error updating clinic:", error);
    }
  };

  const deleteClinic = async (clinicId) => {
    if (window.confirm("Are you sure you want to delete this clinic?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/clinic/delete/${clinicId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          fetchClinics();
        } else {
          console.error("Error deleting clinic");
        }
      } catch (error) {
        console.error("Error deleting clinic:", error);
      }
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Manage Clinics</h2>
        <button className="btn add" onClick={() => { setShowForm(true); setEditingClinicId(null); }}>Add Clinic</button>

        {showForm && (
          <div className="clinic-form">
            <input type="text" name="c_name" placeholder="Clinic Name" value={clinicData.c_name} onChange={handleInputChange} />
            <input type="text" name="c_mobileno" placeholder="Mobile No" value={clinicData.c_mobileno} onChange={handleInputChange} />
            <input type="text" name="c_address" placeholder="Address" value={clinicData.c_address} onChange={handleInputChange} />
            <input type="email" name="c_email" placeholder="Email" value={clinicData.c_email} onChange={handleInputChange} />
            <input type="password" name="c_password" placeholder="Password" value={clinicData.c_password} onChange={handleInputChange} />
            {/* <input type="text" name="reference_id" placeholder="Reference ID" value={clinicData.reference_id} onChange={handleInputChange} /> New input field */}
            
            {editingClinicId ? (
              <button className="btn edit" onClick={updateClinic}>Update</button>
            ) : (
              <button className="btn add" onClick={addClinic}>Submit</button>
            )}
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
              <th>Reference ID</th> {/* New column */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clinics.map((clinic) => (
              <tr key={clinic.id}>
                <td>{clinic.clinic_name}</td>
                <td>{clinic.mobile_no}</td>
                <td>{clinic.address}</td>
                <td>{clinic.email}</td>
                <td>{clinic.reference_id}</td> {/* Displaying reference_id */}
                <td>
                  <button
                    className="btn edit"
                    onClick={() => {
                      setEditingClinicId(clinic.id);
                      setClinicData({
                        c_name: clinic.clinic_name,
                        c_mobileno: clinic.mobile_no,
                        c_address: clinic.address,
                        c_email: clinic.email,
                        c_password: "",
                        reference_id: clinic.reference_id, // Populate reference_id when editing
                      });
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button className="btn delete" onClick={() => deleteClinic(clinic.id)}>Delete</button>
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
