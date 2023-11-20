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
  const [percentageProg, setPercentageProg] = useState(10);

  function getRgbaColor (percent){
     let r=0;
     let g=0;
     let b=0;
     let rgbColor = "";
    if(percent <= 50){
      r = 255;
      g = 5.1 * percent;
    }
    else{
      r = 5.1 * (100-percent);
      g =255;
    }

    rgbColor = `rgba(${r.toString()}, ${g.toString()}, ${b.toString()}, 0.5)`;

    // console.log(rgbColor);
    return rgbColor;
  }


    return(

        // Do poprawy statyczna szerokość
        <div style={{ width: 200, height: 200 }}> 
          <div >
            <CircularProgressbar
              value={percentageProg}
              text={`${percentageProg}%`}
              strokeWidth={14}
              styles={buildStyles({
                textColor: 'black',
                // pathColor: `rgba(62, 152, 199, ${percentageProg / 100})`,
                pathColor: getRgbaColor(percentageProg),
                trailColor: '#d6d6d6',
              })}
            />
          </div>
        <input type="range" min="1" max="100" step="1" style={{width: "100%"}} value={percentageProg} onChange={ (e) => {setPercentageProg(e.target.value)} }/>

        </div>
    )
}

export default Test;