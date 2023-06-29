import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import adminAva from '../img/adminAva.jpg';

const Login = () => {
    const [err, setErr] = useState(false);
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

        // const docRef = doc(db, 'admin', 'DZFH3s9MExdDFDSeskia');
        // const docSnap = await getDoc(docRef);

        try {
            // if (email === docSnap.data().email && password === docSnap.data().password) {
            //     console.log(docSnap.data().uid === 'DZFH3s9MExdDFDSeskia');
            //     setCurrentUser({ uid: docSnap.data().uid, email: docSnap.data().email, photoURL: adminAva });
            //     navigate('/admin');
            // } else {
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
            // if (email.includes('Dr ')) {
            //     setCurrentUser({ isDoctor: true });
            // }
            navigate('/');
        } catch (err) {
            setErr(true);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <button>Sign in</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>
                    You don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
