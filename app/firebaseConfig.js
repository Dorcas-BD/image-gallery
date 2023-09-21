// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG3bAoBZt584e3EygbgdUOCI3k8uPJH7o",
  authDomain: "image-gallery-87501.firebaseapp.com",
  databaseURL: "https://image-gallery-87501-default-rtdb.firebaseio.com",
  projectId: "image-gallery-87501",
  storageBucket: "image-gallery-87501.appspot.com",
  messagingSenderId: "823831504830",
  appId: "1:823831504830:web:e5997ffcf26144e5d17bef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
