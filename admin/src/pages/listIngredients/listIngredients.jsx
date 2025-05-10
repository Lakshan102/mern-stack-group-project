import { useEffect, useState } from 'react'
import "./listIngredients.css"
import axios from "axios"
import {toast} from "react-toastify"
import {assets} from '../../assets/assets'

function ListIngredients({url}) {
  
  const [list,setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/ingredient/listIngredient`);
    if (response.data.success) {
      setList(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  const removeIngredient = async (ingredientId) =>{
    const response = await axios.post(`${url}/api/ingredient/removeIngredient`,{id:ingredientId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }

  const reduceQuantity = async (ingredientId) =>{
    const response = await axios.post(`${url}/api/ingredient/reduceQuantity`,{id:ingredientId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }

  const addQuantity = async (ingredientId) =>{
    const response = await axios.post(`${url}/api/ingredient/addQuantity`,{id:ingredientId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }

  return (
    <div className='list add flex-col'>
      <p>Ingredients List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Quantity</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className="list-table-format-in">
              <img className="item_img" src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.quantity}</p>
              <div className="action_bar">
                <button onClick={()=>removeIngredient(item._id)} className='cursor'>X</button>
                <button onClick={()=>addQuantity(item._id)}>
                  <img className="add_icon" src={assets.add_icon} alt="" />
                </button>
                <button onClick={()=>reduceQuantity(item._id)}>
                  <img className="minus_icon" src={assets.minus_icon} alt="" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListIngredients
