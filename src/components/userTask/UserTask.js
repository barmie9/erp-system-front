import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ApiDataService from "../../services/ApiDataService";
import ProgressBar from "../progressBar/PrgogressBar";
import './UserTask.css';

export default function UserTask() {
    const { state } = useLocation();
    const [task, setTask] = useState({});
    const [percentageProg, setPercentageProg] = useState(10);
    const [showMessage, setShowMessage] = useState(false);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        fetchTask();
        fetchTaskFileList();
    }, []);

    const fetchTask = async () => {
        const response = await ApiDataService.getTaskById(state.taskId);
        setTask(response.data);
        setPercentageProg(response.data.progress);
    }

    const fetchTaskFileList = async () => {
        const response = await ApiDataService.getTaskFileList(state.taskId);
        setFileList(response.data);
    }

    const handleSaveProgress = async () => {
        const response = await ApiDataService.updateProgressTask(state.taskId, percentageProg);

        if (response.data != null)
            setShowMessage(true);

        setTimeout(() => {
            setShowMessage(false);
        }, 1000);
    }

    const handleDownloadFile = (fileId, fileName) => {
        // todo Do napisania obsługa błędów
        console.log("DOWNLOAD FILE")
        ApiDataService.downloadFile(fileId, fileName);
    }

    return (
        <div className="user-task-content">

            <div id="task-name" className="task-name-container">
                <h1>Twoje zadanie: {task.name}</h1>
            </div>


            <div className="horizontal-flex">
                <div id="task-progress" className="task-progress-container">
                    <ProgressBar percent={percentageProg} />
                    <div>
                        <input type="range" min="1" max="100" step="1" style={{ width: "100%", height: "30px" }} value={percentageProg} onChange={(e) => { setPercentageProg(e.target.value) }} />
                    </div>
                    <button className="button" onClick={handleSaveProgress}>Zapisz</button>
                    {showMessage && <div className="message-container">Progres zaaktualizowany</div>}
                </div>
                <div id="task-dates" className="task-dates-container">
                    <h2>Data rozpoczęcia: {task.start}</h2>
                    <h2>Data zakończenia: {task.end}</h2>
                    <h2>Urządzenie: {task.device}</h2>

                </div>

            </div>

            <div id="task-descr" className="task-descr-container">
                <div className="vertical-flex">
                    <div className="text-container">Dokładny opis zadania:</div>
                    <div className="task-description">
                        {task.descr}
                    </div>
                </div>
                <div className="vertical-flex">
                    <div className="text-container">Załączone pliki:</div>
                    <ul className="file-list-container">
                        {fileList.map(file => (
                            <li key={file.fileId} onClick={() => { handleDownloadFile(file.fileId, file.name) }}>
                                <div className="file-container">{file.name}</div>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </div>
    )
}