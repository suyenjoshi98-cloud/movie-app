import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqFJXhyNnv2SQYBvRBWO5Q_a1VUqIxoO4",
  authDomain: "cinesearch-4ec4b.firebaseapp.com",
  projectId: "cinesearch-4ec4b",
  storageBucket: "cinesearch-4ec4b.firebasestorage.app",
  messagingSenderId: "883660635138",
  appId: "1:883660635138:web:68713d80a953880003fb1b",
  measurementId: "G-NN8R05HEV3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);