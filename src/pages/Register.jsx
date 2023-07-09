import React, { useContext, useState } from 'react';
import Add from '../img/addAvatar.png';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { useTranslation } from 'react-i18next';

const Register = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    let isDoctor = false;

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        localStorage.setItem('email', email);

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, 'userChats', res.user.uid), {});

                        if (displayName.includes('Dr ')) {
                            await setDoc(doc(db, 'doctors', res.user.uid), {
                                uid: res.user.uid,
                                displayName,
                                email,
                                password,
                                photoURL: downloadURL,
                                appoint: [],
                            });
                            isDoctor = true;
                        }
                        if (!displayName.includes('Dr ')) {
                            await setDoc(doc(db, 'userInfo', res.user.uid), {
                                uid: res.user.uid,
                                displayName,
                                email,
                                password,
                                photoURL: downloadURL,
                                appoint: [],
                            });
                        }

                        setCurrentUser({ photoURL: downloadURL, displayName, uid: res.user.uid, isDoctor: isDoctor });
                        data.user = {};
                        navigate('/');
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                        setLoading(false);
                    }
                });
            });
        } catch (err) {
            setErr(true);
            setLoading(false);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">{t('common.register')}</span>
                <form onSubmit={handleSubmit} noValidate>
                    <input required type="text" placeholder={t('common.displayName')} />
                    <input required type="email" placeholder={t('common.email')} />
                    <input required type="password" placeholder={t('common.password')} />
                    <input required style={{ display: 'none' }} type="file" id="file" />
                    <label htmlFor="file">
                        <img src={Add} alt="avatar" />
                        <span>{t('common.add_ava')}</span>
                    </label>
                    <button disabled={loading}>{t('common.sign_up')}</button>
                    {loading && 'Uploading Image...'}
                    {err && <span>Something went wrong</span>}
                </form>
                <p>
                    {t('common.do')} <Link to="/login">{t('common.login')}</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
