// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// config obj
const firebaseConfig = {
  apiKey: "AIzaSyBBCySDgaKTmKGKWzqWPBpj05J9Y4iqj2w",
  authDomain: "oqpai-4e758.firebaseapp.com",
  projectId: "oqpai-4e758",
  storageBucket: "oqpai-4e758.appspot.com",
  messagingSenderId: "819540597123",
  appId: "1:819540597123:web:eb8773f88da3d70edd7eb6",
  measurementId: "G-K0Q8ZKX7CV",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
