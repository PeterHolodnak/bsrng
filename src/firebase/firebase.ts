import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Game } from "./model/game";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDK7ulgsMV3kkg-9b73b0urH2awz_Ck4Ic",
    authDomain: "bsrng-db8bf.firebaseapp.com",
    projectId: "bsrng-db8bf",
    storageBucket: "bsrng-db8bf.appspot.com",
    messagingSenderId: "40489864121",
    appId: "1:40489864121:web:146829f2c60556cae30468",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const gamesCollection = db.collection(
    "games"
) as firebase.firestore.CollectionReference<Game>;
