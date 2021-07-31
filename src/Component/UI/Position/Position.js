import React from 'react';
import classes from './Position.css';

const Position =(props)=>{
    let position ;
    if(props.position === "Middle"){
        position = classes.Middle;
    }else if(props.position === "Left"){
        position = classes.Left;
    }else if(props.position=== 'Right'){
        position = classes.Right;
    }else{
        position=classes.Default;
    }
   
     
    return(
        <div className={position}>
            {props.children}
        </div>
    )
}
export default Position;