import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNurse, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const Service = (props) => {
    const { t } = useTranslation();
    const { id, name, countDoctors, openDays, pic } = props.service;
    return (
        <>
            <div className="col-12 col-md-6 col-lg-4">
                <div className="card">
                    <img src={pic} className="card-img-top" alt="..." height="250" />
                    <div className="card-body">
                        <h4 className="card-title text-center" style={{ fontWeight: '600' }}>
                            {name}
                        </h4>
                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faUserNurse} /> {t('home.specialized_doctor')} {countDoctors}
                        </h6>
                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faCalendar} />
                            {t('home.schedule_des4')}: {openDays}
                        </h6>
                        <p>{t('home.click')}</p>
                        <Link to={`/service/${id}`} className="text-decoration-none">
                            <button className="default-btn d-block mx-auto">{t('home.details')}</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Service;
