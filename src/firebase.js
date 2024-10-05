// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-next-81dc2.firebaseapp.com",
  projectId: "x-next-81dc2",
  storageBucket: "x-next-81dc2.appspot.com",
  messagingSenderId: "445773247791",
  appId: "1:445773247791:web:d7c2ab423c8962e6afddda"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);