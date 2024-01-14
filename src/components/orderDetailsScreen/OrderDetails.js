import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
// import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import { Gantt } from 'gantt-task-react';
import Select from "react-select";
import ApiDataService from "../../services/ApiDataService";
import { formatDate, formatDateToStr } from '../../services/DataConverter';
import './OrderDetails.css';

import { useDropzone } from 'react-dropzone';
import { checkFields } from "../../services/ServiceFunctions";

function OrderDetails() {
    const [refreshGantt, setRefreashGantt] = useState(false);
    const [refreshEditOrder, setRefreshEditOrder] = useState(false);

    // Dane otrzymane z rodzica (Aktualnie wybrane zlecenie)
    const { state } = useLocation();
    const [order, setOrder] = useState([]);

    const [tasks, setTasks] = useState([]);
    const [isTasksLoaded, setTasksLoaded] = useState(false);

    // -- Do selecta listy pracownikow (dodaj zadanie)
    const [employeeId, setEmployeeId] = useState(null);
    const [employeeStr, setEmployeeStr] = useState("");
    const [employeeOptions, setEmployeeOptions] = useState([]);

    // -- Do dodania nowego zadania dla zlecenia
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskDescr, setNewTaskDescr] = useState("");
    const [newTaskDateStart, setNewTaskDateStart] = useState(null);
    const [newTaskDateEnd, setNewTaskDateEnd] = useState(null);

    // -- Do edycji aktualnego zlecenia
    const [editOrderName, setEditOrderName] = useState("");
    const [editOrderQuantity, setEditOrderQuantity] = useState("");
    const [editOrderDate, setEditOrderDate] = useState(null);

    // -- Select do edycji:
    const [companyOptions, setCompanyOptions] = useState([]);
    const [companyStr, setCompanyStr] = useState("");
    const [companyId, setCompanyId] = useState(null);

    // -- Select do urządzeń
    const [deviceOptions, setDeviceOptions] = useState([]);
    const [deviceStr, setDeviceStr] = useState("");
    const [deviceId, setDeviceId] = useState(null);

    // -- Do wczytywania plików z komputera
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (files) => {
            // Obsługa przeciągania i upuszczania plików
            setAcceptedFiles(files);
        }
    });

    // Do nawigowania pomiędzy ekrananami
    const navigate = useNavigate();

    const today = new Date();
    const maxDate = new Date(today.getFullYear() + 20, 11, 31); // 20 lat do przodu

    // Odświeżenie Wykresu Gantta po dodaniu nowego zadania
    useEffect(() => {
        fetchTasks().then(() => {
            setTasksLoaded(true);
        });
    }, [refreshGantt]);

    // Jednorazowe załadowanie danych przy wywołaniu komponentu
    useEffect(() => {
        fetchEmployee();
        fetchcCompanyOrder();
        fetchDevices();
        // loadDataFromParent();
    }, []);

    // Odświeżenie edycji Zlecenia
    useEffect(() => {
        fetchOrder();
    }, [refreshEditOrder]);

    const fetchTasks = async () => {
        const response = await ApiDataService.getTasksByOrderId(state.id);
        const convertData = await convertDates(response.data);
        setTasks(convertData);
    }
    const fetchEmployee = async () => {
        const response = await ApiDataService.getUsers();
        const userOptions = await convertUsers(response.data)
        setEmployeeOptions(userOptions);
    }
    const fetchcCompanyOrder = async () => {
        const response = await ApiDataService.getCompanyOrder();
        var options = [];
        response.data.map(element => {
            options.push({ label: element.name, value: element.id });
        });
        setCompanyOptions(options);
    };

    const fetchOrder = async () => {
        const response = await ApiDataService.getOrderById(state.id);
        setOrder(response.data);
    }

    const fetchDevices = async () => {
        const response = await ApiDataService.getDevices();
        var options = [];
        options.push({ label: 'brak', value: 0 })
        response.data.map(e => {
            options.push({ label: e.name + ' - ' + e.descr + ' - max os. ' + e.personNum, value: e.id });
        });
        setDeviceOptions(options);
    }


    const convertUsers = async (users) => {
        return users.map(
            (item) => {
                return {
                    value: item.id,
                    label: item.name + ' ' + item.surname,
                };
            });
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


    const setEmployee = (selectedOption) => {
        setEmployeeId(selectedOption.value);
        setEmployeeStr(selectedOption);

    }

    const setDevice = (selectedOption) => {
        setDeviceId(selectedOption.value);
        setDeviceStr(selectedOption);

    }

    const handleAddTask = async () => {


        if (checkFields([newTaskName, newTaskDescr, newTaskDateStart, newTaskDateEnd, employeeId, deviceId])) {
            const response = await ApiDataService.addTask(newTaskName, newTaskDescr, formatDateToStr(newTaskDateStart),
                formatDateToStr(newTaskDateEnd), employeeId, state.id, deviceId);

            if (response.data == "OK") {
                if (acceptedFiles.length > 0) { // Jeśli użytkownik wybrał jakieś pliki
                    const fileResponse = await ApiDataService.addTaskFiles(acceptedFiles, response.data);
                }

                // Czyszczenie inputów:
                setNewTaskName("");
                setNewTaskDescr("");
                setNewTaskDateStart(null);
                setNewTaskDateEnd(null);
                setEmployeeId(null);
                setEmployeeStr("");
                setDeviceId(null);
                setDeviceStr("");

                setAcceptedFiles([]);

                // Odświeżenie wykresu Gantta (Ponowne pobranie z serwera)
                setRefreashGantt(!refreshGantt);
            }
            else {
                alert("KONFLIKT: " + response.data);
            }

        }

    }

    const handleEditOrder = async () => {

        if (checkFields([editOrderName, editOrderQuantity, companyId, editOrderDate])) {
            const response = await ApiDataService.editOrder(order.id, editOrderName, editOrderQuantity, companyId, formatDateToStr(editOrderDate));

            // Czyszczenie inputów 
            setEditOrderName("");
            setEditOrderQuantity("");
            setCompanyId(null);
            setCompanyStr("");
            setEditOrderDate(null);

            // Odświeżenie komponentów korzystającyhc ze zlecenia
            setRefreshEditOrder(!refreshEditOrder);
        }
    }


    return (
        <div className="content">

            <h1> Zlecenie: {order.name}</h1>

            <hr className="line" />

            <h2>Edytuj Zlecenie</h2>
            <div className="flex-left">
                <div className="horizontal-orientation">
                    <div style={{ minWidth: "150px" }}>Nazwa: </div>
                    <div className="custom-input-container">
                        <input placeholder={order.name} className="custom-input" type="text" onChange={(e) => { setEditOrderName(e.target.value) }} value={editOrderName} />
                    </div>
                </div>
                <div className="horizontal-orientation">
                    <div style={{ minWidth: "150px" }}>Ilość: </div>
                    <div className="custom-input-container">
                        <input placeholder={order.quantity} className="custom-input" type="number" onChange={(e) => { setEditOrderQuantity(e.target.value) }} value={editOrderQuantity} />
                    </div>
                </div>

                <div className="horizontal-orientation">
                    <div style={{ minWidth: "150px" }}>Zleceniodawca: </div>
                    <div className="custom-input-container">
                        <Select
                            value={companyStr}
                            onChange={(selectedOption) => {
                                setCompanyStr(selectedOption);
                                setCompanyId(selectedOption.value);
                            }}
                            options={companyOptions}
                            isSearchable
                            placeholder={order.companyOrder}
                        />
                    </div>
                </div>


                <div className="horizontal-orientation">
                    <div style={{ minWidth: "150px" }}>Data zakończenia: </div>
                    <div className="custom-input-container">
                        <DatePicker
                            onChange={(date) => { setEditOrderDate(date) }}
                            placeholderText={order.expectDate}
                            selected={editOrderDate}
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

                <button style={{ alignSelf: "end" }} className="button" onClick={handleEditOrder}>Edytuj</button>
            </div>
            <hr className="line" />


            <h1>Wykres Gantta Zlecenia: </h1>

            {/* Wykres Gantta - Wyświetlany tylko wtedy gdy tablica z zadaniami nie jest pusta i dane zostały pobrane z serwera*/}
            <div className="scroll-view">
                {isTasksLoaded ?
                    (tasks.length ? <Gantt tasks={tasks} locale="pl" onClick={(task) => { navigate("/orders/details/userTask", { state: { taskId: task.id } }) }} /> : <h2>Brak zadań w zleceniu.</h2>) :
                    <p>Loading...</p>}
            </div>

            <hr className="line" />

            <h2>Dodaj Zadanie: </h2>

            <div className="horizontal-orientation">
                <div className="custom-input-container">
                    <input placeholder="Nazwa" className="custom-input" type="text" onChange={(e) => { setNewTaskName(e.target.value) }} value={newTaskName} />
                </div>
                <div className="custom-input-container">
                    <input placeholder="Opis" className="custom-input" type="text" onChange={(e) => { setNewTaskDescr(e.target.value) }} value={newTaskDescr} />
                </div>
                <div className="custom-input-container">
                    <Select
                        value={employeeStr}
                        onChange={setEmployee}
                        options={employeeOptions}
                        isSearchable
                        placeholder="Pracownik"
                    />
                </div>
            </div>

            <div className="horizontal-orientation">
                <div className="custom-input-container">
                    <DatePicker
                        onChange={(date) => { setNewTaskDateStart(date) }}
                        placeholderText={"Od"}
                        selected={newTaskDateStart}
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
                        onChange={(date) => { setNewTaskDateEnd(date) }}
                        placeholderText={"Do"}
                        selected={newTaskDateEnd}
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
                    <Select
                        value={deviceStr}
                        onChange={setDevice}
                        options={deviceOptions}
                        isSearchable
                        placeholder="Urządzenie"
                    />
                </div>
            </div>


            <section className="dropzone-container">
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Kliknij tutaj lub upuść, aby doać pliki</p>
                </div>
                <aside>
                    <h4>Lista Plików:</h4>
                    <ul>
                        {
                            acceptedFiles.map(file => (
                                <li key={file.path}>
                                    {file.path} - {file.size} bytes
                                </li>
                            ))
                        }
                    </ul>
                </aside>

            </section>
            <div>
                <button className="button" onClick={handleAddTask}>Dodaj zadanie</button>
            </div>


            <hr className="line" />

        </div>
    )
}

export default OrderDetails;