import { Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext/AuthContext"

const PrivateRoute = ({ children }) => {
  const { userLoggedIn } = useAuth()

  return userLoggedIn ? children : <Navigate to='/' />
}

export default PrivateRoute
