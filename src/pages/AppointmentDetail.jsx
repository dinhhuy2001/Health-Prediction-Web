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
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import AlertModal from '../components/Alert';
import { collection, where, query, getDocs } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

const AppointmentDetail = () => {
    const { t } = useTranslation();
    const [doctors, setDoctors] = useState([]);
    const [success, setSuccess] = useState(false);
    const { currentUser } = useContext(AuthContext);
    let uid = '';

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

        const q = query(collection(db, 'doctors'), where('displayName', '==', specificDoctor?.name));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            uid = doc.data().uid;
        });

        try {
            const docRef = doc(db, 'appoint', currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists() && docSnap.data().isCanceled) {
                await updateDoc(doc(db, 'appoint', currentUser.uid), {
                    patientName: name,
                    doctorAppoint: specificDoctor?.name,
                    email,
                    date,
                    doctorUid: uid,
                    time,
                    phone,
                    note,
                    isAccepted: false,
                    isCanceled: false,
                });
                await updateDoc(doc(db, 'doctors', uid), {
                    appoint: arrayRemove({
                        patientName: localStorage.getItem('name'),
                        patientId: currentUser.uid,
                        photoURL: currentUser.photoURL,
                        email: localStorage.getItem('emailCheck'),
                        date: localStorage.getItem('date'),
                        time: localStorage.getItem('time'),
                        phone: localStorage.getItem('phone'),
                        note: localStorage.getItem('note'),
                        isAccepted: false,
                        isCanceled: true,
                    }),
                });
                await updateDoc(doc(db, 'doctors', uid), {
                    appoint: arrayUnion({
                        patientName: name,
                        patientId: currentUser.uid,
                        photoURL: currentUser.photoURL,
                        email,
                        date,
                        time,
                        phone,
                        note,
                        isAccepted: false,
                        isCanceled: false,
                    }),
                });
                localStorage.setItem('name', name);
                localStorage.setItem('emailCheck', email);
                localStorage.setItem('date', date);
                localStorage.setItem('time', time);
                localStorage.setItem('phone', phone);
                localStorage.setItem('note', note);
                setSuccess(true);
            }

            if (!docSnap.exists()) {
                await updateDoc(doc(db, 'doctors', uid), {
                    appoint: arrayUnion({
                        patientName: name,
                        patientId: currentUser.uid,
                        photoURL: currentUser.photoURL,
                        email,
                        date,
                        time,
                        phone,
                        note,
                        isAccepted: false,
                        isCanceled: false,
                    }),
                });
                await setDoc(doc(db, 'appoint', currentUser.uid), {
                    patientName: name,
                    doctorAppoint: specificDoctor?.name,
                    email,
                    date,
                    doctorUid: uid,
                    time,
                    phone,
                    note,
                    isAccepted: false,
                    isCanceled: false,
                });
                localStorage.setItem('name', name);
                localStorage.setItem('emailCheck', email);
                localStorage.setItem('date', date);
                localStorage.setItem('time', time);
                localStorage.setItem('phone', phone);
                localStorage.setItem('note', note);
                setSuccess(true);
            }

            if (docSnap.exists() && docSnap.data().isAccepted) {
                setSuccess(false);
                alert('appoint exist');
            }
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
                            <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> {t('common.back_btn')}
                        </button>
                    </div>
                    <h2 className="text-center blue-color">{t('home.appoint_request')}</h2>
                    <p className="text-center fs-5">{t('home.appoint_desc')}</p>
                    <div className="row g-5">
                        <div className="col-12 col-md-5 col-lg-4">
                            <div className="p-3">
                                <div className="card">
                                    <img src={specificDoctor?.pic} className="card-img-top" alt="..." height="250" />
                                    <div className="card-body">
                                        <h4 className="card-title text-center" style={{ fontWeight: '600' }}>
                                            {specificDoctor?.name}
                                        </h4>
                                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                                            <FontAwesomeIcon icon={faUserNurse} />{' '}
                                            <span>
                                                {t('appoint.specialty')}
                                                {specificDoctor?.specialize}
                                            </span>
                                        </h6>
                                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                                            <FontAwesomeIcon icon={faCalendar} />
                                            <span>
                                                {t('appoint.open')}{' '}
                                                {`${specificDoctor?.weekDays} ${specificDoctor?.time}`}
                                            </span>
                                        </h6>
                                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                                            <FontAwesomeIcon icon={faCoins} />{' '}
                                            <span>
                                                {t('appoint.fee')} {specificDoctor?.fees}$
                                            </span>
                                        </h6>
                                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                                            <FontAwesomeIcon icon={faPhone} />{' '}
                                            <span>
                                                {t('appoint.phone')} {specificDoctor?.phone}
                                            </span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-7 col-lg-7" style={{ marginLeft: '20px' }}>
                            <div className="well-block">
                                <div className="well-title text-center">
                                    <h2>{t('appoint.form_title')}</h2>
                                </div>
                                <form onSubmit={currentUser && handleAppoint}>
                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label
                                                    className="control-label"
                                                    htmlFor="name"
                                                    style={{ fontWeight: '600' }}
                                                >
                                                    {t('appoint.label1')}
                                                </label>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    placeholder={t('appoint.label1')}
                                                    className="form-control input-md mt-1"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label
                                                    className="control-label"
                                                    htmlFor="email"
                                                    style={{ fontWeight: '600' }}
                                                >
                                                    {t('appoint.label2')}
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    placeholder={t('appoint.label2')}
                                                    className="form-control input-md mt-1"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label
                                                    className="control-label"
                                                    htmlFor="date"
                                                    style={{ fontWeight: '600' }}
                                                >
                                                    {t('appoint.label3')}
                                                </label>
                                                <input
                                                    id="date"
                                                    type="date"
                                                    placeholder={t('appoint.label3')}
                                                    className="form-control input-md mt-1"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label
                                                    className="control-label"
                                                    htmlFor="time"
                                                    style={{ fontWeight: '600' }}
                                                >
                                                    {t('appoint.label4')}
                                                </label>
                                                <input
                                                    id="time"
                                                    type="time"
                                                    placeholder={t('appoint.label4')}
                                                    className="form-control input-md mt-1"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-2">
                                            <div className="form-group">
                                                <label
                                                    className="control-label"
                                                    htmlFor="phone"
                                                    style={{ fontWeight: '600' }}
                                                >
                                                    {t('appoint.label5')}
                                                </label>
                                                <input
                                                    id="phone"
                                                    type="text"
                                                    placeholder={t('appoint.label5')}
                                                    className="form-control input-md mt-1"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-2">
                                            <div className="form-group">
                                                <label
                                                    className="control-label"
                                                    htmlFor="note"
                                                    style={{ fontWeight: '600' }}
                                                >
                                                    {t('appoint.label6')}
                                                </label>
                                                <textarea
                                                    id="note"
                                                    type="text"
                                                    rows="3"
                                                    placeholder={t('appoint.label6')}
                                                    className="form-control input-md mt-1"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-2"></div>
                                        <div className="col-md-12">
                                            {!success && (
                                                <div className="form-group text-center">
                                                    <button className="default-btn second-btn appoint-btn">
                                                        {t('appoint.appoint_btn1')}
                                                    </button>
                                                </div>
                                            )}
                                            {success && (
                                                <Link
                                                    to="/appointComplete"
                                                    style={{ textDecoration: 'none' }}
                                                    className="d-flex justify-content-end"
                                                >
                                                    <button
                                                        className="default-btn second-btn"
                                                        style={{
                                                            display: 'flex',
                                                            gap: '10px',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        {t('appoint.appoint_btn2')}
                                                        <FontAwesomeIcon icon={faArrowRight} />
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
