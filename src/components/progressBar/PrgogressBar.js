import React from "react";
//npm install react-circular-progressbar
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default function ProgressBar(percent){

    const progresPercent = percent.percent;
    function getRgbaColor (progresPercent){
       let r=0;
       let g=0;
       let b=0;
       let rgbColor = "";
      if(progresPercent <= 50){
        r = 255;
        g = 5.1 * progresPercent;
      }
      else{
        r = 5.1 * (100-progresPercent);
        g =255;
      }
  
      rgbColor = `rgba(${r.toString()}, ${g.toString()}, ${b.toString()}, 0.5)`;
      return rgbColor;
    }

    return(
        <div >
        <CircularProgressbar
          value={progresPercent}
          text={`${progresPercent}%`}
          strokeWidth={14}
          styles={buildStyles({
            textColor: 'black',
            pathColor: getRgbaColor(progresPercent),
            trailColor: '#d6d6d6',
          })}
        />
      </div>
    );
}