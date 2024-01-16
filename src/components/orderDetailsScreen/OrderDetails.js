import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import { Gantt } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import Select from "react-select";
import ApiDataService from "../../services/ApiDataService";
import { formatDate, formatDateToStr } from '../../services/DataConverter';
import './OrderDetails.css';

import { useDropzone } from 'react-dropzone';
import { checkFields } from "../../services/ServiceFunctions";

function OrderDetails() {
    const [refreshGantt, setRefreashGantt] = useState(false);
    const [refreshEditOrder, setRefreshEditOrder] = useState(false);
    const [refreshOrderSemiProduct, setRefreshOrderSemiProduct] = useState(false);

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

    // -- Do dodawania półproduktów
    const [filter, setFilter] = useState("");
    const [orderSemiProducts, setOrderSemiProducts] = useState([]);
    const [semiProductOptions, setSemiProductOptions] = useState([]);
    const [semiProductStr, setSemiProductStr] = useState("");
    const [semiProductId, setSemiProductId] = useState(null);
    const [orderSemiProductQuantity, setOrderSemiProductQuantity] = useState("");

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
        fetchSemiProducts();
    }, []);

    useEffect(() => {
        fetchOrderSemiProducts();
    }, [refreshOrderSemiProduct]);

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

    const fetchSemiProducts = async () => {
        const response = await ApiDataService.getSemiProductList();
        var options = [];
        response.data.map(e => {
            options.push({ label: e.name + ' - ' + e.descr, value: e.id });
        });

        setSemiProductOptions(options);
    }

    const fetchOrderSemiProducts = async () => {
        const response = await ApiDataService.getOrderSemiProducts(state.id);
        setOrderSemiProducts(response.data);

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

    const setSemiProduct = (selectedOption) => {
        setSemiProductId(selectedOption.value);
        setSemiProductStr(selectedOption);

    }

    const handleAddTask = async () => {
        if (checkFields([newTaskName, newTaskDescr, newTaskDateStart, newTaskDateEnd, employeeId, deviceId])) {
            const response = await ApiDataService.addTask(newTaskName, newTaskDescr, formatDateToStr(newTaskDateStart),
                formatDateToStr(newTaskDateEnd), employeeId, state.id, deviceId);

            if (response.data.id != null) {
                if (acceptedFiles.length > 0) {
                    const fileResponse = await ApiDataService.addTaskFiles(acceptedFiles, response.data.id);
                }

                setNewTaskName("");
                setNewTaskDescr("");
                setNewTaskDateStart(null);
                setNewTaskDateEnd(null);
                setEmployeeId(null);
                setEmployeeStr("");
                setDeviceId(null);
                setDeviceStr("");

                setAcceptedFiles([]);

                setRefreashGantt(!refreshGantt);
            }
            else {
                alert("KONFLIKT: urządzenie zajęte");
            }
        }
    }

    const handleEditOrder = async () => {
        if (checkFields([editOrderName, editOrderQuantity, companyId, editOrderDate])) {
            const response = await ApiDataService.editOrder(
                order.id, editOrderName, editOrderQuantity, companyId, formatDateToStr(editOrderDate));

            setEditOrderName("");
            setEditOrderQuantity("");
            setCompanyId(null);
            setCompanyStr("");
            setEditOrderDate(null);

            setRefreshEditOrder(!refreshEditOrder);
        }
    }

    const upadteQuantity = async (id, newValue) => {
        const updatedOrderSemiProducts = orderSemiProducts.map(item =>
            item.id === id ? { ...item, quantity: newValue } : item
        );

        // Aktualizujemy stan nową tablicą
        setOrderSemiProducts(updatedOrderSemiProducts)
    };

    const handleUpdateQuantity = async (id, quantity) => {
        if (checkFields([quantity])) {
            const response = await ApiDataService.updateOrderSemiProductQuantity(id, quantity);

            if (response.data != "OK") alert(response.data);
            else {
                alert("Zaaktualizowano dane");
                setRefreshOrderSemiProduct(!refreshOrderSemiProduct);
            }

        }
    };

    const handleDeleteSemiProduct = async (id) => {
        const response = await ApiDataService.deleteOrderSemiProduct(id);
        if (response.data == "OK") {
            setRefreshOrderSemiProduct(!refreshOrderSemiProduct);
        }
        else {
            alert(response.data);
        }
    };

    const handleAddOrderSemiProduct = async () => {
        const response = await ApiDataService.addOrderSemiProduct(order.id, semiProductId, orderSemiProductQuantity);

        if (response.data != "OK") {
            alert("Błąd dodawania produktu: ", response.data);
        }
        else {
            // Czyszczenie inputów 
            setOrderSemiProductQuantity("");
            setSemiProductId(null);
            setSemiProductStr("");

            setRefreshOrderSemiProduct(!refreshOrderSemiProduct);
        }
    }

    const filteredOrderSemiProducts = orderSemiProducts.filter((product) =>
        product.semiProduct.name.toLowerCase().includes(filter.toLowerCase())
    );

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

            <div id="gantt-scroll-view" className="scroll-view">
                {isTasksLoaded ?
                    (tasks.length ? <Gantt tasks={tasks} locale="pl" onClick={(task) => {
                        navigate("/orders/details/userTask", { state: { taskId: task.id } })
                    }} /> : <h2>Brak zadań w zleceniu.</h2>) :
                    <p>Ładowanie wykresu...</p>}
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

            <h1>Niezbędne półprodukty:</h1>
            <h2>Dodaj półprodukt: </h2>
            <div className="horizontal-orientation">
                <div className="custom-input-container">
                    <Select
                        value={semiProductStr}
                        onChange={setSemiProduct}
                        options={semiProductOptions}
                        isSearchable
                        placeholder="Półprodukt"
                    />
                </div>

                <div >
                    <input placeholder="Ilość" className="small-input" type="number" step="0.1" onChange={(e) => { setOrderSemiProductQuantity(e.target.value) }} value={orderSemiProductQuantity} />
                </div>

                <div>
                    <button className="button" onClick={handleAddOrderSemiProduct}>Dodaj </button>
                </div>

            </div>

            <h2>Lista półproduktów: </h2>
            <div className="custom-input-container">
                <input placeholder="Filtruj po nazwie" className="custom-input" value={filter} onChange={(e) => { setFilter(e.target.value) }} />
            </div>

            <table className="table">
                <thead>
                    <tr className='tab-row-header'>
                        <th >Nazwa</th>
                        <th >Opis</th>
                        <th >Jednostka</th>
                        <th >Ilość</th>
                        <th ></th>
                        <th ></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrderSemiProducts.map(semiProduct => (
                        <tr key={semiProduct.id} className='tab-row-body-warehouse'
                            style={{ backgroundColor: semiProduct.semiProduct.quantity <= 0 ? '#fc8b8b' : '#90fc90' }}>
                            <td className="tab-tuple-td">{semiProduct.semiProduct.name}</td>
                            <td className="tab-tuple-td">{semiProduct.semiProduct.descr}</td>
                            <td className="tab-tuple-td">{semiProduct.semiProduct.unit}</td>
                            <td className="tab-tuple-td">
                                <input type="number" step="0.1" value={semiProduct.quantity}
                                    onChange={(e) => { upadteQuantity(semiProduct.id, e.target.value) }}
                                    className="warehouse-input" placeholder="0.0" />
                            </td>
                            <td>
                                <div className="save-button" onClick={() => {
                                    handleUpdateQuantity(semiProduct.id, semiProduct.quantity)
                                }}>✔</div>
                            </td>
                            <td>
                                <div className="delete-button-warehouse" onClick={() => {
                                    handleDeleteSemiProduct(semiProduct.id)
                                }}>X</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <hr className="line" />
        </div>
    )
}

export default OrderDetails;