import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi28ARrDdYyISYhKAMi1g_Oadp2xai_ds",
  authDomain: "etuition-1e987.firebaseapp.com",
  projectId: "etuition-1e987",
  storageBucket: "etuition-1e987.firebasestorage.app",
  messagingSenderId: "465767281808",
  appId: "1:465767281808:web:98bc3c0f3adbc49ecc5415"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);