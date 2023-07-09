import SideBar from '../components/AD_Sidebar';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import DoctorList from '../components/DoctorList';

const DoctorManage = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            {currentUser?.isAdmin && (
                <div className="dashboard-container">
                    <SideBar />

                    <div className="dashboard-body">
                        <DoctorList />
                    </div>
                </div>
            )}
        </>
    );
};

export default DoctorManage;
