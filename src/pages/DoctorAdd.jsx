import SideBar from '../components/AD_Sidebar';
// import { useContext, useState } from 'react';
import Add from '../img/addAvatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { auth, db, storage } from '../firebase';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { ChatContext } from '../context/ChatContext';

const AddDoctor = () => {
    // const { currentUser, setCurrentUser } = useContext(AuthContext);
    // const [err, setErr] = useState(false);
    // const [loading, setLoading] = useState(false);
    // const [success, setSuccess] = useState(false);
    // const { data } = useContext(ChatContext);
    const navigate = useNavigate();
    const handleBackBtn = () => {
        navigate(-1);
    };
    // const handleSubmit = async (e) => {
    //     setLoading(true);
    //     e.preventDefault();
    //     e.stopPropagation();
    //     const displayName = e.target[0].value;
    //     const email = e.target[1].value;
    //     const password = e.target[2].value;
    //     const file = e.target[3].files[0];

    //     try {
    //         //Create user
    //         const res = await createUserWithEmailAndPassword(auth, email, password);
    //         const date = new Date().getTime();
    //         const storageRef = ref(storage, `${displayName + date}`);

    //         await uploadBytesResumable(storageRef, file).then(() => {
    //             getDownloadURL(storageRef).then(async (downloadURL) => {
    //                 try {
    //                     //Update profile
    //                     await updateProfile(res.user, {
    //                         displayName,
    //                         photoURL: downloadURL,
    //                     });
    //                     //create user on firestore
    //                     await setDoc(doc(db, 'users', res.user.uid), {
    //                         uid: res.user.uid,
    //                         displayName,
    //                         email,
    //                         photoURL: downloadURL,
    //                     });

    //                     //create empty user chats on firestore
    //                     await setDoc(doc(db, 'userChats', res.user.uid), {});

    //                     await setDoc(doc(db, 'doctors', res.user.uid), {
    //                         uid: res.user.uid,
    //                         displayName,
    //                         email,
    //                         password,
    //                         photoURL: downloadURL,
    //                         appoint: [],
    //                     });
    //                     data.user = {};
    //                     setSuccess(true);
    //                     setCurrentUser({ isAdmin: true });
    //                     navigate('/DoctorManage');
    //                 } catch (err) {
    //                     console.log(err);
    //                     setErr(true);
    //                     setLoading(false);
    //                 }
    //             });
    //         });
    //     } catch (err) {
    //         setErr(true);
    //         setLoading(false);
    //     }
    // };
    return (
        <>
            {
                <div className="dashboard-container">
                    <SideBar />
                    <div className="dashboard-body" style={{ padding: '50px' }}>
                        <button
                            onClick={handleBackBtn}
                            className="default-btn d-flex justify-content-center align-items-center"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Back
                        </button>
                        <h2 className="mt-3">Add Doctor</h2>
                        <form className="col-lg-8 col-md-12 col-12" noValidate>
                            <div className="form-group mt-3">
                                <label htmlFor="userName">UserName</label>
                                <input type="text" className="form-control mt-1" placeholder="UserName" id="userName" />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control mt-1" placeholder="Email" id="email" />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Password"
                                    id="password"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <input required style={{ display: 'none' }} type="file" id="file" />
                                <label
                                    htmlFor="file"
                                    className="d-flex align-items-center"
                                    style={{ gap: '20px', cursor: 'pointer' }}
                                >
                                    <img src={Add} alt="avatar" style={{ width: '40px', height: '40px' }} />
                                    <span>Add an avatar</span>
                                </label>
                            </div>
                            <div>
                                {/* {loading && 'Uploading Image...'}
                                {success && 'Add Doctor Completed'}
                                {err && <span>Something went wrong</span>} */}
                            </div>
                            <div className="text-center">
                                <button className="btn btn-danger mt-3 text-center">Add Doctor</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
};

export default AddDoctor;
