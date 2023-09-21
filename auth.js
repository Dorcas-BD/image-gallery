import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./app/firebaseConfig";

if (!firebase.getApps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { auth };
