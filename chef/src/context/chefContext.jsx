import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ChefContext = createContext(null);

const ChefContextProvider = (props) => {
    const [foodList, setFoodList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [token, setToken] = useState("");
    const url = "http://localhost:4000";

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/chef/list");
        setFoodList(response.data.data);
    }

    const loadChefData = async (token) => {
        setToken(token);
        await fetchFoodList();
    }

    useEffect(() => {
        async function loadData() {
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadChefData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])
    

    return (
        <ChefContext.Provider value={{ foodList, setFoodList, orderList, setOrderList, token, setToken, url }}>
            {props.children}
        </ChefContext.Provider>
    )
}
export default ChefContextProvider;