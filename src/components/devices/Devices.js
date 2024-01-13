import React, { useEffect, useState } from "react";
import './Devices.css';
import ApiDataService from "../../services/ApiDataService";

export default function Devices() {
    const [devices, setDevices] = useState([]);
    const [name, setName] = useState("");
    const [descr, setDescr] = useState("");
    const [personNum, setPersonNum] = useState("");

    const [refreshTab, setRefreshTab] = useState(false);
    const [filtr, setFiltr] = useState("");

    useEffect(() => {
        featchDevices();
    }, [refreshTab]);

    const featchDevices = async () => {
        const response = await ApiDataService.getDevices();

        setDevices(response.data);
    }

    const handleAddDevice = async () => {
        const response = await ApiDataService.addDevice(name, descr, personNum);

        setName("");
        setDescr("");
        setPersonNum("");

        setRefreshTab(!refreshTab);
    }

    const handleDeleteDevice = async (deviceId) => {
        const response = await ApiDataService.deleteDevice(deviceId);

        setRefreshTab(!refreshTab);

        if (response.data != "OK") alert("Nie usunięto: " + response.data);

    }

    return (
        <div>
            <div className="inventory-warehouse">
                <h1 >Lista urządzeń:</h1>

                <div className="horizontal-orientation">

                    <div className="custom-input-container">
                        <input placeholder="Nazwa" className="custom-input" type="text" onChange={(e) => { setName(e.target.value) }} value={name} />
                    </div>
                    <div className="custom-input-container">
                        <input placeholder="Opis" className="custom-input" type="text" onChange={(e) => { setDescr(e.target.value) }} value={descr} />
                    </div>
                    <div className="custom-input-container">
                        <input placeholder="max liczba osób" className="custom-input" type="number" onChange={(e) => { setPersonNum(e.target.value) }} value={personNum} />
                    </div>

                    <button className="button" onClick={handleAddDevice}>Dodaj</button>
                </div>

                <div className="custom-input-container">
                    <input placeholder="Filtruj po nazwie" className="custom-input" value={filtr} onChange={(e) => { setFiltr(e.target.value) }} />
                </div>
                <table className="table">
                    <thead>
                        <tr className='tab-row-header'>
                            <th >Nazwa</th>
                            <th >Opis</th>
                            <th >Maksymalna liczba osób</th>
                            <th ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map(device => (
                            <tr key={device.id} className='tab-row-body-warehouse' >
                                <td className="tab-tuple-td">{device.name}</td>
                                <td className="tab-tuple-td">{device.descr}</td>
                                <td className="tab-tuple-td">{device.personNum}</td>
                                <td><div className="delete-button-devices" onClick={() => { handleDeleteDevice(device.id) }}>X</div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}