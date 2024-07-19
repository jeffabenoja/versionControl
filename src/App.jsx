import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import HomePage from "./pages/HomePage"
import ContactPage from "./pages/ContactPage"
import NotFoundPage from "./pages/NotFoundPage"
import ProductList from "./pages/admin/products/ProductList"
import { ProductProvider } from "./context/ProductContext"
import UpdateProductModal from "./pages/admin/products/UpdateProductModal"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import { AuthProvider } from "./context/authContext/AuthContext"
import PrivateRoute from "./private/PrivateRoute"

const App = () => {
  //Define router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* <Route path='/' element={<Sample />} /> */}
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/'
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path='home' element={<HomePage />} />
          <Route path='contact' element={<ContactPage />} />
          <Route path='admin/products' element={<ProductList />} />
          <Route path='admin/products/:id' element={<UpdateProductModal />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </>
    )
  )

  return (
    <AuthProvider>
      <ProductProvider>
        <RouterProvider router={router} />
      </ProductProvider>
    </AuthProvider>
  )
}

export default App
