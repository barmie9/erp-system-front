
import React from 'react';
import './App.css';

import {BrowserRouter as Router} from 'react-router-dom';

// Układ Strony NR 1 
import Header from './components/Header';
import Menu from './components/Menu';
import MenuLeft from './components/MenuLeft';
import Footer from './components/Footer';
import MainContent from './components/MainContent';



function App() {


  const checkUserRole = () => {
    return "USER";
    // return "ADMIN";
    // return null;
  }


  return (
      <div className="app">
      <Header />
      <Router>
        <Menu role={checkUserRole()} />
        <div className="main-content">
          <MenuLeft role={checkUserRole()}/>
          <MainContent role={checkUserRole()}/>
        </div>
      </Router>
      <Footer />
      </div>

  );

}

export default App;

