import img1 from '../img/About/about1.jpg';
import img2 from '../img/About/about2.jpg';
import img3 from '../img/About/about3.jpg';
import CheckChatLogin from '../components/CheckChatLogin';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

const About = () => {
    const { t } = useTranslation();
    return (
        <div style={{ backgroundColor: '#f6f7fb' }}>
            <h1 className="text-center py-3">
                <FontAwesomeIcon icon={faUserGroup} className="me-2" />
                {t('about.about_us')}
            </h1>
            <div className="container overflow-hidden">
                <div className="row g-4">
                    <div className="col-12 col-md-4">
                        <img className="w-100 mt-4" src={img1} alt="" height="450" />
                    </div>
                    <div className="col-12 col-md-4">
                        <img className="w-100" src={img2} alt="" height="500" />
                    </div>
                    <div className="col-12 col-md-4">
                        <img className="w-100 mt-4" src={img3} alt="" height="450" />
                    </div>
                </div>
            </div>

            <div className="container py-5 d-flex flex-column align-items-center">
                <h2>{t('about.who_we_are')}</h2>
                <h3 className="w-75 text-center">{t('about.about_description')}</h3>
            </div>
            <CheckChatLogin />
        </div>
    );
};

export default About;
