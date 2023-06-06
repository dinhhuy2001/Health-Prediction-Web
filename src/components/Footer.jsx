import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div className="footer text-center text-white">
            <div className="container mt-3">
                <h4 className="py-3">Follow us</h4>
                <i className="mx-4">
                    <FontAwesomeIcon icon={faFacebookSquare} />
                </i>
                <i className="mx-4">
                    <FontAwesomeIcon icon={faTwitter} />
                </i>
                <i className="mx-4">
                    <FontAwesomeIcon icon={faInstagram} />
                </i>
                <i className="mx-4">
                    <FontAwesomeIcon icon={faLinkedin} />
                </i>
                <div className="footer-copyright text-center py-3">© 2023 PredictionHealth</div>
            </div>
        </div>
    );
};

export default Footer;
