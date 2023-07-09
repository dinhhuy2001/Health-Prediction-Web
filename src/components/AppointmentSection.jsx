import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Doctor from './Doctor';
import { useTranslation } from 'react-i18next';

const AppointmentSection = () => {
    const { t } = useTranslation();
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        axios
            .get('https://raw.githubusercontent.com/dinhhuy2001/fake-data-for-finalPbl/master/doctors.json')
            .then((res) => setDoctors(res.data));
    }, []);

    return (
        <div className="py-5">
            <h2 className="text-center blue-color">
                <FontAwesomeIcon icon={faCalendarCheck} /> {t('home.appoint_request')}
            </h2>
            <p className="text-center fs-5">{t('home.appoint_desc')}</p>
            <div className="container">
                <div className="row g-3">
                    {doctors.slice(0, 3).map((doctor) => (
                        <Doctor key={doctor.id} doctor={doctor}></Doctor>
                    ))}
                </div>
                <Link to="/appointment" className="text-decoration-none d-flex justify-content-end">
                    <button className="btn btn-secondary d-flex justify-content-center align-items-center">
                        {t('home.more_doctors')}
                        <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AppointmentSection;
