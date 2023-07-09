import React from 'react';
import { Link } from 'react-router-dom';
import Service from './Service';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const ServiceSection = () => {
    const [services, setServices] = useState([]);
    const { t } = useTranslation();
    useEffect(() => {
        axios
            .get('https://raw.githubusercontent.com/dinhhuy2001/fake-data-for-finalPbl/master/services.json')
            .then((res) => setServices(res.data));
    }, []);

    return (
        <div className="my-5">
            <h2 className="text-center blue-color">
                <FontAwesomeIcon icon={faFlask} /> {t('home.our_main_service')}
            </h2>
            <p className="text-center fs-5">{t('home.service_description')}</p>
            <div className="container">
                <div className="row g-3">
                    {services.slice(0, 3).map((service) => (
                        <Service key={service.id} service={service}></Service>
                    ))}
                </div>
                <Link to="/services" className="text-decoration-none d-flex justify-content-end">
                    <button className="btn btn-secondary d-flex justify-content-center align-items-center">
                        {t('home.more_service')}
                        <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceSection;
