import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ApiDataService from "../../services/ApiDataService";
import ProgressBar from "../progressBar/PrgogressBar";
import './AdminTask.css';

import { useDropzone } from 'react-dropzone';
import { checkFields } from "../../services/ServiceFunctions";

export default function AdminTask() {
    const { state } = useLocation();
    // const [task, setTask] = useState({});
    const [percentageProg, setPercentageProg] = useState(10);
    const [showMessage, setShowMessage] = useState(false);
    const [fileList, setFileList] = useState([]);

    // Informacje o aktualnie wyświetlanym zadaniu
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [descr, setDescr] = useState('');
    const [name, setName] = useState('');
    const [device, setDevice] = useState('');

    // Do usuwania plików
    const [deleteFileIdList, setDeleteFileIdList] = useState([]);

    // -- Do wczytywania plików z komputera
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (files) => {
            // Obsługa przeciągania i upuszczania plików
            setAcceptedFiles(files);
        }
    });

    useEffect(() => {
        fetchTask();
        fetchTaskFileList();
    }, []);

    const fetchTask = async () => {
        const response = await ApiDataService.getTaskById(state.taskId);
        //  setTask(response.data);
        setName(response.data.name);
        setDescr(response.data.descr);
        setDateStart(response.data.start);
        setDateEnd(response.data.end);
        setDevice(response.data.device);

        setPercentageProg(response.data.progress);
    }

    const fetchTaskFileList = async () => {
        const response = await ApiDataService.getTaskFileList(state.taskId);
        setFileList(response.data);
    }

    const handleEditTask = async () => {
        console.log("EDIT TASK: ");

        if (checkFields([percentageProg, name, descr, dateStart, dateEnd])) {
            // Pokazuj komunikat
            setShowMessage(true);

            // Request edytujący Daty , opis, nazwe. 
            const response = await ApiDataService.updateTask(state.taskId, percentageProg, name, descr, dateStart, dateEnd);

            // Request usuwający pliki
            if (deleteFileIdList.length > 0) {
                const delteResponse = await ApiDataService.deleteFiles(deleteFileIdList);
            }

            // Request dodający pliki
            if (acceptedFiles.length > 0) { // Jeśli użytkownik wybrał jakieś pliki
                const fileResponse = await ApiDataService.addTaskFiles(acceptedFiles, state.taskId);
            }

            // Ukryj komunikat po 1000 milisekundach 
            setTimeout(() => {
                setShowMessage(false);
            }, 1000);
        }

    }

    const handleDownloadFile = (fileId, fileName) => {
        // todo Do napisania obsługa błędów
        console.log("DOWNLOAD FILE")
        ApiDataService.downloadFile(fileId, fileName);
    }

    const handleDeleteFile = (file) => {
        const updatedDeleteFileList = [...deleteFileIdList, file.fileId];
        setDeleteFileIdList(updatedDeleteFileList);

        const updatedFileList = fileList.filter(f => f !== file);
        setFileList(updatedFileList)
    }
    const handleDeleteNewFile = (file) => {
        const updatedAcceptedFiles = acceptedFiles.filter(f => f !== file);

        setAcceptedFiles(updatedAcceptedFiles);
        console.log("updatedAcceptedFiles: ", updatedAcceptedFiles);
    }

    return (
        <div className="user-task-content">

            <div id="task-name" className="task-name-container">
                <h1>Zadanie: {name}</h1>
            </div>


            <div className="horizontal-flex">
                <div id="task-progress" className="task-progress-container">
                    <ProgressBar percent={percentageProg} />
                    <div>
                        <input type="range" min="1" max="100" step="1" style={{ width: "100%", height: "30px" }} value={percentageProg} onChange={(e) => { setPercentageProg(e.target.value) }} />
                    </div>
                </div>
                <div id="task-dates" className="task-dates-container">
                    <div><h2>Nazwa: </h2> <input className="custom-input" value={name} onChange={(e) => { setName(e.target.value) }} /></div>
                    <div>
                        <h2>Data rozpoczęcia: </h2>
                        <input className="custom-input" placeholder="yyyy-MM-dd" value={dateStart} onChange={(e) => { setDateStart(e.target.value) }} />
                    </div>
                    <div>
                        <h2>Data zakończenia: </h2>
                        <input className="custom-input" placeholder="yyyy-MM-dd" value={dateEnd} onChange={(e) => { setDateEnd(e.target.value) }} />
                    </div>
                    <div>
                        <h2>Maszyna/Urządzenie: </h2>
                        <div className="middle-text">{device}</div>
                    </div>
                </div>

            </div>


            <div id="task-descr" className="task-content-container">
                <div className="vertical-flex">
                    <div className="text-container">Edytuj Opis:</div>
                    <div className="task-input-container">
                        <textarea type="text" className="task-textarea-description" value={descr} onChange={(e) => { setDescr(e.target.value) }} />
                    </div>
                </div>
                <div className="vertical-flex">
                    <div className="text-container">Edytuj pliki:</div>

                    <ul className="file-list-container">

                        <section className="dropzone-container">
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <p>Dodaj pliki</p>
                            </div>
                            <aside>
                                <h4>Lista Plików:</h4>
                                {acceptedFiles.map(file => (
                                    <li key={file.path} className="list-row" >
                                        <div style={{ justifyContent: "space-between", backgroundColor: "#81fc83" }} className="horizontal-flex">
                                            <div className="file-container"  >{file.path}</div>
                                            <button className="delete-button" onClick={() => { handleDeleteNewFile(file) }} >X</button>
                                        </div>
                                    </li>
                                ))}
                            </aside>
                        </section>


                        {fileList.map(file => (
                            <li key={file.fileId} className="list-row" >
                                <div style={{ justifyContent: "space-between" }} className="horizontal-flex">
                                    <div className="file-container" onClick={() => { handleDownloadFile(file.fileId, file.name) }} >{file.name}</div>
                                    <button className="delete-button" onClick={() => { handleDeleteFile(file) }}>X</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <button style={{ alignSelf: "flex-end" }} className="button" onClick={handleEditTask}>Zapisz Zmiany</button>
            {showMessage && <div className="message-container">Progres zaaktualizowany</div>}
        </div>
    )
}