import SideBar from '../components/AD_Sidebar';
import Users from '../components/Users';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const UserManage = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            {currentUser?.isAdmin && (
                <div className="dashboard-container">
                    <SideBar />

                    <div className="dashboard-body">
                        <Users />
                    </div>
                </div>
            )}
        </>
    );
};

export default UserManage;
