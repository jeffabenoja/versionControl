import CreateProductModal from "./CreateProductModal"

export const AddProductModal = () => {
  return (
    <>
      <button
        type='button'
        className='btn btn-primary me-1'
        data-bs-toggle='modal'
        data-bs-target='#createProduct'
      >
        Create Product
      </button>

      <div
        className='modal fade'
        id='createProduct'
        tabIndex='-1'
        aria-labelledby='Create-Product-Modal'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-body'>
              <CreateProductModal />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
