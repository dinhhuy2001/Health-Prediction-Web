import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import logo from '../img/header.png';
import { signOut } from 'firebase/auth';

const Header = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (e) {
            console.log(e.message);
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
                                    <div className="header-info">
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
