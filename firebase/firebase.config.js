import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBi28ARrDdYyISYhKAMi1g_Oadp2xai_ds",
  authDomain: "etuition-1e987.firebaseapp.com",
  projectId: "etuition-1e987",
  storageBucket: "etuition-1e987.firebasestorage.app",
  messagingSenderId: "465767281808",
  appId: "1:465767281808:web:98bc3c0f3adbc49ecc5415"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;