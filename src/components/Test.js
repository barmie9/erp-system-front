import React, { useState } from "react";
import '../App.css'
import { useNavigate } from 'react-router-dom';
import AuthenticationService from "../services/AuthenticationService";

function Test(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async(event) => {
        event.preventDefault(); // Zatrzymania domyślnego zachowania przeglądarki. W kontekście formularza, domyślne zachowanie polega na przesłaniu danych formularza i przeładowaniu strony.

        // alert("PASSY: " +  email + ' ' + password);

        //Logowanie w backendzie
        const data = await AuthenticationService.login(email,password);
        console.log("LOGIN DATA: ", data);

        setEmail('');
        setPassword('');

        // history.replace('/'); // Zamienienie ścieżki na strone główno, bez możliwości powrotu  (alternatywnie push, gdy potrzebny jest powrot)
        navigate('/')


        window.location.reload();
    }

    return(
        <div id="loginform" className="form">
            <h1>Zaloguj się !</h1>
            <form>
                <div className="custom-input-container">
                    <input  placeholder="Email" className="custom-input" onChange={handleEmail} value={email} type="text" name="email"/>
                </div>
                <div className="custom-input-container">
                    <input placeholder="Hasło" className="custom-input" onChange={handlePassword} value={password} type="password" name="password" />
                </div>
                    
                <div><button className="button" type="submit" onClick={handleSubmit}>Zaloguj</button></div>

            </form>
        </div>
    )
}

export default Test;