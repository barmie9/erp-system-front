import React, { useState } from "react";
import '../App.css'
import { useNavigate } from 'react-router-dom';
import AuthenticationService from "../services/AuthenticationService";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Zatrzymania domyślnego zachowania przeglądarki. W kontekście formularza, domyślne zachowanie polega na przesłaniu danych formularza i przeładowaniu strony.

        //Logowanie w aplikacji back-endowej
        const data = await AuthenticationService.login(email, password);

        // todo Do napisania weryfikacja danych
        console.log("LOGIN DATA: ", data);

        setEmail('');
        setPassword('');

        navigate('/')
        window.location.reload(); // Przeładowanie strony w celu załadowania nowych danych z pamięci przeglądarki (token/role)
    }

    return (
        <div id="loginform" className="form">
            <h1>Zaloguj się !</h1>
            <form>
                <div className="custom-input-container">
                    <input placeholder="Email" className="custom-input" onChange={handleEmail} value={email} type="text" name="email" />
                </div>
                <div className="custom-input-container">
                    <input placeholder="Hasło" className="custom-input" onChange={handlePassword} value={password} type="password" name="password" />
                </div>

                <div><button className="button" type="submit" onClick={handleSubmit}>Zaloguj</button></div>

            </form>
        </div>
    );
};

export default Login;