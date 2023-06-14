import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNurse, faCalendar, faCoins, faPhone } from '@fortawesome/free-solid-svg-icons';

const Doctor = (props) => {
    const { name, specialize, weekDays, time, fees, pic, phone } = props.doctor;
    return (
        <>
            <div className="col-12 col-md-6 col-lg-4">
                <div className="card">
                    <img src={pic} className="card-img-top" alt="..." height="200" />
                    <div className="card-body">
                        <h4 className="card-title text-center" style={{ fontWeight: '600' }}>
                            {name}
                        </h4>
                        <h6 style={{ fontWeight: '600' }}>
                            <FontAwesomeIcon icon={faUserNurse} /> Specialty: {specialize}
                        </h6>
                        <h6 style={{ fontWeight: '600' }}>
                            <FontAwesomeIcon icon={faCalendar} /> Open: {weekDays} {time}
                        </h6>
                        <h6 style={{ fontWeight: '600' }}>
                            <FontAwesomeIcon icon={faCoins} /> Fee: {fees}$
                        </h6>
                        <h6 style={{ fontWeight: '600' }}>
                            <FontAwesomeIcon icon={faPhone} /> Phone: {phone}$
                        </h6>
                        <Link to="/success" className="text-decoration-none">
                            <button className="default-btn d-block mx-auto">Appointment</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Doctor;
