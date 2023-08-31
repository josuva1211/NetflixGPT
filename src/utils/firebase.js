// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDatvuKtebynqjLEpIR2Fj3ZQcI5GmVNsc",
  authDomain: "netflixgpt-54e5b.firebaseapp.com",
  projectId: "netflixgpt-54e5b",
  storageBucket: "netflixgpt-54e5b.appspot.com",
  messagingSenderId: "841212967154",
  appId: "1:841212967154:web:264247b21a9685e828386b",
  measurementId: "G-9ZYJYMEJ0L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();