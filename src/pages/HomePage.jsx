import { useAuth } from "../context/authContext/AuthContext"

const HomePage = () => {
  const { userData } = useAuth()

  if (!userData) {
    return <div>Loading...</div>
  }
  return (
    <div className='container my-4'>
      Welcome,{" "}
      <span className='fw-bold text-primary fs-5'>{userData.firstName}</span>!
      How's your day!
    </div>
  )
}

export default HomePage
