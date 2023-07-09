import CheckChatLogin from '../components/CheckChatLogin';
import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faCalendar, faClock, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';
import { useTranslation } from 'react-i18next';

const DoctorSchedule = () => {
    const [appointData, setAppointData] = useState([]);
    const { t } = useTranslation();
    const [acceptAppoint, setAcceptAppoint] = useState([]);
    const [dateTimeAppoint, setDateTimeAppoint] = useState([]);

    let arr;
    let arr1;
    let arr2;

    const { currentUser } = useContext(AuthContext);

    const getAppointData = async () => {
        const docRef = doc(db, 'doctors', currentUser.uid);
        const docSnap = await getDoc(docRef);
        arr1 = docSnap.data().appoint;
        const newArr1 = arr1.filter((value) => value.isAccepted === false && value.isCanceled === false);
        setAppointData(newArr1);
    };

    const getAcceptAppoint = async () => {
        const docRef = doc(db, 'doctors', currentUser.uid);
        const docSnap = await getDoc(docRef);
        arr2 = docSnap.data().appoint;
        const newArr2 = arr2.filter((value) => value.isAccepted === true);
        setAcceptAppoint(newArr2);
    };

    const checkAppointState = () => {
        const dateAndTimeArray = acceptAppoint.map((appointment) => ({
            date: appointment.date,
            time: appointment.time,
        }));
        setDateTimeAppoint(dateAndTimeArray);
    };
    useEffect(() => {
        getAppointData();
        getAcceptAppoint();
        checkAppointState();
    }, [appointData]);

    const handleAccept = async (index) => {
        const docRef = doc(db, 'doctors', currentUser.uid);
        const docSnap = await getDoc(docRef);
        arr = docSnap.data().appoint;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].patientName === index.patientName) {
                await updateDoc(doc(db, 'doctors', currentUser.uid), {
                    appoint: arrayUnion({
                        patientName: arr[i].patientName,
                        photoURL: arr[i].photoURL,
                        patientId: arr[i].patientId,
                        email: arr[i].email,
                        date: arr[i].date,
                        time: arr[i].time,
                        phone: arr[i].phone,
                        note: arr[i].note,
                        isAccepted: true,
                        isCanceled: false,
                    }),
                });

                await updateDoc(doc(db, 'appoint', arr[i].patientId), {
                    patientName: arr[i].patientName,
                    doctorAppoint: currentUser.displayName,
                    photoURL: arr[i].photoURL,
                    email: arr[i].email,
                    date: arr[i].date,
                    time: arr[i].time,
                    phone: arr[i].phone,
                    note: arr[i].note,
                    isAccepted: true,
                    isCanceled: false,
                });
                await updateDoc(doc(db, 'doctors', currentUser.uid), {
                    appoint: arrayRemove({
                        patientName: arr[i].patientName,
                        photoURL: arr[i].photoURL,
                        patientId: arr[i].patientId,
                        email: arr[i].email,
                        date: arr[i].date,
                        time: arr[i].time,
                        phone: arr[i].phone,
                        note: arr[i].note,
                        isAccepted: false,
                        isCanceled: false,
                    }),
                });
            }
        }
    };

    const handleCancel = async (index) => {
        const docRef = doc(db, 'doctors', currentUser.uid);
        const docSnap = await getDoc(docRef);
        arr = docSnap.data().appoint;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].patientName === index.patientName) {
                await updateDoc(doc(db, 'doctors', currentUser.uid), {
                    appoint: arrayUnion({
                        patientName: arr[i].patientName,
                        photoURL: arr[i].photoURL,
                        patientId: arr[i].patientId,
                        email: arr[i].email,
                        date: arr[i].date,
                        time: arr[i].time,
                        phone: arr[i].phone,
                        note: arr[i].note,
                        isAccepted: false,
                        isCanceled: true,
                    }),
                });
                await updateDoc(doc(db, 'appoint', arr[i].patientId), {
                    patientName: arr[i].patientName,
                    doctorAppoint: currentUser.displayName,
                    photoURL: arr[i].photoURL,
                    email: arr[i].email,
                    date: arr[i].date,
                    time: arr[i].time,
                    phone: arr[i].phone,
                    note: arr[i].note,
                    isAccepted: false,
                    isCanceled: true,
                });
                await updateDoc(doc(db, 'doctors', currentUser.uid), {
                    appoint: arrayRemove({
                        patientName: arr[i].patientName,
                        photoURL: arr[i].photoURL,
                        patientId: arr[i].patientId,
                        email: arr[i].email,
                        date: arr[i].date,
                        time: arr[i].time,
                        phone: arr[i].phone,
                        note: arr[i].note,
                        isAccepted: false,
                        isCanceled: false,
                    }),
                });
            }
        }
    };
    console.log(dateTimeAppoint);
    return (
        <>
            <div className="py-4" style={{ backgroundColor: 'rgb(246, 247, 251)' }}>
                <h2 className="text-center blue-color mt-4">{t('appoint.appointList')}</h2>
                <div className="container mt-4">
                    <div className="row g-3">
                        {acceptAppoint.map((index, key) => (
                            <div className="col-12 col-md-6 col-lg-4" key={key}>
                                <div className="card">
                                    <img
                                        src={index.photoURL}
                                        className="card-img-top"
                                        alt="..."
                                        height="250"
                                        style={{ objectFit: 'contain' }}
                                    />
                                    <div className="card-body">
                                        <h4 className="card-title text-center" style={{ fontWeight: '600' }}>
                                            {index.patientName}
                                        </h4>
                                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                            <span>
                                                {t('appoint.dt_desc2')} {index.email}
                                            </span>
                                        </h6>
                                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                                            <FontAwesomeIcon icon={faPhone} />
                                            <span>
                                                {t('appoint.phone')} {index.phone}
                                            </span>
                                        </h6>
                                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                                            <FontAwesomeIcon icon={faCalendar} />
                                            <span>
                                                {t('appoint.date')}
                                                {index.date}
                                            </span>
                                        </h6>
                                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                                            <FontAwesomeIcon icon={faClock} />
                                            <span>
                                                {t('appoint.time')} {index.time}
                                            </span>
                                        </h6>
                                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                                            <FontAwesomeIcon icon={faNoteSticky} />
                                            <span>
                                                {t('appoint.dt_desc6')} {index.note}
                                            </span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <h2 className="text-center blue-color mt-4">{t('appoint.requestList')}</h2>
                <div className="container mt-4">
                    <div className="row g-4">
                        {appointData.map((index, key) => (
                            <div className="col-12 col-md-6 col-lg-4" key={key}>
                                <div className="card">
                                    <img
                                        src={index.photoURL}
                                        className="card-img-top"
                                        alt="..."
                                        height="250"
                                        style={{ objectFit: 'contain' }}
                                    />
                                    <div className="card-body">
                                        <h4 className="card-title text-center" style={{ fontWeight: '600' }}>
                                            {index.patientName}
                                        </h4>
                                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                                            <FontAwesomeIcon icon={faEnvelope} />{' '}
                                            <span>
                                                {t('appoint.dt_desc2')} {index.email}
                                            </span>
                                        </h6>
                                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                                            <FontAwesomeIcon icon={faPhone} />{' '}
                                            <span>
                                                {t('appoint.phone')} {index.phone}
                                            </span>
                                        </h6>
                                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                                            <FontAwesomeIcon icon={faCalendar} />{' '}
                                            <span>
                                                {t('appoint.date')}: {index.date}
                                            </span>
                                        </h6>
                                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                                            <FontAwesomeIcon icon={faClock} />{' '}
                                            <span>
                                                {t('appoint.time')} {index.time}
                                            </span>
                                        </h6>
                                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                                            <FontAwesomeIcon icon={faNoteSticky} />{' '}
                                            <span>
                                                {t('appoint.dt_desc6')} {index.note}
                                            </span>
                                        </h6>
                                        <div className="text-center m-2">
                                            {!dateTimeAppoint.some(
                                                (item) => item.date !== index.date && item.time !== index.time,
                                            ) && (
                                                <span className="badge rounded-pill text-bg-info">
                                                    {t('appoint.available')}
                                                </span>
                                            )}
                                            {dateTimeAppoint.some(
                                                (item) => item.date === index.date && item.time === index.time,
                                            ) && (
                                                <span className="badge rounded-pill text-bg-warning">
                                                    {t('appoint.overlap')}
                                                </span>
                                            )}
                                        </div>
                                        <div
                                            className="request-form-btn d-flex text-center justify-content-center"
                                            style={{ gap: '16px' }}
                                        >
                                            <button
                                                className="btn btn-success"
                                                onClick={() => handleAccept(index)}
                                                type="button"
                                            >
                                                {t('appoint.accept')}
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleCancel(index)}
                                                type="button"
                                            >
                                                {t('appoint.cancel')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <CheckChatLogin />
            </div>
        </>
    );
};

export default DoctorSchedule;
