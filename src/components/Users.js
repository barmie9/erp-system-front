import React, { useEffect, useState } from "react";
import ApiDataService from "../services/ApiDataService";

function Users(){
    const [usersList, setUsersList] = useState([]);

    useEffect( () => {
        getUsers();
    }, [] );

    const getUsers = async() => {
        const response = await ApiDataService.getUsers();
        setUsersList(response.data);
    }

    const handleEditUser = (id) => {
        console.log("EDIT USER: " , id)
    }

    return(
        <div className="content">
            <h1>
                Lista Pracowników...
            </h1>
            <div className="custom-input-container"><input placeholder="Filtruj po nazwisku" className="custom-input"/></div>

            <table className="table">
                <thead>
                <tr className='tab-row-header'>
                    <th >Imię</th>
                    <th >Nazwisko</th>
                    <th >Email</th>
                    <th >Numer Telefonu</th>
                    <th >Numer PESEL</th>
                    <th >Stanowisko</th>
                    <th >Data urodzenia</th>
                </tr>
                </thead>
                <tbody>
                {usersList.map(user => (
                    <tr key={user.id} className='tab-row-body' onClick={ () => {handleEditUser(user.id)} }>
                    <td className="tab-tuple-td">{user.name}</td>
                    <td className="tab-tuple-td">{user.surname}</td>
                    <td className="tab-tuple-td">{user.email}</td>
                    <td className="tab-tuple-td">{user.phoneNum}</td>
                    <td className="tab-tuple-td">{user.pesel}</td>
                    <td className="tab-tuple-td">{user.specialization}</td>
                    <td className="tab-tuple-td">{user.dob}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
}

export default Users;