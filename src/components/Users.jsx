import { useState, useEffect } from 'react';
import DashboardHeader from './AD_Header';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Users() {
    const [userData, setUserData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    let arr = [];
    const navigate = useNavigate();

    const getUserData = async () => {
        const querySnapshot = await getDocs(collection(db, 'userInfo'));
        querySnapshot.forEach((doc) => {
            arr.push(doc.data());
        });
        setUserData(arr);
    };

    const handleNavigate = () => {
        navigate('/AddUser');
    };
    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
            {
                <div className="dashboard-content">
                    <DashboardHeader btnText="New User" onClick={handleNavigate} />

                    <div className="dashboard-content-container">
                        <div className="dashboard-content-header">
                            <h2>Users List</h2>
                            <div className="dashboard-content-search">
                                <input
                                    type="text"
                                    value={searchValue}
                                    placeholder="Search Username"
                                    className="dashboard-content-input"
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                            </div>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DISPLAY NAME</th>
                                    <th>EMAIL</th>
                                    <th>PASSWORD</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData && searchValue === ''
                                    ? userData.map((index, key) => (
                                          <tr key={key}>
                                              <th>{key}</th>
                                              <th>{index?.displayName}</th>
                                              <th>{index?.email}</th>
                                              <th>{index?.password}</th>
                                          </tr>
                                      ))
                                    : userData
                                          .filter((data) => {
                                              return data.displayName === searchValue;
                                          })
                                          .map((index, key) => (
                                              <tr key={key}>
                                                  <th>{key}</th>
                                                  <th>{index?.displayName}</th>
                                                  <th>{index?.email}</th>
                                                  <th>{index?.password}</th>
                                              </tr>
                                          ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    );
}

export default Users;
