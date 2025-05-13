// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnqMN77dtrSjLgN9GLuMP49TpSdXbD_ug",
  authDomain: "practice-todo-5f183.firebaseapp.com",
  projectId: "practice-todo-5f183",
  storageBucket: "practice-todo-5f183.firebasestorage.app",
  messagingSenderId: "269321929345",
  appId: "1:269321929345:web:eafa0628679b9810414380",
  measurementId: "G-08DBQ3QQ49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


export { app, analytics, db };