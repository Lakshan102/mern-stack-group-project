import React from 'react'
import './exploreMenu.css'
import {menu_list} from '../../assets/assets'

function exploreMenu({category,setCategory}) {
  return (
    <div className='exploreMenu' id='exploreMenu'>
      <h1>Check Out Our Menu</h1>
      <p className="exploreMenu_text">Explore a rich and varied menu that offers a delightful selection of dishes, each crafted to perfection. Our culinary team has carefully curated a range of options to satisfy all tastes, ensuring that whether you’re craving a comforting favorite or seeking something new and exciting, there’s something for everyone. We are dedicated to not only meeting but exceeding your expectations, making sure every meal is an unforgettable experience. Our mission is to elevate your dining journey, turning every bite into a moment of pure enjoyment.</p>
      <div className="exploreMenu_list">
        {menu_list.map((item,index)=>{
            return(
                <div onClick={()=>setCategory(prev=>prev === item.menu_name?"All":item.menu_name)} key={index} className="exploreMenu_list_item">
                    <img className={category==item.menu_name?"active":""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr/>
    </div>
  )
}

export default exploreMenu
