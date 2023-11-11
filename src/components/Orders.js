import React from "react";
// import { DoRequest } from "./Backend";
import ApiDataService from "../services/ApiDataService";

import { useEffect, useState } from "react";

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect( () => {
        fetchOrders();
    }, []);
    
    async function fetchOrders(){
        const data = (await ApiDataService.getOrders()).data;
        // console.log("BEFORE (DATA): ", data);
        setOrders(data);
        // console.log("AFTER (ORDERS): ", orders);
    }

        return(
            <div>
                <h1>Zlecenia</h1>
                <div>
                    Dodawanie zleceń
                    <button className="button">Nowe zlecenie</button>
                </div>
                <div>
                    <div>Lista zleceń</div>
                    {orders.map( order =>(
                        <div key={order.id} className='semiproductrow'>
                            <div className='semiproducttuple'>{order.id}</div>
                            <div className='semiproducttuple'>{order.name}</div>
                            <div className='semiproducttuple'>{order.quantity}</div>
                            <div className='semiproducttuple'>{order.createDate}</div>
                            <div className='semiproducttuple'>{order.expectDays}</div>
                            <div className='semiproducttuple'>{order.realDays}</div>
                            <div className='semiproducttuple'>{order.orderManager}</div>
                            <div className='semiproducttuple'>{order.companyOrder}</div>
                            <div className='semiproducttuple'>Edytuj</div>
                            <div style={{clear : "both"}}/>
                        </div>
                        ))}
                    
                </div>
            </div>
        )
}

export default Orders;