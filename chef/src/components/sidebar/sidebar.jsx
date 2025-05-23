import './sidebar.css'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

function sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to={'/add'} className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Food</p>
        </NavLink>
        <NavLink to={'/list'} className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>View List</p>
        </NavLink>
      
      </div>
        
       
      
    </div>
  )
}

export default sidebar
