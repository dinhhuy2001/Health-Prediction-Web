import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import logo from '../img/header.png';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Header = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const handleLogout = async () => {
        try {
            localStorage.removeItem('email');
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

    return (
        <>
            <Navbar bg="white" variant="light" expand="lg" sticky="top" fixed="top">
                <Container varient="light">
                    <Navbar.Brand as={NavLink} to="/">
                        <img src={logo} alt="Healthcare" width="180" height="50" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto fs-5 fw-bold">
                            <Nav.Link as={NavLink} className={(isActive) => (isActive ? 'active' : '')} to="/predict">
                                Disease Predict
                            </Nav.Link>
                            <Nav.Link as={NavLink} className={(isActive) => (isActive ? 'active' : '')} to="/about">
                                About
                            </Nav.Link>
                            <Nav.Link as={NavLink} className={(isActive) => (isActive ? 'active' : '')} to="/services">
                                Services
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                className={(isActive) => (isActive ? 'active' : '')}
                                to="/appointment"
                            >
                                Appointment
                            </Nav.Link>
                        </Nav>
                        <Navbar.Text className="fs-5 fw-bold">
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
