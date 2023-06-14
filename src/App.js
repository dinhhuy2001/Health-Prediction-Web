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
import { useContext } from 'react';
import ServiceDetail from './pages/ServiceDetail';
import Success from './pages/Success';

function App() {
    const { currentUser } = useContext(AuthContext);
    return (
        <Router>
            <Header />
            {/* {currentUser && <ChatHome />} */}
            <Routes>
                <Route path="/">
                    <Route exact path="/home" element={<Home />}></Route>
                    <Route path="/predict" element={<Predict />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/services" element={<Services />}></Route>
                    <Route path="/appointment" element={<Appointment />}></Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/service/:serviceId" element={<ServiceDetail />}></Route>
                    {currentUser && <Route path="/success" element={<Success />} />}
                </Route>
            </Routes>

            <Footer />
        </Router>
    );
}

export default App;
