import { useState } from "react"
import { Navigate } from "react-router-dom"

import "react-datepicker/dist/react-datepicker.css"
import { register } from "./storeNewUser"

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      if (!isRegistered) {
        setIsRegistered(true)
        // Create user with email and password
        register(form.firstName, form.lastName, form.email, form.password)
      }
    } catch (error) {
      console.error("Registration error:", error)
      setError("Failed to register. Please try again.")
    } finally {
      setIsRegistered(false)
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleDateChange = () => {
    setForm({
      ...form,
      // birthDate: form.birthDate.toISOString().split("T")[0], // Convert to YYYY-MM-DD format
    })
  }

  return (
    <>
      {isRegistered && <Navigate to={"/login"} replace />}
      <div className='container'>
        <div className='row my-4'>
          <div className='col-md-4 mx-auto rounded border p-4'>
            <h2 className='text-center mb-3'>Register</h2>
            <p className='text-center mb-4'>Please enter your credentials</p>
            {error && <div className='alert alert-danger'>{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className='row mb-3'>
                <div className='form-floating'>
                  <input
                    type='text'
                    className='form-control'
                    name='firstName'
                    id='floatingFirstName'
                    placeholder='Enter First Name'
                    autoComplete='off'
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor='floatingFirstName' className='px-4'>
                    First Name
                  </label>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='form-floating'>
                  <input
                    type='text'
                    className='form-control'
                    name='lastName'
                    id='floatingLastName'
                    placeholder='Enter Last Name'
                    autoComplete='off'
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor='floatingLastName' className='px-4'>
                    Last Name
                  </label>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='form-floating'>
                  <input
                    type='email'
                    className='form-control'
                    name='email'
                    id='floatingEmail'
                    placeholder='name@example.com'
                    autoComplete='off'
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor='floatingEmail' className='px-4'>
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

              <div className='row mb-4'>
                <div className='col offset d-grid'>
                  <button type='submit' className='btn btn-primary'>
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
