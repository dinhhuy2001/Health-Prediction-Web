import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: 'AIzaSyCNqbAYU406jP1e_-rcAsqlq5pwKkcjxDU',
//     authDomain: 'thelastdance-bb85c.firebaseapp.com',
//     projectId: 'thelastdance-bb85c',
//     storageBucket: 'thelastdance-bb85c.appspot.com',
//     messagingSenderId: '317144508004',
//     appId: '1:317144508004:web:4e745dd8fe77a04155a171',
// };

const firebaseConfig = {
    apiKey: 'AIzaSyCcPyz9kyncJj7Ljq1BLveUcZviWXR0zSs',
    authDomain: 'finalpbl-af887.firebaseapp.com',
    projectId: 'finalpbl-af887',
    storageBucket: 'finalpbl-af887.appspot.com',
    messagingSenderId: '1031615860238',
    appId: '1:1031615860238:web:7bc4ea14090b2bdeb4365f',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
