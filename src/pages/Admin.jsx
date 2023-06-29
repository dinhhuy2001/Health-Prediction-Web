import SideBar from '../components/AD_Sidebar';
import Orders from '../components/Users';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Admin = () => {
    const { currentUser } = useContext(AuthContext);

    const sidebar_menu = [
        {
            id: 1,
            path: '/',
            title: 'Dashboard',
        },
        {
            id: 2,
            path: '/orders',
            title: 'Orders',
        },
        {
            id: 3,
            path: '/products',
            title: 'Products',
        },
        {
            id: 4,
            path: '/profile',
            title: 'My account',
        },
    ];
    return (
        <>
            {currentUser && (
                <div className="dashboard-container">
                    <SideBar menu={sidebar_menu} />

                    <div className="dashboard-body">
                        <Orders />
                    </div>
                </div>
            )}
        </>
    );
};

export default Admin;
