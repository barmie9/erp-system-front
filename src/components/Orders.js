import React from "react";
import ApiDataService from "../services/ApiDataService";
import DatePicker from 'react-datepicker';
import Select from "react-select";
import {formatDateToStr} from "../services/DataConverter";

//npm install date-fns
// Potrzebny do ustawienia polskiego w DataPicker (Nie działa)
import pl from 'date-fns/locale/pl'; // Importuj lokalizację dla polskiego języka

import { Link, useNavigate } from "react-router-dom";


import { useEffect, useState } from "react";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const navigate = useNavigate();

    useEffect( () => {
        getOrders();
    }, [refresh]);
    
    const getOrders = async () => {
        const response = await ApiDataService.getOrders(); 
        setOrders(response.data);
    }

    const handleRefresh = () => {
        setRefresh(!refresh);
      };

    const handleOrderDetails = (order) => {
        console.log("HANDLE ORDER DETAILS");
        navigate("/orders/details", { state: order } );    
    }

      const dataToPass = { name: 'John Doe', age: 25 };

        return(
            <div className="content">
                <h1>Zlecenia</h1>
                <h2>Dodaj zlecenie:</h2>
                <AddOrder refreshParent={handleRefresh} />

                {/* <Link to={{ pathname: '/orderdetails', state: dataToPass }}>Go to Other Component</Link> */}

                <h2>Lista zleceń:</h2>
                <div className="custom-input-container"><input placeholder="Filtruj po nazwisku" className="custom-input"/></div>
                <table className="table">
                    <thead>
                    <tr className='tab-row-header'>
                        <th >Nazwa</th>
                        <th >Ilość</th>
                        <th >Kierownik</th>
                        <th >Zleceniodawca</th>
                        <th >Data utworzenia</th>
                        <th >Oczekiwana data zakończenia</th>
                        <th >Realna data zakończenia</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => (
                        <tr key={order.id} className='tab-row-body' onClick={ () => {handleOrderDetails(order)} }>
                        <td className="tab-tuple-td">{order.name}</td>
                        <td className="tab-tuple-td">{order.quantity}</td>
                        <td className="tab-tuple-td">{order.orderManager}</td>
                        <td className="tab-tuple-td">{order.companyOrder}</td>
                        <td className="tab-tuple-td">{order.createDate}</td>
                        <td className="tab-tuple-td">{order.expectDate}</td>
                        <td className="tab-tuple-td">{order.realDate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
}

const AddOrder = ({ refreshParent }) => {
    const [orderName, setOrderName] = useState('');
    const [quantity,setQuantity] = useState('');
    const [datePicker, setDatePicker] = useState(null);
    const [companyOptions, setCompanyOptions] = useState([]);
    const [companyStr, setCompanyStr] = useState('');
    const [companyId, setCompanyId] = useState(null);
    const [userId,setUserId] = useState(localStorage.getItem("userId"));
 

    useEffect( () => {
        fetchcCompanyOrder();
    },[] )

    const handleDataPicker = (date) => {
        setDatePicker(date);
    }

    const fetchcCompanyOrder = async () => {
        const response = await ApiDataService.getCompanyOrder(); 
        var options = [] ;
        response.data.map(element => {
            options.push({label: element.name, value: element.id});
        });
        setCompanyOptions(options);
    }

    const setCompany = (selectedOption) =>{
        setCompanyId(selectedOption.value);
        setCompanyStr(selectedOption);

    }

    const today = new Date();
    const maxDate = new Date(today.getFullYear() + 20, 11, 31); // 20 lat do przodu

    const handleAddOrder = async() => {

        const response = await ApiDataService.addOrder(orderName,quantity,formatDateToStr(today),formatDateToStr(datePicker),formatDateToStr(datePicker),userId,companyId);
        setOrderName('');
        setQuantity('');
        setDatePicker(null);
        setCompanyStr('');
        refreshParent();
        
    }

    return(
        <div className="horizontal-orientation">
            <div className="custom-input-container">
                <input placeholder="Nazwa" className="custom-input" type="text" onChange={ (e) => {setOrderName(e.target.value)} } value={orderName}/>
            </div>
            <div className="custom-input-container">
                <input placeholder="Ilość" className="custom-input" type="number" onChange={ (e) => {setQuantity(e.target.value)} } value={quantity}/>
            </div>

            <div className="custom-input-container">
                <Select
                    // styles={{padding: "0px"}}
                    value={companyStr}
                    onChange={setCompany}
                    options={companyOptions}
                    isSearchable
                    placeholder="Zleceniodawca..."
                    // className="custom-input"
                />
            </div>
            

            <div className="custom-input-container">
                <DatePicker 
                    onChange={handleDataPicker} 
                    placeholderText={'Data Zakończenia'} 
                    selected={datePicker} 
                    dateFormat="yyyy-MM-dd"
                    showYearDropdown
                    yearDropdownItemNumber={20} // Określa ilość lat wyświetlanych na liście rozwijanej
                    scrollableYearDropdown // Pozwala na przewijanie listy rozwijanej lat
                    minDate={today} // Ustala minimalna datę na dzisiejszą datę
                    maxDate={maxDate}
                    className="custom-input"
                    // locale={pl} // Ustaw polską lokalizację
                />
            </div>
            <div style={{marginRight: "10px",paddingRight: "10px"}}>
                <button className="button" onClick={handleAddOrder}>Dodaj</button>
            </div>

        </div>
    )
}

export default Orders;