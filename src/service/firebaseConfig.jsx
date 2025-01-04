// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyHwaVzqI90RgqS104V4mBCUC_bPjPC-E",
  authDomain: "ai-travel-planner-2b04a.firebaseapp.com",
  projectId: "ai-travel-planner-2b04a",
  storageBucket: "ai-travel-planner-2b04a.firebasestorage.app",
  messagingSenderId: "655909280468",
  appId: "1:655909280468:web:0e64959705bbb2728c3941",
  measurementId: "G-9ND8GRNKW7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);