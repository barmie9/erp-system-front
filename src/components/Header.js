import React from 'react';
import Logo from '../images/icon_enterprise.png';

function Header() {
  return (
    <header className="header">
      <img src={Logo} alt="Opis obrazu" style={{height: '50px',width: '50px', marginRight: '18px', float: 'left',marginLeft: '10px', marginTop: '8px'}}/>
      <h2>  System wspomagający zarządzanie produkcją</h2>
      <div style={{clear: 'both'}}></div>
    </header>
  );
}

export default Header;