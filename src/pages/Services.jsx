import CheckChatLogin from '../components/CheckChatLogin';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Service from '../components/Service';

const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        axios
            .get('https://raw.githubusercontent.com/dinhhuy2001/fake-data-for-finalPbl/master/services.json')
            .then((res) => setServices(res.data));
    }, []);
    return (
        <div className="py-5" style={{ backgroundColor: '#f6f7fb' }}>
            <h2 className="text-center blue-color">
                <i className="fas fa-flask"></i> OUR MAIN SERVICES
            </h2>
            <p className="text-center fs-5">Human care is more than healthcare. We prefer quality over anything.</p>
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
