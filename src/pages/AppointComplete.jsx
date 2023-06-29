import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNurse, faCalendar, faCoins, faPhone, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CheckChatLogin from '../components/CheckChatLogin';
import { AuthContext } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AppointComplete = () => {
    const [doctors, setDoctors] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [appointInfo, setAppointInfo] = useState({});
    useEffect(() => {
        axios
            .get('https://raw.githubusercontent.com/dinhhuy2001/fake-data-for-finalPbl/master/doctors.json')
            .then((res) => setDoctors(res.data));
    }, []);
    useEffect(() => {
        getAppoint();
    }, []);

    const getAppoint = async () => {
        const docRef = doc(db, 'appoint', currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setAppointInfo(docSnap.data());
        } else {
            console.log('No such appoint');
        }
    };

    const specificDoctor = doctors.find((doctor) => doctor.name === appointInfo.doctorAppoint);
    const navigate = useNavigate();
    const handleBackBtn = () => {
        navigate(-1);
    };

    return (
        <>
            <div style={{ backgroundColor: '#f6f7fb' }}>
                <div className="service-detail container py-5">
                    <div className="p-3">
                        <button
                            onClick={handleBackBtn}
                            className="default-btn d-flex justify-content-center align-items-center"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Back
                        </button>
                    </div>
                    <h2 className="text-center blue-color">Your Appointment Detail</h2>
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
                                            <FontAwesomeIcon icon={faUserNurse} /> Specialty:{' '}
                                            {specificDoctor?.specialize}
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
                            <div className="appoint-complete">
                                <form>
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="name">
                                                    <span>Username: </span> {appointInfo?.userName}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="email">
                                                    <span>Email: </span> {appointInfo?.email}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="date">
                                                    <span>Appointment Date: </span> {appointInfo?.date}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="time">
                                                    <span>Appointment Time: </span> {appointInfo?.time}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="phone">
                                                    <span>Phone Number: </span> {appointInfo?.phone}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="note">
                                                    <span>Notes: </span> {appointInfo?.note}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <CheckChatLogin />
                </div>
            </div>
        </>
    );
};

export default AppointComplete;
