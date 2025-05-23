import React, { useEffect, useState } from 'react'
import "./list.css"
import axios from "axios"
import {toast} from "react-toastify"

function List({url}) {

  
  const [list,setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/chef/list`);
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

  const removeFood = async (foodId) =>{
    const response = await axios.post(`${url}/api/chef/remove`,{id:foodId});
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
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Ingredients</b>
          <b>Category</b>
          <b>Cost</b>
          <b>Status</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.ingredients}</p>
              <p>{item.category}</p>
              <p>Rs.{item.cost}</p>
              <p className='status'>{item.status}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
