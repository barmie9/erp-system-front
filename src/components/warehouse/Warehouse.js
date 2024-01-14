import React, { useEffect, useState } from "react";
import './Warehouse.css';
import ApiDataService from "../../services/ApiDataService";
import { checkFields } from "../../services/ServiceFunctions";

export default function Warehouse() {
    const [semiProducts, setSemiProducts] = useState([]);
    const [name, setName] = useState("");
    const [descr, setDescr] = useState("");
    const [unit, setUnit] = useState("");
    const [quantity, setQuantity] = useState("");
    const [refreshTab, setRefreshTab] = useState(false);
    const [filtr, setFiltr] = useState("");

    useEffect(() => {
        fetchSemiProducts();
    }, [refreshTab]);

    const fetchSemiProducts = async () => {
        const response = await ApiDataService.getSemiProductList();

        setSemiProducts(response.data);
    }


    const handleDeleteSemiProduct = async (semiProductId) => {
        const response = await ApiDataService.deleteSemiProduct(semiProductId);

        if (response.data != "OK") alert("Nie udało się uzunąć: " + response.data);

        setRefreshTab(!refreshTab);
    }
    const handleUpdateQuantity = async (semiProductId) => {
        const foundProduct = semiProducts.find(item => item.id === semiProductId);

        if (checkFields([foundProduct.quantity])) {
            const response = await ApiDataService.updateSemiProductQuantity(semiProductId, foundProduct.quantity);

            if (response.data == "OK") alert(foundProduct.name + " - Ilość : " + foundProduct.quantity);
            setRefreshTab(!refreshTab);
        }

    }

    const upadteQuantity = (id, newValue) => {
        const updatedSemiProducts = semiProducts.map(item =>
            item.id === id ? { ...item, quantity: newValue } : item
        );

        // Aktualizujemy stan nową tablicą
        setSemiProducts(updatedSemiProducts);
    }

    const handleAddSemiProduct = async () => {

        if (checkFields([name, descr, unit, quantity])) {
            const response = await ApiDataService.addSemiProduct(name, descr, unit, quantity);

            setName("");
            setDescr("");
            setUnit("");
            setQuantity(0.0);

            setRefreshTab(!refreshTab);
        }

    }

    return (
        <div>
            <div className="inventory-warehouse">
                <h1 >Stan magazynowy półproduktów:</h1>

                <div className="horizontal-orientation">

                    <div className="custom-input-container">
                        <input placeholder="Nazwa" className="custom-input" type="text" onChange={(e) => { setName(e.target.value) }} value={name} />
                    </div>
                    <div className="custom-input-container">
                        <input placeholder="Opis" className="custom-input" type="text" onChange={(e) => { setDescr(e.target.value) }} value={descr} />
                    </div>
                    <div className="custom-input-container">
                        <input placeholder="Jednostka" className="custom-input" type="text" onChange={(e) => { setUnit(e.target.value) }} value={unit} />
                    </div>
                    <div className="custom-input-container">
                        <input placeholder="Ilość(0.0)" className="custom-input" type="number" step="0.1" onChange={(e) => { setQuantity(e.target.value) }} value={quantity} />
                    </div>
                    <button className="button" onClick={handleAddSemiProduct}>Dodaj</button>
                </div>

                <div className="custom-input-container">
                    <input placeholder="Filtruj po nazwie" className="custom-input" value={filtr} onChange={(e) => { setFiltr(e.target.value) }} />
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
                        {semiProducts.map(semiProduct => (
                            <tr key={semiProduct.id} className='tab-row-body-warehouse' >
                                <td className="tab-tuple-td">{semiProduct.name}</td>
                                <td className="tab-tuple-td">{semiProduct.descr}</td>
                                <td className="tab-tuple-td">{semiProduct.unit}</td>
                                <td className="tab-tuple-td">
                                    <input type="number" step="0.1" value={semiProduct.quantity} onChange={(e) => { upadteQuantity(semiProduct.id, e.target.value) }} className="warehouse-input" placeholder="0.0" />
                                </td>
                                <td><div className="save-button" onClick={() => { handleUpdateQuantity(semiProduct.id) }}>✔</div></td>
                                <td><div className="delete-button-warehouse" onClick={() => { handleDeleteSemiProduct(semiProduct.id) }}>X</div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}