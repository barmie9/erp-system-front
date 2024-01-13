import React from 'react';
import { Link } from 'react-router-dom';


function MenuLeft(props) {
    return (
        <aside className="menu-left">

            <div className='columnsidebar'>
                {props.role === 'ADMIN' && <AdminMenu />}
                {props.role === 'USER' && <UserMenu />}
                {props.role === null && <NoUserMenu />}
            </div>
        </aside>
    );
}



function UserMenu() {
    return (
        <nav>
            <div className='sidebarrow'><Link to="/">Strona Główna</Link></div>
            <div className='sidebarrow'><Link to="/tasks">Zadania</Link></div>
            <div className='sidebarrow'><Link to="/test">Test</Link></div>
        </nav>
    )
}

function AdminMenu() {
    return (
        <nav>
            <div className='sidebarrow'><Link to="/">Strona Główna</Link></div>
            <div className='sidebarrow'><Link to="/orders">Zlecenia</Link></div>
            <div className='sidebarrow'><Link to="/companies">Zleceniodawcy</Link></div>
            <div className='sidebarrow'><Link to="/magazin">Stan Magazynowy</Link></div>
            <div className='sidebarrow'><Link to="/users">Pracownicy</Link></div>
            <div className='sidebarrow'><Link to="/test">Test</Link></div>
        </nav>
    )
}

function NoUserMenu() {
    return (
        <nav>
            <div className='sidebarrow'><Link to="/">Strona Główna</Link></div>
            <div className='sidebarrow'><Link to="/test">Test</Link></div>
        </nav>
    )
}

export default MenuLeft;
