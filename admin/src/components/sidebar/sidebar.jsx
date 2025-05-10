import React from 'react'
import "./sidebar.css"
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

function sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
            <img src={assets.list} alt="" />
            <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink>
        <NavLink to='/new' className="sidebar-option">
            <img src={assets.new_food} alt="" />
            <p>New Foods</p>
        </NavLink>
        <NavLink to='/add-ingredients' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Ingredients</p>
        </NavLink>
        <NavLink to='/list-ingredients' className="sidebar-option">
            <img src={assets.list} alt="" />
            <p>List Ingredients</p>
        </NavLink>
      </div>
    </div>
  )
}

export default sidebar
