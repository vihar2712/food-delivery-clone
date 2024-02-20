// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-e_2OzcByOfie4U54QHlP_tn4NsmXuIo",
  authDomain: "swiggy-clone-91032.firebaseapp.com",
  projectId: "swiggy-clone-91032",
  storageBucket: "swiggy-clone-91032.appspot.com",
  messagingSenderId: "152744184666",
  appId: "1:152744184666:web:e2e83281a291cf583c0163",
  measurementId: "G-30ZKVP0Y8F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
