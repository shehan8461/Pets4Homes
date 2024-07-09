// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-c1097.firebaseapp.com",
  projectId: "mern-auth-c1097",
  storageBucket: "mern-auth-c1097.appspot.com",
  messagingSenderId: "191963512102",
  appId: "1:191963512102:web:ce15c531e26310a4f115e7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);