import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import {
  doSignInUserWithEmailAndPassword,
  signInUserWithGoogle,
} from "../../firebase/auth"
import { useAuth } from "../../context/authContext/AuthContext"
import { auth } from "../../firebase/firebase"

const Login = () => {
  const { userLoggedIn } = useAuth()
  const [isSigningIn, setSigningIn] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      if (!isSigningIn) {
        setSigningIn(true)
        await doSignInUserWithEmailAndPassword(form.email, form.password)
        const user = auth.currentUser
        console.log("Signed in user:", user)
        console.log(user.uid)
      }
    } catch (error) {
      console.error("Login error: ", error)
      if (error.code === "auth/user-not-found") {
        setError("No account found with this email. Please register.")
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.")
      } else if (error.code === "auth/invalid-credential") {
        setError(
          "Invalid login credentials. Please check your email and password."
        )
      } else {
        setError("Unable to Sign In. Please try again later.")
      }
    } finally {
      setSigningIn(false)
    }
  }

  const onGoogleSignIn = async (e) => {
    e.preventDefault()
    if (!isSigningIn) {
      setSigningIn(true)
      try {
        await signInUserWithGoogle()
      } catch (error) {
        console.error("Google Sign-In error: ", error)
        setError("Unable to Sign In with Google. Please try again later.")
      } finally {
        setSigningIn(false)
      }
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace />}
      <div className='container'>
        <div className='row my-4'>
          <div className='col-md-4 mx-auto rounded border p-4'>
            <h2 className='text-center mb-3'>Login Credentials</h2>
            <p className='text-center mb-4'>
              Please enter your email and password
            </p>
            {error && <div className='alert alert-danger'>{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className='row mb-3'>
                <div className='form-floating'>
                  <input
                    type='email'
                    className='form-control'
                    name='email'
                    id='floatingInput'
                    placeholder='name@example.com'
                    autoComplete='off'
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor='floatingInput' className='px-4'>
                    Email address
                  </label>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='form-floating'>
                  <input
                    type='password'
                    className='form-control'
                    name='password'
                    id='floatingPassword'
                    placeholder='Password'
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor='floatingPassword' className='px-4'>
                    Password
                  </label>
                </div>
              </div>
              <div className='row mb-3'>
                <span className='text-center'>
                  <p>
                    <Link
                      to='/forgotpassword'
                      className='link-offset-2 link-underline text-secondary link-underline-opacity-50'
                    >
                      Forgot Password
                    </Link>
                  </p>
                </span>
              </div>
              <div className='row mb-4'>
                <div className='col-sm-4 offset-sm-2 d-grid'>
                  <button type='submit' className='btn btn-primary'>
                    Login
                  </button>
                </div>
                <div className='col-sm-4 d-grid'>
                  <Link
                    to='/register'
                    role='button'
                    className='btn btn-secondary'
                  >
                    Register
                  </Link>
                </div>
              </div>
            </form>
            <div className='row mb-3'>
              <div className='col d-grid'>
                <button onClick={onGoogleSignIn} className='btn btn-danger'>
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
