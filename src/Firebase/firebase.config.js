// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

// const firebaseConfig = {
//   apiKey: "AIzaSyAPTVDNR3-wzKziklWDLc-T8J9PIMSwtzg",
//   authDomain: "dialoguedock-f470b.firebaseapp.com",
//   projectId: "dialoguedock-f470b",
//   storageBucket: "dialoguedock-f470b.appspot.com",
//   messagingSenderId: "174993664993",
//   appId: "1:174993664993:web:36cd496165ce728d9f80a0"
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

