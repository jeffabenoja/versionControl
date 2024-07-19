import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useEffect, useRef, useState } from "react"
import { useProductContext } from "../../../context/ProductContext"

const UpdateProductModal = () => {
  const { id } = useParams()
  const { updateProduct, validationErrors, getProduct } = useProductContext()
  const [product, setProduct] = useState(null)

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)

  const imageInputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Pass a callfucntion to set the multiple state
    getProduct(`/${id}`, (data) => {
      setProduct(data)
      setName(data.name)
      setPrice(data.price)
      setDescription(data.description)
      setImage(data.imageFileName)
    })
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Create a FormData object
    const formData = new FormData()
    formData.append("name", name)
    formData.append("price", price)
    formData.append("description", description)
    formData.append("imageFileName", image)

    if (!name || !price || !description) {
      toast.error("Please fill all the input fields")
      return
    }

    updateProduct(formData, id)

    setName("")
    setPrice("")
    setDescription("")
    setImage(null)
    imageInputRef.current.value = ""

    navigate("/admin/products")
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setImage(file)
  }

  return (
    <div className='container my-4'>
      <div className='row'>
        <div className='col-md-8 mx-auto rounded border p-4'>
          <h2 className='text-center mb-5'>Update Product</h2>
          <div className='row mb-3'>
            <label htmlFor='name' className='col-sm-4 col-form-label'>
              ID
            </label>
            <div className='col-sm-8'>
              <input
                readOnly
                type='text'
                className='form-control-plaintext'
                defaultValue={id}
              />
            </div>
          </div>
          {product && (
            <form onSubmit={handleSubmit}>
              <div className='row mb-3'>
                <label htmlFor='name' className='col-sm-4 col-form-label'>
                  Name
                </label>
                <div className='col-sm-8'>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span className='text-danger'>{validationErrors.name}</span>
                </div>
              </div>
              <div className='row mb-3'>
                <label htmlFor='price' className='col-sm-4 col-form-label'>
                  Price
                </label>
                <div className='col-sm-8'>
                  <input
                    type='number'
                    className='form-control'
                    id='price'
                    name='price'
                    value={price}
                    onWheel={(e) => e.target.blur()}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <span className='text-danger'>{validationErrors.price}</span>
                </div>
              </div>
              <div className='row mb-3'>
                <label
                  htmlFor='description'
                  className='col-sm-4 col-form-label'
                >
                  Description
                </label>
                <div className='col-sm-8'>
                  <textarea
                    className='form-control'
                    id='description'
                    name='description'
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <span className='text-danger'>
                    {validationErrors.description}
                  </span>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='offset-sm-4 col-sm-8'>
                  <img
                    src={`/images/${image}`}
                    alt='product image'
                    width='150'
                  />
                </div>
              </div>
              <div className='row mb-3'>
                <label htmlFor='image' className='col-sm-4 col-form-label'>
                  Image
                </label>
                <div className='col-sm-8'>
                  <input
                    type='file'
                    className='form-control'
                    id='image'
                    name='image'
                    onChange={handleImageChange}
                    ref={imageInputRef}
                  />
                  <span className='text-danger'>{validationErrors.image}</span>
                </div>
              </div>

              <div className='row mb-3'>
                <label htmlFor='image' className='col-sm-4 col-form-label'>
                  Created At
                </label>
                <div className='col-sm-8'>
                  <input
                    className='form-control-plaintext'
                    readOnly
                    defaultValue={product.createdAt.slice(0, 10)}
                  />
                </div>
              </div>

              <div className='row'>
                <div className='col-sm-4 offset-sm-4 d-grid'>
                  <button type='submit' className='btn btn-primary'>
                    Submit
                  </button>
                </div>
                <div className='col-sm-4 d-grid'>
                  <Link
                    to='/admin/products'
                    role='button'
                    className='btn btn-secondary'
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default UpdateProductModal
