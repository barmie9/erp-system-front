import React from "react";
import { Link} from 'react-router-dom';

function Navigation(){
    return(
        <div id='sidebar' className='columnsidebar'>
            <nav>
                <div className='sidebarrow'>
                    <Link to="/">Strona Główna</Link>
                </div>
                <div className='sidebarrow'>
                    <Link to="/login">Logowanie</Link>
                </div>
                <div className='sidebarrow'>
                    <Link to="/register">Rejestracja</Link>
                </div>
                <div className='sidebarrow'>
                    <Link to="/orders">Zlecenia</Link>
                </div>
            </nav>
        </div>

    )
}

export default Navigation;