import Banner from '../components/Banner';
import Intro from '../components/Intro';
import CheckChatLogin from '../components/CheckChatLogin';
import ContactSection from '../components/ContactSection';
import ServiceSection from '../components/ServiceSection';
import AppointmentSection from '../components/AppointmentSection';

const Home = () => {
    return (
        <div style={{ backgroundColor: '#f6f7fb' }}>
            <Banner />
            <Intro />
            <ServiceSection />
            <ContactSection />
            <AppointmentSection />
            <CheckChatLogin />
        </div>
    );
};

export default Home;
