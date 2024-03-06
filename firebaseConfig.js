import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBM8NT44Byo4iEQkUR3Gn7m4Jt_HDYEBBk",
    authDomain: "openhouseapp2024.firebaseapp.com",
    projectId: "openhouseapp2024",
    storageBucket: "openhouseapp2024.appspot.com",
    messagingSenderId: "1064414329531",
    appId: "1:1064414329531:web:083dc098fbb01bbfae079e",
    measurementId: "G-N4NF8RKB1W"
  };



export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);