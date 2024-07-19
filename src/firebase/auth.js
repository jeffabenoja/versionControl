import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth"
import { auth, db } from "./firebase"
import { setDoc, doc, getDoc } from "firebase/firestore"

export const userCreateWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const doSignInUserWithEmailAndPassword = async (email, password) => {
  const userCredential = await firebaseSignInWithEmailAndPassword(
    auth,
    email,
    password
  )
  return userCredential
}

export const signInUserWithGoogle = async () => {
  const provider = new GoogleAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    // Check if the user already exists in Firestore
    const userDocRef = doc(db, "users", user.uid)
    const userDoc = await getDoc(userDocRef)

    // If the user document does not exist, save additional information
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        firstName: user.displayName.split(" ")[0], // Assuming displayName contains the full name
        lastName: user.displayName.split(" ")[1] || "", // Handle cases where last name might not be available
        birthday: "", // Birthday may not be available from Google, so set it as an empty string or handle it appropriately
        email: user.email,
      })
    }

    return result
  } catch (error) {
    console.error("Error signing in with Google:", error)
  }
}

export const signOut = async () => {
  return await firebaseSignOut(auth)
}
