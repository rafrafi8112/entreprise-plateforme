// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7h-P5VeDLLicp1fiBgsc4udWQY2mOrVk",
  authDomain: "auth-d683b.firebaseapp.com",
  projectId: "auth-d683b",
  storageBucket: "auth-d683b.appspot.com",
  messagingSenderId: "647090875753",
  appId: "1:647090875753:web:68cf13b22ebb299848a1f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
export const auth= getAuth(app);