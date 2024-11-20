// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "crud-mern-a3ff3.firebaseapp.com",
  projectId: "crud-mern-a3ff3",
  storageBucket: "crud-mern-a3ff3.firebasestorage.app",
  messagingSenderId: "991911407047",
  appId: "1:991911407047:web:6a28d3f8844d8247ff3de2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);