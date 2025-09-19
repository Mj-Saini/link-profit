// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEzE01--N3dAFKXXjl5__uZ-bgHBA8Wh8",
  authDomain: "referral-rise-official.firebaseapp.com",
  databaseURL: "https://referral-rise-official-default-rtdb.firebaseio.com",
  projectId: "referral-rise-official",
  storageBucket: "referral-rise-official.appspot.com",
  messagingSenderId: "227546326703",
  appId: "1:227546326703:web:c778b8b72349aa7319565a",
  measurementId: "G-ZQ80QBF1Y8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);