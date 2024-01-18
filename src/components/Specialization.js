import React, { useEffect, useState } from "react";
import ApiDataService from "../services/ApiDataService";
import { checkFields } from "../services/ServiceFunctions";

export default function Specialization() {
    const [specializations, setSpecializations] = useState([]);
    const [name, setName] = useState("");

    const [refreshTab, setRefreshTab] = useState(false);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        featchSpecializations();
    }, [refreshTab]);

    const featchSpecializations = async () => {
        const response = await ApiDataService.getSpecializations();

        setSpecializations(response.data);
    }

    const handleAddSpecialization = async () => {

        if (checkFields([name])) {
            const response = await ApiDataService.addSpecialization(name);

            setName("");

            setRefreshTab(!refreshTab);
        }

    }

    const handleDeleteSpecialization = async (specId) => {
        const response = await ApiDataService.deleteSpecialization(specId);

        setRefreshTab(!refreshTab);

        if (response.data != "OK") alert("Nie usunięto: " + response.data);

    }

    const filteredSpecializations = specializations.filter((spec) =>
        spec.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <div className="inventory-warehouse">
                <h1 >Stanowiska pracy:</h1>

                <div className="horizontal-orientation">

                    <div className="custom-input-container">
                        <input placeholder="Nazwa" className="custom-input" type="text" onChange={(e) => { setName(e.target.value) }} value={name} />
                    </div>

                    <button className="button" onClick={handleAddSpecialization}>Dodaj</button>
                </div>

                <div className="custom-input-container">
                    <input placeholder="Filtruj po nazwie" className="custom-input" value={filter} onChange={(e) => { setFilter(e.target.value) }} />
                </div>
                <table className="table">
                    <thead>
                        <tr className='tab-row-header'>
                            <th >Nazwa</th>
                            <th ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSpecializations.map(spec => (
                            <tr key={spec.id} className='tab-row-body-warehouse' >
                                <td className="tab-tuple-td">{spec.name}</td>
                                <td><div className="delete-button-devices" onClick={() => {
                                    handleDeleteSpecialization(spec.id)
                                }}>X</div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}