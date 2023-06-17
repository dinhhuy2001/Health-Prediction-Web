import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNurse, faCalendar, faCoins, faPhone, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CheckChatLogin from '../components/CheckChatLogin';

const AppointmentDetail = () => {
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        axios
            .get('https://raw.githubusercontent.com/dinhhuy2001/fake-data-for-finalPbl/master/doctors.json')
            .then((res) => setDoctors(res.data));
    }, []);
    const { doctorId } = useParams();
    const specificDoctor = doctors.find((doctor) => doctor.id === doctorId);
    const navigate = useNavigate();
    const handleBackBtn = () => {
        navigate('/appointment');
    };
    return (
        <div style={{ backgroundColor: '#f6f7fb' }}>
            <div className="service-detail container py-5">
                <h2 className="text-center blue-color">Request Appointment</h2>
                <p className="text-center fs-5">Make sure to make an appointment before visiting our clinic</p>
                <div className="row gy-5">
                    <div className="col-12 col-md-5">
                        <div className="p-3">
                            <div className="card">
                                <img src={specificDoctor?.pic} className="card-img-top" alt="..." height="200" />
                                <div className="card-body">
                                    <h4 className="card-title text-center" style={{ fontWeight: '600' }}>
                                        {specificDoctor?.name}
                                    </h4>
                                    <h6 style={{ fontWeight: '600' }}>
                                        <FontAwesomeIcon icon={faUserNurse} /> Specialty: {specificDoctor?.specialize}
                                    </h6>
                                    <h6 style={{ fontWeight: '600' }}>
                                        <FontAwesomeIcon icon={faCalendar} /> Open: {specificDoctor?.weekDays}
                                        {specificDoctor?.time}
                                    </h6>
                                    <h6 style={{ fontWeight: '600' }}>
                                        <FontAwesomeIcon icon={faCoins} /> Fee: {specificDoctor?.fees}$
                                    </h6>
                                    <h6 style={{ fontWeight: '600' }}>
                                        <FontAwesomeIcon icon={faPhone} /> Phone: {specificDoctor?.phone}
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-7">
                        <div className="p-3">
                            <button
                                onClick={handleBackBtn}
                                className="default-btn d-flex justify-content-center align-items-center mx-auto mt-4"
                            >
                                <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Back
                            </button>
                        </div>
                    </div>
                </div>
                <CheckChatLogin />
            </div>
        </div>
    );
};

export default AppointmentDetail;
