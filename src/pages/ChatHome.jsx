import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

const ChatHome = () => {
    return (
        <div>
            <div className="home">
                <div className="container">
                    <Sidebar />
                    <Chat />
                </div>
            </div>
        </div>
    );
};

export default ChatHome;
