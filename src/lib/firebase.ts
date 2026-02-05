import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDZrPtuvW5QOaU5fZsFu4F3bLJUi_JBB80",
    authDomain: "mini-ngl.firebaseapp.com",
    projectId: "mini-ngl",
    storageBucket: "mini-ngl.firebasestorage.app",
    messagingSenderId: "564212934444",
    appId: "1:564212934444:web:50012c8f9ec5b73eb72e89",
    measurementId: "G-1PWWGDPHZ6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);