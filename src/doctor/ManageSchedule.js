import React, { useState } from "react";
import "../styles/dashboard.css";

const ManageSchedule = () => {
  const [schedule, setSchedule] = useState([
    { id: 1, day: "Monday", time: "10:00 AM - 2:00 PM", booked: false },
    { id: 2, day: "Wednesday", time: "1:00 PM - 5:00 PM", booked: false },
  ]);

  const [newDay, setNewDay] = useState("");
  const [newTime, setNewTime] = useState("");

  const addSchedule = () => {
    if (newDay && newTime) {
      const newSlot = {
        id: schedule.length + 1,
        day: newDay,
        time: newTime,
        booked: false,
      };
      setSchedule([...schedule, newSlot]);
      setNewDay("");
      setNewTime("");
    }
  };

  const deleteSchedule = (id) => {
    setSchedule(schedule.filter((slot) => slot.id !== id));
  };

  const updateSchedule = (id) => {
    const updatedTime = prompt("Enter new time:");
    if (updatedTime) {
      setSchedule(
        schedule.map((slot) =>
          slot.id === id ? { ...slot, time: updatedTime } : slot
        )
      );
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Manage Schedule</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Day</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((slot) => (
            <tr key={slot.id} className={slot.booked ? "booked" : ""}>
              <td>{slot.id}</td>
              <td>{slot.day}</td>
              <td>{slot.time}</td>
              <td>
                <button onClick={() => updateSchedule(slot.id)}>Edit</button>
                <button onClick={() => deleteSchedule(slot.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="dashboard-content">
        <h3>Add New Schedule</h3>
        <input
          type="text"
          placeholder="Day"
          value={newDay}
          onChange={(e) => setNewDay(e.target.value)}
        />
        <input
          type="text"
          placeholder="Time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
        <button onClick={addSchedule} className="dashboard-btn">
          Add Schedule
        </button>
      </div>
    </div>
  );
};

export default ManageSchedule;