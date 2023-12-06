// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_aCUQ1XPg_uf1l-cnVLdiYJo7w3t6UU0",
  authDomain: "app-ticktime-io.firebaseapp.com",
  projectId: "app-ticktime-io",
  storageBucket: "app-ticktime-io.appspot.com",
  messagingSenderId: "265452686650",
  appId: "1:265452686650:web:a6a83ed261198fbe5d1403"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);