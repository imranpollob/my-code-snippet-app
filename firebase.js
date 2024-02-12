// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // If you're using Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmDav3VzzcRuvDIlmaZTLKTPTlBw6tTl8",
  authDomain: "my-code-snippet-app.firebaseapp.com",
  projectId: "my-code-snippet-app",
  storageBucket: "my-code-snippet-app.appspot.com",
  messagingSenderId: "855854223570",
  appId: "1:855854223570:web:2d18bc6553e421ad871d0b",
  measurementId: "G-5WV0NCE116",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export the necessary functionalities
export { auth, db, signInWithPopup, GoogleAuthProvider, signOut };
