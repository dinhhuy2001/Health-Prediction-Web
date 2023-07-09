import { useState, useEffect, useContext } from 'react';
import DashboardHeader from './AD_Header';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

function DoctorList() {
    const [searchValue, setSearchValue] = useState('');
    const { t } = useTranslation();
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    const arr = [];

    const getUserData = async () => {
        const querySnapshot = await getDocs(collection(db, 'doctors'));
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            arr.push(doc.data());
        });
        setUserData(arr);
        console.log(userData);
    };

    const handleNavigate = () => {
        navigate('/AddDoctor');
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
            {currentUser && (
                <div className="dashboard-content">
                    <DashboardHeader btnText="New Doctor" onClick={handleNavigate} />

                    <div className="dashboard-content-container">
                        <div className="dashboard-content-header">
                            <h2>{t('appoint.doctorList')}</h2>
                            <div className="dashboard-content-search">
                                <input
                                    type="text"
                                    value={searchValue}
                                    placeholder="Search.."
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
            )}
        </>
    );
}

export default DoctorList;
