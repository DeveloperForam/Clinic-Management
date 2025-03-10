import React from "react";
import "./clinicDashboard.css";
import ClinicSidebar from "./ClinicSidebar";

const ManageSchedule = () => {
  return (
    <div className="clinic-dashboard">
      <ClinicSidebar />
    <div className="dashboard-content">
      <h1 className="dashboard-title">Manage Schedule</h1>
      <button className="btn add">Add Schedule</button>
      <table className="data-table">
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Available Days</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dr. Smith</td>
            <td>Mon, Wed, Fri</td>
            <td>10 AM - 2 PM</td>
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

export default ManageSchedule;
