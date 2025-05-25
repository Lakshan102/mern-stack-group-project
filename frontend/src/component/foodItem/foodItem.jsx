import { useContext, useState } from 'react'
import './foodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/storeContext'

function foodItem({id,name,price,description,image}) {
  
  const {cartItem,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-img' src={url+"/images/"+image} alt='' />
        {!cartItem[id]
          ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt='' />
          :<div className='food-item-counter'>
            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
            <p>{cartItem[id]}</p>
            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
          </div>
        }
      </div>
       <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
        </div>
        <p className="food-item-discription">{description}</p>
        <p className="food-item-price">Rs.{price}</p>
       </div>
    </div>
  )
}

export default foodItem
