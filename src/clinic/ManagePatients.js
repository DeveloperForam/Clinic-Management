import React from "react";
import "./clinicDashboard.css";
import ClinicSidebar from "./ClinicSidebar";

const ManagePatients = () => {
  return (
    <div className="clinic-dashboard">
      <ClinicSidebar />
    <div className="dashboard-content">
      <h1 className="dashboard-title">Manage Patients</h1>
      <button className="btn add">Add Patient</button>
      <table className="data-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Age</th>
            <th>Contact</th>
            <th>Last Visit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jane Doe</td>
            <td>28</td>
            <td>+123456789</td>
            <td>Feb 25, 2025</td>
            <td>
              <button className="btn edit">Edit</button>
              <button className="btn delete">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ManagePatients;
