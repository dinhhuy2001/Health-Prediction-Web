import Doctor from '../components/Doctor';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CheckChatLogin from '../components/CheckChatLogin';

const Appointment = () => {
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        axios
            .get('https://raw.githubusercontent.com/dinhhuy2001/fake-data-for-finalPbl/master/doctors.json')
            .then((res) => setDoctors(res.data));
    }, []);

    return (
        <div className="py-5" style={{ backgroundColor: 'rgb(246, 247, 251)' }}>
            <h2 className="text-center blue-color">Request Appointment</h2>
            <p className="text-center fs-5">Make sure to make an appointment before visiting our clinic</p>
            <div className="container">
                <div className="row g-3">
                    {doctors.map((doctor) => (
                        <Doctor key={doctor.id} doctor={doctor}></Doctor>
                    ))}
                </div>
            </div>
            <CheckChatLogin />
        </div>
    );
};

export default Appointment;
