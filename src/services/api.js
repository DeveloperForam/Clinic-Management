import axios from "axios";

const API_URL = "http://localhost/backend/appointment.php";

export const bookAppointment = async (appointmentData) => {
    return await axios.post(`${API_URL}/appointment.php`, appointmentData);
};

export const getAppointments = async () => {
    return await axios.get(`${API_URL}/appointment.php`);
};

export const cancelAppointment = async (appointmentId) => {
    return await axios.delete(`${API_URL}/appointment.php`, {
        data: { id: appointmentId },
    });
};
