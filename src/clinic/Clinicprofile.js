import React, { useState, useEffect } from "react";
import "./clinicprofile.css"; // CSS for styling

const Clinicprofile = () => {
    const [clinicDetails, setClinicDetails] = useState({
        email: "heartline@gmail.com", // Dummy email
        password: "******" // Dummy password
    });

    useEffect(() => {
        // Fetch from local storage if available
        const storedEmail = localStorage.getItem("clinicEmail");
        const storedPassword = localStorage.getItem("clinicPassword");

        if (storedEmail && storedPassword) {
            setClinicDetails({ email: storedEmail, password: storedPassword });
        }
    }, []);

    return (
        <div className="clinic-profile-container">
            <h2 className="profile-title">Clinic Profile</h2>
            <div className="profile-box">
                <p> <strong>Clinic Name: Heart Line</strong></p>
                <p><strong>Reference Id: 7383</strong></p>
                <p><strong>Email:</strong> {clinicDetails.email}</p>
                <p><strong>Password:</strong> {clinicDetails.password}</p>
            </div>
        </div>
    );
};

export default Clinicprofile;
