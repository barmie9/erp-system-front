import React, { useState } from "react";

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) =>{

    }

    return(
        <div>
            <form onSubmit={handleLogin}>
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
                <button className="button" type="submit">Zaloguj</button>
            </form>
        </div>
    );
};

export default Login;