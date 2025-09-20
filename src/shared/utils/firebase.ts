import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBCEgvelJ13udYB47AN-TEmSPKXrtGdQf8",
    authDomain: "chatify-da87a.firebaseapp.com",
    projectId: "chatify-da87a",
    storageBucket: "chatify-da87a.firebasestorage.app",
    messagingSenderId: "330678949306",
    appId: "1:330678949306:web:30b4218766013b1670b983"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);