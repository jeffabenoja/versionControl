import { setDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import { userCreateWithEmailAndPassword } from "../../firebase/auth"

export const register = async (firstName, lastName, email, password) => {
  const userCredential = await userCreateWithEmailAndPassword(email, password)
  const user = userCredential.user

  await setDoc(doc(db, "users", user.uid), {
    firstName: firstName,
    lastName: lastName,
    email: email,
  })

  console.log("User registered and data stored in Firestore", user)
}
