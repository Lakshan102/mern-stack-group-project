import { useContext, useState } from 'react'
import './navbar.css'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/storeContext'

function Navbar({setShowLogin}) {

  const [menu,setMenu] = useState("Home")
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext)
  const navigate = useNavigate();
  const logout =()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbarMenu">
        <Link to='/' onClick={()=>setMenu("Home")} className={menu === "Home"? "active":""}>Home</Link>
        <a href='#exploreMenu' onClick={()=>setMenu("Menu")} className={menu === "Menu"? "active":""}>Menu</a>
        <a href='#footer' onClick={()=>setMenu("ContactUs")} className={menu === "ContactUs"? "active":""}>Reach Out</a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-searchicon">
          <Link to='/cart'><img className='cart-icon' src={assets.basket_icon} alt="" /></Link>
          
          <div className={getTotalCartAmount()===0 ? "" : "dot"}> </div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
        :<div className='navbar-profile'>
          <img className='profile' src={assets.profile_icon} alt="" />
          <ul className='navbar-profile-dropdown'>
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={()=>navigate('/profiles')}><img src={assets.set_profile} alt="" /><p>Profile</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
          
          </div>}
        
      </div>
    </div>
  )
}

export default Navbar
