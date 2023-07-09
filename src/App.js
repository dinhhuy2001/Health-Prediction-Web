import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Predict from './pages/Predict';
import About from './pages/About';
import Services from './pages/Services';
import Header from './components/Header';
import Appointment from './pages/Appointment';
import Footer from './components/Footer';
import ChatHome from './pages/ChatHome';
import { AuthContext } from './context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import ServiceDetail from './pages/ServiceDetail';
import AppointmentDetail from './pages/AppointmentDetail';
import AppointComplete from './pages/AppointComplete';
import DoctorSchedule from './pages/DoctorSchedule';
import UserManage from './pages/UserManage';
import DoctorHeader from './components/DoctorHeader';
import DoctorManage from './pages/DoctorManage';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import AddDoctor from './pages/DoctorAdd';
import AddUser from './pages/UserAdd';

function App() {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [arr, setArr] = useState([]);
    let newArr = [];

    const getUser = async () => {
        const querySnapshot = await getDocs(collection(db, 'doctors'));
        querySnapshot.forEach((doc) => {
            newArr.push(doc.data());
        });
        setArr(newArr);
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        const emailUser = localStorage.getItem('email');
        let object = {};
        if (emailUser === 'admin@gmail.com') {
            setCurrentUser({ isAdmin: true });
        }
        const hasDoctor = arr.some((obj) => {
            if (obj.email === emailUser) {
                object = obj;
                return true;
            }
            return false;
        });

        hasDoctor && setCurrentUser({ isDoctor: true, ...object });
    }, [arr]);

    return (
        <Router>
            {currentUser?.isDoctor === true && <DoctorHeader />}
            {!currentUser?.isDoctor && !currentUser?.isAdmin && <Header />}
            {currentUser && <ChatHome />}
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route path="/predict" element={<Predict />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/services" element={<Services />}></Route>
                <Route path="/appointment" element={<Appointment />}></Route>
                {currentUser?.isDoctor !== true && (
                    <Route path="/appointment/:doctorId" element={<AppointmentDetail />}></Route>
                )}
                {currentUser?.isDoctor !== true && (
                    <Route path="/appointComplete" element={<AppointComplete />}></Route>
                )}
                {currentUser?.isDoctor === true && <Route path="/doctorSchedule" element={<DoctorSchedule />}></Route>}
                {currentUser?.isAdmin === true && <Route path="/userManager" element={<UserManage />} />}
                {currentUser?.isAdmin === true && <Route path="/doctorManager" element={<DoctorManage />} />}
                {currentUser?.isAdmin === true && <Route path="/AddDoctor" element={<AddDoctor />} />}
                {currentUser?.isAdmin === true && <Route path="/AddUser" element={<AddUser />} />}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/service/:serviceId" element={<ServiceDetail />}></Route>
            </Routes>
            {!currentUser?.isAdmin && <Footer />}
        </Router>
    );
}

export default App;
