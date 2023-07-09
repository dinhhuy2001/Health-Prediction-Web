import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNurse, faCalendar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CheckChatLogin from '../components/CheckChatLogin';
import { useTranslation } from 'react-i18next';

const ServiceDetail = () => {
    const [services, setServices] = useState([]);
    const { t } = useTranslation();
    useEffect(() => {
        axios
            .get('https://raw.githubusercontent.com/dinhhuy2001/fake-data-for-finalPbl/master/services.json')
            .then((res) => setServices(res.data));
    }, []);
    const { serviceId } = useParams();
    const specificService = services.find((service) => service.id === serviceId);
    console.log(serviceId);
    console.log(specificService);
    const navigate = useNavigate();
    const handleBackBtn = () => {
        navigate('/services');
    };

    return (
        <div style={{ backgroundColor: '#f6f7fb' }}>
            <div className="service-detail container py-5">
                <div className="row gy-5">
                    <div className="col-12 col-md-5">
                        <div className="p-3">
                            <img className="w-100" src={specificService?.pic} alt="" height="400" />
                        </div>
                    </div>
                    <div className="col-12 col-md-7">
                        <div className="p-3">
                            <h1 className="fw-extrabold blue-color" style={{ fontWeight: '600' }}>
                                {specificService?.name}
                            </h1>
                            <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faUserNurse} /> {t('home.specialized_doctor')}
                                {specificService?.countDoctors}
                            </h6>
                            <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faCalendar} /> {t('appoint.open')} {specificService?.openDays}
                            </h6>
                            <p className="fs-5">{specificService?.details}</p>
                            <button
                                onClick={handleBackBtn}
                                className="default-btn d-flex justify-content-center align-items-center mx-auto mt-4"
                            >
                                <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> {t('common.back_btn')}
                            </button>
                        </div>
                    </div>
                </div>
                <CheckChatLogin />
            </div>
        </div>
    );
};

export default ServiceDetail;
