// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBytW7SJnWjZDxQqRwGS4f_niIXMLCv8Ho",
  authDomain: "shipping-calculation-web.firebaseapp.com",
  projectId: "shipping-calculation-web",
  storageBucket: "shipping-calculation-web.appspot.com",
  messagingSenderId: "1029235419751",
  appId: "1:1029235419751:web:41ac4a0703bb60120702c2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
