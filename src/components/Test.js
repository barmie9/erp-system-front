import React, { useEffect, useState } from "react";
import '../App.css'
import { useNavigate } from 'react-router-dom';
import AuthenticationService from "../services/AuthenticationService";
import {formatDate} from '../services/DataConverter';

import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import ApiDataService from "../services/ApiDataService";

function Test(){
  const [tasks, setTasks] = useState([]);
  const [isTasksLoaded, setTasksLoaded] = useState(false);

  useEffect( () => {
    fetchTasks().then( () => { 
      setTasksLoaded(true);
    });
  },[])

    // Dodatkowy useEffect, który reaguje na zmianę danych
    useEffect(() => {
      console.log('TASKS DB: ', tasks);
    }, [tasks]);

  const fetchTasks = async () => {

    const response = await ApiDataService.getTasksByOrderId(1);
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

    return(

        // Do poprawy statyczna szerokość
        <div className="scroll-view"> 
            {/* {isTasksLoaded ? <Gantt tasks={tasks} locale="pl" /> : <p>Loading...</p>} */}
            {/* <Gantt /> */}
        </div>
    )
}

export default Test;