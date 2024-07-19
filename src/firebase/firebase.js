// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU4mLYAEm3uuGiIkbMVsRk318Z5ZSm4vA",
  authDomain: "react-project-6af92.firebaseapp.com",
  projectId: "react-project-6af92",
  storageBucket: "react-project-6af92.appspot.com",
  messagingSenderId: "914127504875",
  appId: "1:914127504875:web:b7ed2227a432e5b2d285ae",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
