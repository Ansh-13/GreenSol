// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3BAp8Qy8SN15GJHoQRFNyzvrwrVzdllg",
  authDomain: "greensol-dc76f.firebaseapp.com",
  projectId: "greensol-dc76f",
  storageBucket: "greensol-dc76f.appspot.com",
  messagingSenderId: "1088654261722",
  appId: "1:1088654261722:web:7617667c74d6c4ae4b94e3",
  measurementId: "G-E6QSPBHJ8M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export {app};
export {auth}
export {db}