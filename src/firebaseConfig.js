// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJk_UgBZBXZYT6h0ImTkTHuDxQRNP_7ho",
  authDomain: "todo---chrome-extension.firebaseapp.com",
  projectId: "todo---chrome-extension",
  storageBucket: "todo---chrome-extension.appspot.com",
  messagingSenderId: "453307070535",
  databaseURL: "",
  appId: "1:453307070535:web:b3196951b3ac94b5b3d962"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);