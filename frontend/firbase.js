// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "feastly-ecom.firebaseapp.com",
  projectId: "feastly-ecom",
  storageBucket: "feastly-ecom.firebasestorage.app",
  messagingSenderId: "979537853787",
  appId: "1:979537853787:web:f4efe21075d4ac2245ee7e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { app, auth };
