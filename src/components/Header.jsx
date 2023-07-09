import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import logo from '../img/header.png';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useTranslation } from 'react-i18next';
import i18n from '../configs/i18n';

const Header = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [currentLang, setCurrentLang] = useState('EN');
    const handleLogout = async () => {
        try {
            localStorage.removeItem('email');
            localStorage.removeItem('name');
            localStorage.removeItem('emailCheck');
            localStorage.removeItem('date');
            localStorage.removeItem('time');
            localStorage.removeItem('phone');
            localStorage.removeItem('note');
            localStorage.removeItem('language');
            await signOut(auth);
            navigate('/login');
        } catch (e) {
            console.log(e.message);
        }
    };
    const checkExist = async (e) => {
        e.preventDefault();
        const checkData = (await getDoc(doc(db, 'appoint', currentUser.uid))).data();
        if (checkData !== undefined) {
            navigate('/appointComplete');
            return true;
        }
    };

    const { t } = useTranslation();

    const changeLang = (newLang) => {
        console.log(newLang);
        setCurrentLang(newLang);
        i18n.changeLanguage(newLang);
        localStorage.setItem('language', newLang);
    };
    const location = useLocation();
    const lang = ['EN', 'VN'];
    useEffect(() => {
        const newLang = localStorage.getItem('language');
        setCurrentLang(newLang);
        i18n.changeLanguage(newLang);
    }, [location]);
    return (
        <>
            <Navbar bg="white" variant="light" expand="lg" sticky="top" fixed="top">
                <Container varient="light">
                    <Navbar.Brand as={NavLink} to="/">
                        <img src={logo} alt="Healthcare" width="180" height="50" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto fs-5 fw-bold d-flex">
                            <Nav.Link as={NavLink} className={(isActive) => (isActive ? 'active' : '')} to="/predict">
                                {t('common.header.predict')}
                            </Nav.Link>
                            <Nav.Link as={NavLink} className={(isActive) => (isActive ? 'active' : '')} to="/about">
                                {t('common.header.about')}
                            </Nav.Link>
                            <Nav.Link as={NavLink} className={(isActive) => (isActive ? 'active' : '')} to="/services">
                                {t('common.header.services')}
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                className={(isActive) => (isActive ? 'active' : '')}
                                to="/appointment"
                            >
                                {t('common.header.appoint')}
                            </Nav.Link>
                        </Nav>
                        <Navbar.Text
                            className="fs-5 fw-bold d-flex"
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                        >
                            <select
                                onChange={(event) => changeLang(event.target.value)}
                                value={currentLang}
                                style={{
                                    marginRight: '40px',
                                    border: '1px solid #d9d9d9',
                                    fontSize: '18px',
                                    color: 'rgba(0, 0, 0, 0.88)',
                                }}
                            >
                                {lang.map((i, index) => (
                                    <option key={index} value={i}>
                                        {i}
                                    </option>
                                ))}
                            </select>

                            {currentUser ? (
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="header-info" onClick={checkExist}>
                                        <img src={currentUser.photoURL} alt="avatar" />
                                        <span>{currentUser.displayName}</span>
                                    </div>

                                    <button onClick={handleLogout} className="btn btn-secondary text-center ms-2">
                                        <i className="mx-auto">
                                            <FontAwesomeIcon icon={faRightFromBracket} />
                                        </i>
                                    </button>
                                </div>
                            ) : (
                                <Nav.Link as={NavLink} className={(isActive) => 'active'} to="/login">
                                    <div
                                        className="d-flex justify-content-center align-items-center"
                                        style={{ gap: '5px' }}
                                    >
                                        <i className="fas">
                                            <FontAwesomeIcon icon={faRightToBracket} />
                                        </i>
                                        <span>Login</span>
                                    </div>
                                </Nav.Link>
                            )}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
