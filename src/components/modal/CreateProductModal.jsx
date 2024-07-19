import { toast } from "react-toastify"
import { useRef, useState } from "react"
import { useProductContext } from "../../context/ProductContext"

const CreateProductModal = () => {
  const { addProduct, validationErrors } = useProductContext()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const imageInputRef = useRef(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Create a FormData object
    const formData = new FormData()
    formData.append("name", name)
    formData.append("price", price)
    formData.append("description", description)
    formData.append("image", image)

    if (!name || !price || !description || !image) {
      toast.error("Please fill all the input fields")
      return
    }

    addProduct(formData)

    setName("")
    setPrice("")
    setDescription("")
    setImage(null)
    imageInputRef.current.value = ""
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setImage(file)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='modal-header mb-3'>
          <h2 className='text-center modal-title fs-5' id='createProductModal'>
            Create Product
          </h2>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='modal'
            aria-label='Close'
          ></button>
        </div>
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
              step='0.01'
              min='1'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <span className='text-danger'>{validationErrors.price}</span>
          </div>
        </div>
        <div className='row mb-3'>
          <label htmlFor='description' className='col-sm-4 col-form-label'>
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
            <span className='text-danger'>{validationErrors.description}</span>
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

        <div className='modal-footer'>
          <button
            type='button'
            className='btn btn-secondary'
            data-bs-dismiss='modal'
          >
            Close
          </button>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProductModal
