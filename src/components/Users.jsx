import { useState, useEffect, useContext } from 'react';
import DashboardHeader from './AD_Header';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

function Orders() {
    const [search, setSearch] = useState('');
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const arr = [];

    const getUserData = async () => {
        const querySnapshot = await getDocs(collection(db, 'users'));
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            arr.push(doc.data());
        });
        setUserData(arr);
        console.log(userData);
    };

    useEffect(() => {
        getUserData();
    }, []);

    // Search
    // const __handleSearch = (event) => {
    //     setSearch(event.target.value);
    //     if (event.target.value !== '') {
    //         let search_results = userData.filter(
    //             (item) =>
    //                 item.displayName.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.email.toLowerCase().includes(search.toLowerCase()),
    //         );
    //         // setOrders(search_results);
    //     }
    // };

    return (
        <>
            {currentUser && (
                <div className="dashboard-content">
                    <DashboardHeader btnText="New Order" />

                    <div className="dashboard-content-container">
                        <div className="dashboard-content-header">
                            <h2>Orders List</h2>
                            <div className="dashboard-content-search">
                                <input
                                    type="text"
                                    // value={search}
                                    placeholder="Search.."
                                    className="dashboard-content-input"
                                    // onChange={(e) => __handleSearch(e)}
                                />
                            </div>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>EMAIL</th>
                                    <th>PASSWORD</th>
                                    <th>DISPLAY NAME</th>
                                    <th>APPOINTMENT</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {userData?.map((index, key) => (
                                    <tr key={key}>
                                        <th>{index.uid}</th>
                                        <th>{index.displayName}</th>
                                        <th>{index.email}</th>
                                        <th></th>
                                        <th>
                                            <button className="btn btn-danger">Delete</button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}

export default Orders;
