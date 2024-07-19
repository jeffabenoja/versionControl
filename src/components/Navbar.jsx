import { NavLink, useNavigate } from "react-router-dom"
import { signOut as firebaseSignOut } from "../firebase/auth"

const Navbar = () => {
  const navigate = useNavigate()

  const onLogout = async () => {
    try {
      await firebaseSignOut()
      navigate("/login")
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-white border-bottom box-shadow'>
        <div className='container'>
          <NavLink to='/' className='navbar-brand'>
            Euan's Store
          </NavLink>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    `${isActive ? "text-primary" : ""} nav-link`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  to='/contact'
                  className={({ isActive }) =>
                    `${isActive ? "text-primary" : ""} nav-link `
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
            <ul className='navbar-nav'>
              <li className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle text-dark'
                  href='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Admin
                </a>
                <ul className='dropdown-menu'>
                  <li>
                    <NavLink
                      to='/admin/products'
                      className='dropdown-item'
                      href='product'
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/profile'
                      className='dropdown-item'
                      href='profile'
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <hr className='dropdown-divider' />
                  </li>
                  <li>
                    {/* <NavLink
                      to='/logout'
                      className='dropdown-item'
                      href='logout'
                    >
                      Log out
                    </NavLink> */}
                    <button className='dropdown-item' onClick={onLogout}>
                      Log Out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
