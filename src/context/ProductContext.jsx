import React, { createContext, useContext, useState } from "react"
import { toast } from "react-toastify"

const ProductContext = createContext()

export const useProductContext = () => {
  return useContext(ProductContext)
}

export const ProductProvider = ({ children }) => {
  const [validationErrors, setValidationErrors] = useState({})

  //Function to delete product
  const deleteProduct = async (params) => {
    try {
      const res = await fetch(`/api/products/${params}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
    } catch (error) {
      console.log(`Unable to delete the product`, error)
    }
  }

  // Function to add the product
  const addProduct = async (newProduct) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: newProduct,
      })

      const data = await res.json()

      if (res.ok) {
        // Product created correctly
        toast.success("Successfully added new product")
      } else if (res.status === 400) {
        setValidationErrors(data)
      } else {
        toast.error("Unable to create new product")
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
    } catch (error) {
      console.log("Unable to connect to the server!", error)
    }
  }

  // Function to update the product
  const updateProduct = async (updateProduct, params) => {
    try {
      const res = await fetch(`/api/products/${params}`, {
        method: "PATCH",
        body: updateProduct,
      })

      const data = await res.json()

      if (res.ok) {
        // Product created correctly
        toast.success("Successfully update the product")
      } else if (res.status === 400) {
        setValidationErrors(data)
      } else {
        toast.error("Unable to update product")
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
    } catch (error) {
      console.log("Unable to connect to the server!", error)
    }
  }

  // Function to fetch all the product
  const getProduct = async (url, setData) => {
    try {
      const response = await fetch(`/api/products${url}`)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      setData(data)
    } catch (error) {
      console.log("Something went wrong", error)
    }
  }

  const value = {
    addProduct,
    validationErrors,
    updateProduct,
    getProduct,
    deleteProduct,
  }

  return (
    <ProductContext.Provider value={{ value }}>
      {children}
    </ProductContext.Provider>
  )
}
