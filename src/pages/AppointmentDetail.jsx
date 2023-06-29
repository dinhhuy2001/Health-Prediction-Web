import { useNavigate, useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserNurse,
    faCalendar,
    faCoins,
    faPhone,
    faArrowLeft,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import CheckChatLogin from '../components/CheckChatLogin';
import { AuthContext } from '../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import AlertModal from '../components/Alert';

const AppointmentDetail = () => {
    const [doctors, setDoctors] = useState([]);
    const [success, setSuccess] = useState(false);
    const { currentUser } = useContext(AuthContext);

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

    const handleAppoint = async (e) => {
        e.preventDefault();

        const name = e.target[0].value;
        const email = e.target[1].value;
        const date = e.target[2].value;
        const time = e.target[3].value;
        const phone = e.target[4].value;
        const note = e.target[5].value;

        try {
            await setDoc(doc(db, 'appoint', currentUser.uid), {
                userName: name,
                doctorAppoint: specificDoctor?.name,
                email,
                date,
                time,
                phone,
                note,
            });
            setSuccess(true);
            document.querySelector('.appoint-btn').style.display = 'none';
        } catch (e) {
            console.log(e.messages);
        }
    };

    return (
        <div style={{ backgroundColor: '#f6f7fb' }}>
            {!currentUser && <AlertModal props={true} />}
            {currentUser && (
                <div className="service-detail container py-5">
                    <div className="p-3">
                        <button
                            onClick={handleBackBtn}
                            className="default-btn d-flex justify-content-center align-items-center"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Back
                        </button>
                    </div>
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
                                            <FontAwesomeIcon icon={faUserNurse} /> Specialty:
                                            {specificDoctor?.specialize}
                                        </h6>
                                        <h6 style={{ fontWeight: '600' }}>
                                            <FontAwesomeIcon icon={faCalendar} />
                                            <span>Open: {`${specificDoctor?.weekDays} ${specificDoctor?.time}`}</span>
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
                            <div className="well-block">
                                <div className="well-title text-center">
                                    <h2>Please fill this form</h2>
                                </div>
                                <form onSubmit={currentUser && handleAppoint}>
                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="name">
                                                    Name
                                                </label>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    placeholder="Name"
                                                    className="form-control input-md"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="email">
                                                    Email
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    placeholder="E-Mail"
                                                    className="form-control input-md"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="date">
                                                    Preferred Date
                                                </label>
                                                <input
                                                    id="date"
                                                    type="date"
                                                    placeholder="Preferred Date"
                                                    className="form-control input-md"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="time">
                                                    Preferred Time
                                                </label>
                                                <input
                                                    id="time"
                                                    type="time"
                                                    placeholder="Preferred Time"
                                                    className="form-control input-md"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-2">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="phone">
                                                    Phone Number
                                                </label>
                                                <input
                                                    id="phone"
                                                    type="text"
                                                    placeholder="Phone Number"
                                                    className="form-control input-md"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-2">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="note">
                                                    Notes
                                                </label>
                                                <textarea
                                                    id="note"
                                                    type="text"
                                                    placeholder="Notes"
                                                    className="form-control input-md"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group text-center">
                                                <button className="default-btn second-btn appoint-btn">
                                                    Make An Appointment
                                                </button>
                                            </div>
                                            {success && (
                                                <Link
                                                    to="/appointComplete"
                                                    style={{ textDecoration: 'none' }}
                                                    className="d-flex justify-content-end"
                                                >
                                                    <button className="default-btn second-btn">
                                                        View appointment <FontAwesomeIcon icon={faArrowRight} />
                                                    </button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <CheckChatLogin />
                </div>
            )}
        </div>
    );
};

export default AppointmentDetail;
