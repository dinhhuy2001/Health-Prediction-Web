import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faClock, faLocationArrow, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const ContactSection = () => {
    const { t } = useTranslation();
    return (
        <div className="container px-4 shadow-lg rounded">
            <h2 className="text-center blue-color pt-3">
                <i className="me-2">
                    <FontAwesomeIcon icon={faClock} />
                </i>
                {t('home.work_schedule')}
            </h2>
            <div className="row gx-5">
                <div className="col">
                    <div className="p-3 w-75 mx-auto">
                        <h2 className="fw-bolder blue-color">Smarter Healthcare</h2>
                        <p className="fw-bold text-secondary">{t('home.schedule_des1')}</p>
                        <p className="mt-4 d-flex" style={{ gap: '10px' }}>
                            <i className="blue-color">
                                <FontAwesomeIcon icon={faLocationArrow} />
                            </i>
                            <span>{t('home.schedule_des2')}</span>
                        </p>
                        <p className="d-flex" style={{ gap: '10px' }}>
                            <i className="blue-color">
                                <FontAwesomeIcon icon={faPhone} />
                            </i>
                            <span>{t('home.schedule_des3')}</span>
                        </p>
                        <div className="mb-3 fs-4">
                            <i className="me-4">
                                <FontAwesomeIcon icon={faFacebookSquare} />
                            </i>
                            <i className="me-4">
                                <FontAwesomeIcon icon={faTwitter} />
                            </i>
                            <i className="me-4">
                                <FontAwesomeIcon icon={faInstagram} />
                            </i>
                            <i className="me-4">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </i>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3 w-75 mx-auto">
                        <h4 className="fw-bolder">{t('home.schedule_des4')}</h4>

                        <table className="table text-secondary fw-bold rounded">
                            <tbody>
                                <tr>
                                    <td>{t('home.schedule_tb1')}</td>
                                    <td>{t('home.schedule_tb1_1')}</td>
                                </tr>
                                <tr>
                                    <td>{t('home.schedule_tb2')}</td>
                                    <td>{t('home.schedule_tb2_1')}</td>
                                </tr>
                                <tr>
                                    <td>{t('home.schedule_tb3')}</td>
                                    <td>{t('home.schedule_tb3_1')}</td>
                                </tr>
                                <tr>
                                    <td>{t('home.schedule_tb4')}</td>
                                    <td>{t('home.schedule_tb4_1')}</td>
                                </tr>
                                <tr>
                                    <td>{t('home.schedule_tb5')}</td>
                                    <td>{t('home.schedule_tb5_1')}</td>
                                </tr>
                                <tr>
                                    <td>{t('home.schedule_tb6')}</td>
                                    <td>{t('home.schedule_tb6_1')}</td>
                                </tr>
                                <tr>
                                    <td>{t('home.schedule_tb7')}</td>
                                    <td>{t('home.schedule_tb7_1')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
