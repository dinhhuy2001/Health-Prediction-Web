import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const [err, setErr] = useState(false);
    const { t } = useTranslation();
    const { setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    let arr = [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        localStorage.setItem('email', email);

        const querySnapshot = await getDocs(collection(db, 'doctors'));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            arr.push(doc.data());
        });

        try {
            if (email === 'admin@gmail.com' && password === 'admin') {
                setCurrentUser({ isAdmin: true });
                navigate('/userManager');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                let object = {};
                const hasDoctor = arr.some((obj) => {
                    if (obj.email === email) {
                        object = obj;
                        return true;
                    }
                    return false;
                });

                hasDoctor && setCurrentUser({ isDoctor: true, ...object });
                navigate('/');
            }
        } catch (err) {
            setErr(true);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">{t('common.login')}</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder={t('common.email')} />
                    <input type="password" placeholder={t('common.password')} />
                    <button>{t('common.sign_in')}</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>
                    {t('common.do')} <Link to="/register">{t('common.register')}</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
