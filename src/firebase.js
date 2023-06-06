import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDTyYlBTlUVxfLPQEjGioCQY8duBCP8ENI',
    authDomain: 'chat-5ba1f.firebaseapp.com',
    projectId: 'chat-5ba1f',
    storageBucket: 'chat-5ba1f.appspot.com',
    messagingSenderId: '925385573850',
    appId: '1:925385573850:web:cbe3444673ed383910ece3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
