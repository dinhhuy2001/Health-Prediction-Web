import CheckChatLogin from '../components/CheckChatLogin';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Service from '../components/Service';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons';

const Services = () => {
    const [services, setServices] = useState([]);
    const { t } = useTranslation();
    useEffect(() => {
        axios
            .get('https://raw.githubusercontent.com/dinhhuy2001/fake-data-for-finalPbl/master/services.json')
            .then((res) => setServices(res.data));
    }, []);
    return (
        <div className="py-5" style={{ backgroundColor: '#f6f7fb' }}>
            <h2 className="text-center blue-color">
                <FontAwesomeIcon icon={faFlask} /> {t('home.our_main_service')}
            </h2>
            <p className="text-center fs-5">{t('home.service_description')}</p>
            <div className="container">
                <div className="row g-3">
                    {services.map((service) => (
                        <Service key={service.id} service={service}></Service>
                    ))}
                </div>
            </div>
            <CheckChatLogin />
        </div>
    );
};

export default Services;
