import React, { useState } from "react";
import AuthenticationService from "../services/AuthenticationService";

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin =   (event) =>{
        console.log("PRZED LOGOWANIE: ", username + ' ' + password);
        const data =  AuthenticationService.login(username,password);
        console.log("LOGOWANIE: ", data);

        // setUsername('');
        // setPassword('');
        
    }

    return(
        <div>
            <input 
                className="custom-input"
                type="text"
                placeholder="Email"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <input 
                className="custom-input"
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button className="button" onClick={handleLogin}>Zaloguj</button>
        </div>
    );
};

export default Login;