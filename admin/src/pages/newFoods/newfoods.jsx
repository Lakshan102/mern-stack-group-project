import {useEffect, useState} from 'react'
import { assets } from '../../assets/assets'
import "./newfood.css"
import axios from 'axios'


function Newfoods({url}) {

    const [foods,setFoods] = useState([]);

    const fetchAllFoods = async () =>{
        const response = await axios.get(url+"/api/chef/list");
        if(response.data.success){
            setFoods(response.data.data);
            console.log(response.data.data);
        }else{
            console.log("Error");
        }
    }
    const statusHandler = async (event,foodId) =>{
        const response = await axios.post(url+"/api/chef/status",{
        foodId,
        status:event.target.value
        })
        if(response.data.success){
        await fetchAllFoods()
        }
  }
    useEffect(()=>{
        fetchAllFoods();
    },[])

  return (
    <div className='order add'>
      <h3>New Food page</h3>
        <div className="order-list">
            {foods.map((food,index)=>(
            <div key={index} className="order-item">
                <img src={assets.f_parcel_icon} alt="" />
                <div>
                <p className="order-item-food">
                    Name: {food.name}
                </p>
                <p className="order-item-name">
                    Ingredients: {food.ingredients}
                </p>
                <p className="order-item-name">
                    Cost: Rs.{food.cost}
                </p>
                <p className="order-item-name">
                    Category: {food.category}
                </p>
                <select onChange={(event)=>statusHandler(event,food._id)} value={food.status}>
                    <option value="Pending">Pending</option>
                    <option value="Approve">Approve</option>
                    <option value="Reject">Reject</option>
                </select>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Newfoods
