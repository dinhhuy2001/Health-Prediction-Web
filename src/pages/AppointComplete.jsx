import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNurse, faCalendar, faCoins, faPhone, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CheckChatLogin from '../components/CheckChatLogin';
import { AuthContext } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useTranslation } from 'react-i18next';

const AppointComplete = () => {
    const { t } = useTranslation();
    const [doctors, setDoctors] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [appointInfo, setAppointInfo] = useState({});
    const [appointState, setAppointState] = useState('');
    useEffect(() => {
        axios
            .get('https://raw.githubusercontent.com/dinhhuy2001/fake-data-for-finalPbl/master/doctors.json')
            .then((res) => setDoctors(res.data));
    }, []);

    const getAppoint = async () => {
        const docRef = doc(db, 'appoint', currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setAppointInfo(docSnap.data());
            if (appointInfo.isAccepted) {
                setAppointState('accepted');
            } else if (appointInfo.isCanceled) {
                setAppointState('canceled');
            } else {
                setAppointState('requested');
            }
        } else {
            console.log('No such appoint');
        }
    };

    useEffect(() => {
        getAppoint();
    });

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
                            <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> {t('common.back_btn')}
                        </button>
                    </div>
                    <h2 className="text-center blue-color">{t('appoint.appoint_dt_title')}</h2>
                    <div className="row gy-5">
                        <div className="col-12 col-md-5">
                            <div className="p-3">
                                <div className="card">
                                    <img src={specificDoctor?.pic} className="card-img-top" alt="..." height="250" />
                                    <div className="card-body">
                                        <h4 className="card-title text-center" style={{ fontWeight: '600' }}>
                                            {specificDoctor?.name}
                                        </h4>
                                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                                            <FontAwesomeIcon icon={faUserNurse} />
                                            <span>
                                                {t('appoint.specialty')} {specificDoctor?.specialize}
                                            </span>
                                        </h6>
                                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                                            <FontAwesomeIcon icon={faCalendar} />
                                            <span>
                                                {t('appoint.open')}
                                                {`${specificDoctor?.weekDays} ${specificDoctor?.time}`}
                                            </span>
                                        </h6>
                                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                                            <FontAwesomeIcon icon={faCoins} />
                                            <span>
                                                {t('appoint.fee')} {specificDoctor?.fees}$
                                            </span>
                                        </h6>
                                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                                            <FontAwesomeIcon icon={faPhone} />
                                            <span>
                                                {t('appoint.phone')} {specificDoctor?.phone}
                                            </span>
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
                                            {appointState === 'requested' && (
                                                <span className="badge rounded-pill text-bg-info">Requested</span>
                                            )}
                                            {appointState === 'accepted' && (
                                                <span className="badge rounded-pill text-bg-success">Accepted</span>
                                            )}
                                            {appointState === 'canceled' && (
                                                <span className="badge rounded-pill text-bg-danger">Canceled</span>
                                            )}
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="name">
                                                    <span>{t('appoint.dt_desc1')} </span> {appointInfo?.patientName}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="email">
                                                    <span>{t('appoint.dt_desc2')} </span> {appointInfo?.email}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="date">
                                                    <span>{t('appoint.dt_desc3')} </span> {appointInfo?.date}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="time">
                                                    <span>{t('appoint.dt_desc4')} </span> {appointInfo?.time}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="phone">
                                                    <span>{t('appoint.dt_desc5')} </span> {appointInfo?.phone}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="note">
                                                    <span>{t('appoint.dt_desc6')}</span> {appointInfo?.note}
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
