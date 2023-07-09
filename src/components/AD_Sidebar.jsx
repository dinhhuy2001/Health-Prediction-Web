import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import SideBarItem from './AD_SidebarItem';
import logo from '../img/header.png';

function SideBar() {
    const menu = [
        {
            id: 1,
            path: '/userManager',
            title: 'Manage Users',
        },
        {
            id: 2,
            path: '/doctorManager',
            title: 'Manage Doctors',
        },
    ];
    const location = useLocation();

    const [active, setActive] = useState(1);

    useEffect(() => {
        menu.forEach((element) => {
            if (location.pathname === element.path) {
                setActive(element.id);
            }
        });
    }, [location.pathname, menu]);

    const __navigate = (id) => {
        setActive(id);
    };

    return (
        <nav className="sidebar_admin">
            <div className="sidebar-container">
                <div className="sidebar-logo-container">
                    <img src={logo} alt="Healthcare" width="180" height="50" />
                </div>

                <div className="sidebar-container">
                    <div className="sidebar-items">
                        {menu.map((item, index) => (
                            <div key={index} onClick={() => __navigate(item.id)}>
                                <SideBarItem active={item.id === active} item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default SideBar;
