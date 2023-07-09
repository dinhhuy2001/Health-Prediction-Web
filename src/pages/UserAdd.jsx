import SideBar from '../components/AD_Sidebar';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const AddUser = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            {currentUser?.isAdmin && (
                <div className="dashboard-container">
                    <SideBar />
                    <div className="dashboard-body">
                        <h2>Add User</h2>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddUser;
