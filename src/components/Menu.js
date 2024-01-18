import React from 'react';
import { Link } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService';

function Menu(props) {


  return (
    <nav className="menu">
      <div className="menu-div">

        <div className='menu-li'><Link to="/">O nas</Link></div>

        {props.role !== null && <div className='menu-li'><Link to="/profile">Moje konto</Link></div> }
        {props.role !== null && <div className='menu-li' onClick={ AuthenticationService.logout} ><Link to="/">Wyloguj</Link></div> }
        {props.role === null && <div className='menu-li'><Link to="/login">Zaloguj</Link></div> }
        {props.role === null && <div className='menu-li'><Link to="/register">Rejestracja</Link></div> }
        
      </div>
    </nav>
  );
}

export default Menu;