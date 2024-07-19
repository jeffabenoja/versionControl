import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AddProductModal } from "../../../components/modal/CustomModal"
import { useProductContext } from "../../../context/ProductContext"

export default function ProductList() {
  const [products, setProducts] = useState([])
  const { getProduct, deleteProduct } = useProductContext()

  useEffect(() => {
    getProduct("?_sort=id&_order=desc", setProducts)
  }, [])

  return (
    <div className='container my-4'>
      <h2 className='text-center mb-4'>Products</h2>

      <div className='row mb-3'>
        <div className='col'>
          <AddProductModal />

          <button
            type='button'
            className='btn btn-outline-primary'
            onClick={() => getProduct("?_sort=id&_order=desc", setProducts)}
          >
            Refresh
          </button>
        </div>
        <div className='col'></div>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{`$ ${product.price}`}</td>
              <td>{product.description}</td>
              <td>{product.createdAt.slice(0, 10)}</td>
              <td>
                <img
                  src={`http://localhost:7000/images/${product.imageFileName}`}
                  alt='product image'
                  width='100'
                />
              </td>
              <td>
                <Link
                  to={`/admin/products/${product.id}`}
                  className='btn btn-primary btn-sm me-1'
                >
                  Edit
                </Link>

                <button
                  type='button'
                  className='btn btn-danger btn-sm'
                  onClick={() => {
                    deleteProduct(product.id)
                    getProduct("?_sort=id&_order=desc", setProducts)
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
