import React, { useEffect, useState } from "react";
import ApiDataService from "../services/ApiDataService";
import {getUserIdFromMemory} from '../services/MemoryService';

function UserTasks(){
    const [tasks, setTasks] = useState([]);

    useEffect( () => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await ApiDataService.getTasksByUserId(getUserIdFromMemory());
        setTasks(response.data);
    }

    const handleEditTask = (id) => {
        console.log(" TASK : ", id);
    }

    return(
        <div className="content">
        <h1>Lista zadań: </h1>

        <div className="custom-input-container"><input placeholder="Filtruj..." className="custom-input"/></div>
        <table className="table">
            <thead>
            <tr className='tab-row-header'>
                <th >Nazwa</th>
                <th >Opis</th>
                <th >Data Rozpoczęcia</th>
                <th >Data Zakończenia</th>
                <th >Progres pracy</th>
            </tr>
            </thead>
            <tbody>
            {tasks.map(task => (
                <tr 
                key={task.id} 
                className={`tab-row-body ${task.progress >= 50 ? 'high-progress' : 'low-progress'}`}   
                onClick={ () => {handleEditTask(task.id)} }>
                    
                <td className="tab-tuple-td">{task.name}</td>
                <td className="tab-tuple-td">{task.descr}</td>
                <td className="tab-tuple-td">{task.start}</td>
                <td className="tab-tuple-td">{task.end}</td>
                <td className="tab-tuple-td">{task.progress}%</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    );
}

export default UserTasks ;