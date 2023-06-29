import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faClock, faLocationArrow, faPhone } from '@fortawesome/free-solid-svg-icons';

const ContactSection = () => {
    return (
        <div className="container px-4 shadow-lg rounded">
            <h2 className="text-center blue-color pt-3">
                <i className="me-2">
                    <FontAwesomeIcon icon={faClock} />
                </i>
                Schedule
            </h2>
            <div className="row gx-5">
                <div className="col">
                    <div className="p-3 w-75 mx-auto">
                        <h2 className="fw-bolder blue-color">Smarter Healthcare</h2>
                        <p className="fw-bold text-secondary">
                            Smarter Healthcare ensures the best health care as well as clinical service with outstanding
                            personal service. We ensures the best health care as well as clinical service with
                            outstanding personal service.
                        </p>
                        <p className="mt-4 d-flex" style={{ gap: '10px' }}>
                            <i className="blue-color">
                                <FontAwesomeIcon icon={faLocationArrow} />
                            </i>
                            <span>Tupac Amaru 200 - Lima</span>
                        </p>
                        <p className="d-flex" style={{ gap: '10px' }}>
                            <i className="blue-color">
                                <FontAwesomeIcon icon={faPhone} />
                            </i>
                            <span>+51 0123456789</span>
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
                        <h4 className="fw-bolder">Opening Hours</h4>

                        <table className="table text-secondary fw-bold rounded">
                            <tbody>
                                <tr>
                                    <td>Monday</td>
                                    <td>09:00 - 19:00</td>
                                </tr>
                                <tr>
                                    <td>Tuesday</td>
                                    <td>09:00 - 19:00</td>
                                </tr>
                                <tr>
                                    <td>Wedneday</td>
                                    <td>09:00 - 19:00</td>
                                </tr>
                                <tr>
                                    <td>Thursday</td>
                                    <td>09:00 - 19:00</td>
                                </tr>
                                <tr>
                                    <td>Friday</td>
                                    <td>09:00 - 19:00</td>
                                </tr>
                                <tr>
                                    <td>Saturday</td>
                                    <td>10:00 - 18:00</td>
                                </tr>
                                <tr>
                                    <td>Sunday</td>
                                    <td>Emergency</td>
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
