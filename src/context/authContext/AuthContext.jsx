import { useEffect, useState } from "react"
import { auth, db } from "../../firebase/firebase"
import { createContext, useContext } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { getDoc, doc } from "firebase/firestore"

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializer)
    return unsubscribe
  }, [])

  const initializer = async (user) => {
    if (user) {
      setCurrentUser({ ...user })
      setUserLoggedIn(true)

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (userDoc.exists()) {
          setUserData(userDoc.data())
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    } else {
      setCurrentUser(null)
      setUserLoggedIn(false)
      setUserData(null)
    }

    setLoading(false)
  }

  const value = {
    currentUser,
    userData,
    userLoggedIn,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
