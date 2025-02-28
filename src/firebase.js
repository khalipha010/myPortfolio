// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Correct import for Firestore

// Your web app's Firebase configuration (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBdT5RQxS3UePDkoN6odfj7ZNvuxJD5dEw",
  authDomain: "portfolioadmin-faad7.firebaseapp.com",
  projectId: "portfolioadmin-faad7",
  storageBucket: "portfolioadmin-faad7.firebasestorage.app",
  messagingSenderId: "604074620416",
  appId: "1:604074620416:web:820eb582a5329301000ae5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app); // Use getFirestore to initialize Firestore