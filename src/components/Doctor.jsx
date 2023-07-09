import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNurse, faCalendar, faCoins, faPhone } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

const Doctor = (props) => {
    const { t } = useTranslation();
    const { currentUser } = useContext(AuthContext);
    const { id, name, specialize, weekDays, time, fees, pic, phone } = props.doctor;
    return (
        <>
            <div className="col-12 col-md-6 col-lg-4">
                <div className="card">
                    <img src={pic} className="card-img-top" alt="..." height="250" />
                    <div className="card-body">
                        <h4 className="card-title text-center" style={{ fontWeight: '600' }}>
                            {name}
                        </h4>
                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                            <FontAwesomeIcon icon={faUserNurse} />{' '}
                            <span>
                                {t('appoint.specialty')} {specialize}
                            </span>
                        </h6>
                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                            <FontAwesomeIcon icon={faCalendar} />
                            <span>
                                {t('appoint.open')}
                                {`${weekDays} ${time}`}
                            </span>
                        </h6>
                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                            <FontAwesomeIcon icon={faCoins} />{' '}
                            <span>
                                {t('appoint.fee')} {fees}$
                            </span>
                        </h6>
                        <h6 style={{ fontWeight: '600', display: 'flex', gap: '10px' }}>
                            <FontAwesomeIcon icon={faPhone} />{' '}
                            <span>
                                {t('appoint.phone')} {phone}
                            </span>
                        </h6>
                        {!currentUser?.isDoctor && !currentUser?.isAdmin && (
                            <Link to={`/appointment/${id}`} className="text-decoration-none">
                                <button className="default-btn d-block mx-auto">{t('appoint.appointment')}</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Doctor;
