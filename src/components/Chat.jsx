import { useContext } from 'react';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Chat = () => {
    const { data } = useContext(ChatContext);

    const handleChatClose = () => {
        document.querySelector('.home').style.display = 'none';
        document.querySelector('.chat-button').style.display = 'block';
    };
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatCloseIcon" onClick={handleChatClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    );
};

export default Chat;
