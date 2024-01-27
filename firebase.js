// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // If you're using Firestore

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

// // Get a list of snippets from your database
// async function getSnippets(db) {
//   const snippetsCol = collection(db, "snippets");
//   const snippetSnapshot = await getDocs(snippetsCol);
//   const snippetList = snippetSnapshot.docs.map((doc) => doc.data());
//   return snippetList;
// }

// getSnippets(db).then((snippetList) => {
//   // snippetList is an array of "snippet" objects
//   console.log(snippetList);
// });

// Export the necessary functionalities
export { auth, db, signInWithPopup, GoogleAuthProvider };