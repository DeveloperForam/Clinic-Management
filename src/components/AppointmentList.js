import React, { useEffect, useState } from "react";
import { getAppointments, cancelAppointment } from "../services/api";

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        const response = await getAppointments();
        setAppointments(response.data);
    };

    const handleCancel = async (id) => {
        await cancelAppointment(id);
        fetchAppointments();
    };

    return (
        <div>
            <h2>Appointments</h2>
            <ul>
                {appointments.map((appt) => (
                    <li key={appt.id}>
                        {appt.appointment_date} - Doctor ID: {appt.doctor_id}
                        <button onClick={() => handleCancel(appt.id)}>Cancel</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;
