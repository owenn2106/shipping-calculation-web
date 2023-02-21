// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const config = {
  development: {
    apiKey: "AIzaSyCSit6RMlnGoxWZS94g5cGS8S0QXy4179g",
    authDomain: "shipping-playground.firebaseapp.com",
    projectId: "shipping-playground",
    storageBucket: "shipping-playground.appspot.com",
    messagingSenderId: "110862319841",
    appId: "1:110862319841:web:fbb56087aa80d2af5e77a0",
  },
  production: {
    apiKey: "AIzaSyBytW7SJnWjZDxQqRwGS4f_niIXMLCv8Ho",
    authDomain: "shipping-calculation-web.firebaseapp.com",
    projectId: "shipping-calculation-web",
    storageBucket: "shipping-calculation-web.appspot.com",
    messagingSenderId: "1029235419751",
    appId: "1:1029235419751:web:41ac4a0703bb60120702c2",
  },
};

// Your web app's Firebase configuration
const firebaseConfig = isLocalhost ? config.development : config.production;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
