import { useState, useEffect, useContext, useReducer } from 'react';
import './profile.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { SERVER_URL } from '../../../globals';
import { StoreContext } from '../../context/storeContext';
import { assets } from '../../assets/assets';

const UserProfile = () => {

  const [userData,setUserData] = useState(null)

  const {token,setToken} = useContext(StoreContext)

  const navigate = useNavigate()

  useEffect(() => {

    if(!token) return;
    const fetchDatafromBackend = async ()=>{

      try {
        const {data} = await axios.post(`${SERVER_URL}/api/user/get-profile-by-token`,{
          token
        })

        setUserData(data)
      } 
      catch (error) {
        alert(error)
      }
    }

    fetchDatafromBackend()
  }, [token])
  
  const deleteAccount = async () => {

    try {
      await axios.post(`${SERVER_URL}/api/user/delete`, {
        email: userData.email
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Account deleted");
      setToken(null);

      localStorage.removeItem("token");
      navigate("/")

    } 
    catch (error) {
      alert(error);
    }
  };

  if(!userData){
    return <>Loading...</>;
  }
                 
  return (
    <>
    
      
      <div className='profile'>
        
        <div className='profile-inner'>
          <div className='profile-left'>

            <h1>My Profile</h1>
            <h3>Hi, {userData.name}</h3>
            <img src={assets.happyfood} alt="" />

          </div>
          <div className='profile-right'>

            <h2>Name</h2>
            <p>{userData.name}</p> {/* Display the name here */}
            <h2>Email</h2>
            <p>{userData.email}</p> {/* Display the email here */}
            
            <button>
              <Link to={'/update'}>Update Account</Link>
            </button>
            
            <button className='delete' onClick={deleteAccount}>Delete Account</button>          
          </div>

        </div>
      </div>
    </>
  );
};

export default UserProfile;