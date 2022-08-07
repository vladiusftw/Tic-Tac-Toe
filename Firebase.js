import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAc1nVGCTHAfGzX9_leXVr2iiFvpwoh07E",
  authDomain: "tic-tac-toe-3ea35.firebaseapp.com",
  projectId: "tic-tac-toe-3ea35",
  storageBucket: "tic-tac-toe-3ea35.appspot.com",
  messagingSenderId: "196493603972",
  appId: "1:196493603972:web:9ea9c5c130406e80bbbed1",
  measurementId: "G-0C77ZL5NJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db}