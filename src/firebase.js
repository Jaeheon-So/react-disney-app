// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkUzBIj8GqJFU6Ph2KGig3bgL3wCaO2bo",
  authDomain: "react-disney-app-b7338.firebaseapp.com",
  projectId: "react-disney-app-b7338",
  storageBucket: "react-disney-app-b7338.appspot.com",
  messagingSenderId: "13281058089",
  appId: "1:13281058089:web:4e6c77ea84875b09b06b38",
  measurementId: "G-Y5S5550KTC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default analytics;
