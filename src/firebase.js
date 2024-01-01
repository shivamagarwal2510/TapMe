// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDirTfU6qXVeKwZqZr3pu3Rt2KHULbMISs",
  authDomain: "tapme-7ba10.firebaseapp.com",
  projectId: "tapme-7ba10",
  storageBucket: "tapme-7ba10.appspot.com",
  messagingSenderId: "323639762301",
  appId: "1:323639762301:web:cf957b2558161bddbd4014",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

