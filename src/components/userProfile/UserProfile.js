import React, { useEffect, useState } from "react";
import ApiDataService from "../../services/ApiDataService";

export default function UserProfile(){
    const [user, setUser] = useState([]);

    useEffect( () => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const userId = await JSON.parse(localStorage.getItem('userId'));
        const response = await ApiDataService.getUserById(userId);
        setUser(response.data);
    }

    return(
        <div>
            <h1>Profil użytkownika {user.email}</h1>
            <h2></h2>
            <h2>Imie i nazwisko: {user.name} {user.surname}</h2>
            <hr className="line" />
            <h2>email: {user.email}</h2>
            <hr className="line" />
            <h2>Numer telefonu: {user.phoneNum}</h2>
            <hr className="line" />
            <h2>Data urodzenia: {user.dob}</h2>
            <hr className="line" />
            <h2>Stanowisko: {user.pesel}</h2>
            <hr className="line" />
            <h2>Uprawnienia: {user.role}</h2>
            <hr className="line" />


        </div>
    )
}