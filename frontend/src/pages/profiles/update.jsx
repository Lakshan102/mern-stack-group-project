import { useContext, useEffect, useState } from 'react'
import "./update.css"
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/storeContext'
import axios from 'axios'
import { SERVER_URL } from '../../../globals.js'
import { assets } from '../../assets/assets.js'

const Update = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const { token } = useContext(StoreContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return;
    const fetchDatafromBackend = async () => {
      setLoading(true)
      try {
        const { data } = await axios.post(`${SERVER_URL}/api/user/get-profile-by-token`, {
          token
        })
        setEmail(data.email)
        setName(data.name)
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    }
    fetchDatafromBackend()
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${SERVER_URL}/api/user/update`, {
        name, email
      })
      alert("Profile updated")
      navigate('/profiles')
    } catch (error) {
      alert(error)
    }
  }

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>

      
      <div className='profile-update'>
        <form onSubmit={handleSubmit} className='profile-update-inner' >

          <div className='left'>
            <h1>Update profile</h1>
            <img src={assets.happyfood} alt="" />  
          </div>

          <div className="right">
            <h2>Name</h2>
            <label htmlFor="html">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter new name" />
            </label>

            <button type='submit' >Update</button>            
          </div>
        </form>
      </div>
    </>
  )
}

export default Update