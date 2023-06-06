import Banner from '../components/Banner';
import Intro from '../components/Intro';
import CheckChatLogin from '../components/CheckChatLogin';

const Home = () => {
    return (
        <div>
            <Banner />
            <Intro />
            {/* <ServicesSection></ServicesSection> */}
            {/* <AppointmentSection></AppointmentSection> */}
            <CheckChatLogin />
        </div>
    );
};

export default Home;
