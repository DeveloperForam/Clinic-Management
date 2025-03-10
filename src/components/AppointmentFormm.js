import React, { useState } from "react";
import "./Appointment.css";

const AppointmentFormm = ({ doctor, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    problem: "",
    history: "",
    dob: "",
    reports: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.mobile.match(/^\d{10}$/)) newErrors.mobile = "Enter a valid 10-digit mobile number";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.problem) newErrors.problem = "Describe your problem";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
  
      setTimeout(() => {
        setSubmitted(false); // Reset form after showing the message
        onClose(); // Close modal
      }, 1500);
    }
  };
  

  return (
    <div className="modal">
      <div className="form-container">
        <h2>Book Appointment with {doctor.name}</h2>
        {submitted ? (
          <p className="success-message">Appointment added successfully!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <span className="error">{errors.name}</span>}

            <label>Mobile Number</label>
            <input
              type="text"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
            {errors.mobile && <span className="error">{errors.mobile}</span>}

            <label>Date of Birth</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            />
            {errors.dob && <span className="error">{errors.dob}</span>}

            <label>Problem Description</label>
            <textarea
              value={formData.problem}
              onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
            ></textarea>
            {errors.problem && <span className="error">{errors.problem}</span>}

            <label>Past Medical History</label>
            <textarea
              value={formData.history}
              onChange={(e) => setFormData({ ...formData, history: e.target.value })}
            ></textarea>

            <label>Upload Reports</label>
            <input
              type="file"
              onChange={(e) => setFormData({ ...formData, reports: e.target.files[0] })}
            />

            <button type="submit">Submit</button>
          </form>
        )}
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AppointmentFormm;
