import React, { useEffect, useState } from "react";
import '../App.css'
import { useNavigate } from 'react-router-dom';
import AuthenticationService from "../services/AuthenticationService";
import {formatDate} from '../services/DataConverter';

import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import ApiDataService from "../services/ApiDataService";

//npm install react-circular-progressbar
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

function Test(){
  const [text, setText] = useState('test');


    return(

        <div > 
          <textarea type="text" 
            style={{
              width: '200px', // Określona szerokość
              height: '50px', // Określona wysokość
              fontSize: 'large',
            }}
            value={text}
            onChange={ (e) => {setText(e.target.value)} } 
          />
        </div>
    )
}

export default Test;
