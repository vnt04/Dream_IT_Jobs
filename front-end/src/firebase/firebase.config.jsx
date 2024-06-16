// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjarSx9kQVEER-DL28wmFwf8qT-qFq_HQ",
  authDomain: "dream-it-jobs.firebaseapp.com",
  projectId: "dream-it-jobs",
  storageBucket: "dream-it-jobs.appspot.com",
  messagingSenderId: "197578603743",
  appId: "1:197578603743:web:7067055ebb977f29413d6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;