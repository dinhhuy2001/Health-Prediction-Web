import { useContext, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);

    const renderImg = useMemo(() => {
        return (
            <div className="user">
                <img src={currentUser?.photoURL} alt="avatar" />
                <span>{currentUser?.displayName}</span>
            </div>
        );
    }, [currentUser]);

    return <div className="navbar">{renderImg}</div>;
};

export default Navbar;
