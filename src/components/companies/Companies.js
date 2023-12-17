import React, { useEffect, useState } from "react";
import './Companies.css'
import ApiDataService from "../../services/ApiDataService";

export default function Companies(){
    const [companyName, setCompanyName] = useState("");
    const [companyNumber, setCompanyNumber] = useState("");
    const [companyNIP, setCompanyNIP] = useState("");

    const [companies, setCompanies] = useState([]);

    const [showMessage, setShowMessage] = useState(false);
    const [messageContent, setMessageContent] = useState("");

    useEffect( () => {
        fetchCompanies();
    }, [])

    const fetchCompanies = async () => {
        const response = await ApiDataService.getCompanyOrder();
        setCompanies(response.data);
    }

    const handleAddCompany = async () => {
        const response = await ApiDataService.addCompanyOrder(companyName,companyNumber,companyNIP);
        await fetchCompanies();
    }

    const handleDeleteCompany = async (companyId) => {
        const response = await ApiDataService.deleteCompanyOrder(companyId);
        if(response.data != "OK"){
            setMessageContent(response.data);
            setShowMessage(true);
            
            // Ukryj komunikat po 3000 milisekundach 
            setTimeout(() => {
                setShowMessage(false);
                }, 3000);
        }
    }

    const handleEditCompany = (companyId) => {
        console.log("EDIT COMPANY ID: ", companyId);

    }


    return(
        <div className="companies-content">
            <h1>Lista Zleceniodawców</h1>
            <div className="horizontal-orientation">

                <div className="custom-input-container">
                    <input placeholder="Nazwa" className="custom-input" type="text" onChange={ (e) => {setCompanyName(e.target.value)} } value={companyName}/>
                </div>
                <div className="custom-input-container">
                    <input placeholder="Numer Tel. (Opcjonalnie)" className="custom-input" type="text" onChange={ (e) => {setCompanyNumber(e.target.value)} }  value={companyNumber}/>
                </div>
                <div className="custom-input-container">
                    <input placeholder="NIP (Opcjonalnie)" className="custom-input" type="text" onChange={ (e) => {setCompanyNIP(e.target.value)} }  value={companyNIP}/>
                </div>
                <button className="button" onClick={handleAddCompany}>Dodaj</button>
            </div>

            {showMessage && <div className="message-error-container">{messageContent}</div>} 


            <table className="table">
                    <thead>
                    <tr className='tab-row-header'>
                        <th >Nazwa</th>
                        <th >Numer Telefonu</th>
                        <th >Numer NIP</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {companies.map(company => (
                        <tr key={company.id} className='tab-row-body' >
                        <td className="tab-tuple-td" onClick={ () => {handleEditCompany(company.id)} } >{company.name}</td>
                        <td className="tab-tuple-td" onClick={ () => {handleEditCompany(company.id)} } >{company.phoneNumber == null ? '-' : company.phoneNumber}</td>
                        <td className="tab-tuple-td" onClick={ () => {handleEditCompany(company.id)} } >{company.nipNumber == null ? "-" : company.nipNumber}</td>
                        <td><div className="delete-button" onClick={ () => {handleDeleteCompany(company.id)}}>X</div></td>
                        </tr>
                    ))}
                    </tbody>
                </table>

        </div>
    )
}