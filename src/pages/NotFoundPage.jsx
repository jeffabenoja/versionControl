import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className='container my-4'>
      <div className='mb-4 px-1'>Page Not Found</div>
      <button
        type='button'
        onClick={() => navigate("/")}
        className='btn btn-outline-primary '
      >
        Go back to Home
      </button> 
    </div>
  )
}

export default NotFoundPage
