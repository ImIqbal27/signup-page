// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgIiWVLqI0G0V724rpmBGhkBbsZzOP5GQ",
    authDomain: "signup-page-app-14a6a.firebaseapp.com",
    projectId: "signup-page-app-14a6a",
    storageBucket: "signup-page-app-14a6a.appspot.com",
    messagingSenderId: "14394982846",
    appId: "1:14394982846:web:8fbd009d31af89de4479ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;