import React from "react";
import Sidebar from "../admin/Sidebar";
import "./dashboard.css";

const ManageDoctors = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Manage Doctors</h2>
        <button className="btn add">Add Clinic</button>
        <table className="data-table">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dr. Manoj Mavani</td>
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

export default ManageDoctors;
