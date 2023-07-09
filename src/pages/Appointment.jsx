import Doctor from '../components/Doctor';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CheckChatLogin from '../components/CheckChatLogin';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

const Appointment = () => {
    const { t } = useTranslation();
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        axios
            .get('https://raw.githubusercontent.com/dinhhuy2001/fake-data-for-finalPbl/master/doctors.json')
            .then((res) => setDoctors(res.data));
    }, []);

    return (
        <div className="py-5" style={{ backgroundColor: 'rgb(246, 247, 251)' }}>
            <h2 className="text-center blue-color">
                <FontAwesomeIcon icon={faCalendarCheck} /> {t('home.appoint_request')}
            </h2>
            <p className="text-center fs-5">{t('home.appoint_desc')}</p>
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
