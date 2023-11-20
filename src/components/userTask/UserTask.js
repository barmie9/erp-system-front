import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ApiDataService from "../../services/ApiDataService";
import ProgressBar from "../progressBar/PrgogressBar";
import './UserTask.css';

export default function UserTask(){
    const { state } = useLocation();
    const [task, setTask] = useState({});
    const [percentageProg, setPercentageProg] = useState(10);
    const [showMessage, setShowMessage] = useState(false);

    useEffect( () => {
        fetchTask();
    },[]);

    const fetchTask = async () => {
        const response = await ApiDataService.getTaskById(state.taskId);
         setTask(response.data);
         setPercentageProg(response.data.progress);
        //  console.log("PROGRESS:: ", percentageProg);
    }

    const handleSaveProgress = () => {
        console.log("SAVE PROGRESS: ", percentageProg);
        const response = ApiDataService.updateProgresTask(state.taskId,percentageProg);

        // Pokazuj komunikat
        setShowMessage(true);

        // Ukryj komunikat po 2000 milisekundach (2 sekundy)
        setTimeout(() => {
        setShowMessage(false);
        }, 1000);
    }

    return(
        <div className="user-task-content">
            <div id="task-name" className="task-name-container">
                <h1>Twoje zadanie: {task.name}</h1>
                {/* <h2>{task.name}</h2> */}
            </div>

            <div id="task-progress" className="task-progress-container">
                <ProgressBar percent={percentageProg} />
                <div>
                    <input type="range" min="1" max="100" step="1" style={{width: "100%", height: "30px"}} value={percentageProg} onChange={ (e) => {setPercentageProg(e.target.value)} }/>
                </div>
                <button className="button" onClick={handleSaveProgress}>Zapisz</button>
                {showMessage && <div className="message-container">Progres zaaktualizowany</div>}
            </div>

            <hr className="line" />
            <div id="task-descr" className="task-descr-container">
                <h2>Opis:</h2>
                <div className="task-description">
                    {task.descr}
                </div>
            </div>
            <hr className="line" />
            <div id="task-dates" className="task-dates-container">
                <h2>Data rozpoczęcia: {task.start}</h2>
                <h2>Data zakończenia: {task.end}</h2>
            </div>
            <hr className="line" />

            <hr className="line" /> 
        </div>
    )
}