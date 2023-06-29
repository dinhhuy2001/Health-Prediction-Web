import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function DashboardHeader({ btnText, onClick }) {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (e) {
            console.log(e.message);
        }
    };
    return (
        <div className="dashboard-header-container">
            {btnText && (
                <button className="dashboard-header-btn" onClick={onClick}>
                    {btnText}
                </button>
            )}

            <div className="d-flex justify-content-center align-items-center">
                <div className="header-info">
                    <img src={currentUser.photoURL} alt="avatar" />
                    <span>Admin</span>
                </div>

                <button onClick={handleLogout} className="btn btn-secondary text-center ms-2">
                    <i className="mx-auto">
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </i>
                </button>
            </div>
        </div>
    );
}

export default DashboardHeader;
