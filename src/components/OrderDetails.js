import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from 'react-datepicker';
// import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import { Gantt } from 'gantt-task-react';
import ApiDataService from "../services/ApiDataService";
import {formatDate} from '../services/DataConverter';

function OrderDetails (){
    const [tasks, setTasks] = useState([]);
    const [isTasksLoaded, setTasksLoaded] = useState(false);
    const [datePicker,setDatePicker] = useState(null);
    const { state } = useLocation();
    console.log("DETAILS HOOK: ", state);

    useEffect( () => {
        fetchTasks().then( () => { 
          setTasksLoaded(true);
        });
      },[])
   
      const fetchTasks = async () => {
        const response = await ApiDataService.getTasksByOrderId(state.id);
        const convertData = await convertDates(response.data);
        setTasks(convertData);
      }
    
      const convertDates = async (data) => {
        const convDate = data.map((task) => {
          return {
            ...task,
            start: formatDate(task.start),
            end: formatDate(task.end),
          };
        });
        return convDate;
      }

    const handleDataPicker = (date) => {
        setDatePicker(date);
    }

    const today = new Date();
    const maxDate = new Date(today.getFullYear() + 20, 11, 31); // 20 lat do przodu


    return(
        <div className="content">

            <h1> Zlecenie: {state.name}</h1>

            <hr className="line" />

            <h2>Edytuj Zlecenie</h2>
            <div className="flex-left">
                <div className="horizontal-orientation">
                    <div style={{minWidth: "150px"}}>Nazwa: </div>
                    <div className="custom-input-container">
                        <input placeholder={state.name}  className="custom-input"/>
                    </div>
                </div>
                <div className="horizontal-orientation">
                    <div style={{minWidth: "150px"}}>Ilość: </div>
                    <div className="custom-input-container">
                        <input placeholder={state.quantity} className="custom-input"/>
                    </div>
                </div>
                <div className="horizontal-orientation">
                    <div style={{minWidth: "150px"}}>Manager: </div>
                    <div className="custom-input-container">
                        <input placeholder={state.orderManager} className="custom-input"/>
                    </div>
                </div>
                <div className="horizontal-orientation">
                    <div style={{minWidth: "150px"}}>Zleceniodawca: </div>
                    <div className="custom-input-container">
                        <input placeholder={state.companyOrder} className="custom-input"/>
                    </div>
                </div>
                <div className="horizontal-orientation">
                    <div style={{minWidth: "150px"}}>Data zakończenia: </div>
                    <div className="custom-input-container">
                        <DatePicker 
                            onChange={handleDataPicker} 
                            placeholderText={state.expectDate} 
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
                </div>

                <button style={{ alignSelf: "end"}} className="button">Edytuj</button>
            </div>
            <hr className="line" />


            <h1>Wykres Gantta Zlecenia: </h1>

            {/* Wykres Gantta */}
            <div className="scroll-view"> 
                {isTasksLoaded ? 
                ( tasks.length? <Gantt tasks={tasks} locale="pl" /> : <h2>Brak zadań w zleceniu.</h2>): 
                <p>Loading...</p>}
            </div>

            <hr className="line" />

            <h2>Dodaj Zadanie: </h2>

            <div className="horizontal-orientation">
                <div className="custom-input-container">
                    {/* <input placeholder="Nazwa" className="custom-input" type="text" onChange={ (e) => {setOrderName(e.target.value)} } value={orderName}/> */}
                    <input placeholder="Nazwa" className="custom-input" type="text" />
                </div>
                <div className="custom-input-container">
                    <input placeholder="Pracownik" className="custom-input" type="number" />
                </div>

                <div className="custom-input-container">
                <DatePicker 
                        onChange={handleDataPicker} 
                        placeholderText={state.expectDate} 
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
                <div className="custom-input-container">
                <DatePicker 
                        onChange={handleDataPicker} 
                        placeholderText={state.expectDate} 
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
                    <button className="button" >Dodaj</button>
                </div>
            </div>

            <hr className="line" />

        </div>
    )
}

export default OrderDetails;