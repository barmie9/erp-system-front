import React from "react";
import Login from "./Login";
import {Route, Routes} from 'react-router-dom';
import Home from "./Home";
import Register from "./Register";

function MainContent(props){

    return(
        <div>
            {props.role === 'ADMIN' && <AdminContent />}
            {props.role === 'USER' && <UserContent />}
            {props.role === null && <NoUserContent />}
        </div>
    )
}

function AdminContent(){
    return(
        <Routes>
            <Route path="/"  Component={Home} />
            <Route path="/orders" Component={ () => {return(<h1>Zlecenia</h1>)} } />
            <Route path="/companies" Component={ () => {return(<h1>Lista Zleceniodawców</h1>)} } />
            <Route path="/magazin" Component={ () => {return(<h1>Stan Magazynowy</h1>)} } />
            <Route path="/semi-products" Component={ () => {return(<h1>Półprodukty</h1>)} } />
            <Route path="/users" Component={ () => {return(<h1>Użytkownicy</h1>)} } />
            <Route path="/test" Component={ () => {return(<h1>Ekran do testów</h1>)} } />
        </Routes>
    )
}

function UserContent(){
    return(
        <Routes>
            <Route path="/"  Component={Home} />
            <Route path="/tasks" Component={ () => {return(<h1>Twoje zadania</h1>)} } />
            <Route path="/test" Component={ () => {return(<h1>Ekran do testów</h1>)} } />
        </Routes>
    )
}

function NoUserContent(){
    return(
        <Routes>
            <Route path="/"  Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/test" Component={ () => {return(<h1>Ekran do testów</h1>)} } />
            <Route path="register" Component={Register} />
        </Routes>
    )
}

export default MainContent;