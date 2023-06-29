import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const CheckChatLogin = () => {
    const { currentUser } = useContext(AuthContext);

    const handleCheckUserLogin = () => {
        if (currentUser) {
            document.querySelector('.home').style.display = 'block';
            document.querySelector('.chat-button').style.display = 'none';
        } else {
            alert('Please login to use this!');
        }
    };

    return (
        <>
            <div className="chat-button" onClick={handleCheckUserLogin}>
                <FontAwesomeIcon icon={faCommentDots} className="chat__icon" />
            </div>
        </>
    );
};

export default CheckChatLogin;
