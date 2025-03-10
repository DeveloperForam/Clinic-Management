import React from "react";
import Sidebar from "../admin/Sidebar";
import "./dashboard.css";

const ManageClinics = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Manage Clinics</h2>
        <button className="btn add">Add Clinic</button>
        <table className="data-table">
          <thead>
            <tr>
              <th>Clinic Name</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>City Health Clinic</td>
              <td>New York</td>
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

export default ManageClinics;
