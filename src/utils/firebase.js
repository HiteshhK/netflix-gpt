// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7mO4jNHdSp5-64dzHrF054HaYvTTCG6c",
  authDomain: "netflixgpt-a7d10.firebaseapp.com",
  projectId: "netflixgpt-a7d10",
  storageBucket: "netflixgpt-a7d10.appspot.com",
  messagingSenderId: "1051013425811",
  appId: "1:1051013425811:web:3755254421480a27d9bb66",
  measurementId: "G-175WHBVL9B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth();