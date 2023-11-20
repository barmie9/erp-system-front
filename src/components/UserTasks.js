import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiDataService from "../services/ApiDataService";
import {getUserIdFromMemory} from '../services/MemoryService';

function UserTasks(){
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect( () => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await ApiDataService.getTasksByUserId(getUserIdFromMemory());
        setTasks(response.data);
    }

    const handleEditTask = (id) => {
        navigate("/tasks/task", { state: {taskId: id} });
    }

    const progresColor = (progress) =>{
        if(progress < 25)
            return '#FF6E6E';
        if(progress >= 25 && progress < 100)
            return '#FFD56E';

        return '#6EFF6E';
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
                style={{backgroundColor: progresColor(task.progress)}}
                className={`tab-row-body `}   
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