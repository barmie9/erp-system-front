import Register from './components/Register'
import Login from './components/Login';

import './App.css';
import { useState } from 'react';
import Navigation from './components/Navigation';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Orders from './components/Orders';

function App() {
  const [contentComponent,setContentComponent] = useState("");

  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/login" exact Component={Login}/>
          <Route path="/register" Component={Register} />
          <Route path="/orders" Component={Orders} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;




