import React, { Fragment, useState } from 'react';
import classes from './Image.css';


const Image = (props) => {
    // const ev = (event) => {
    //     console.log(event, 'event');
    // }
    // let Img;
    // if (props.imagePopUp) {
    //     Img = (
    //         <img
    //             onClick={props.change}
    //             className={classes.PopBox}
    //             id={props.imageShowId} />
    //     );
    // } else {
    //     Img = (<img
    //         className={classes.Box}
    //         onClick={props.change}
    //         // onClick={(event)=>ev(event)} 
    //         id={props.imageShowId} />);
    // }
    return <img
        className={classes.Box}
        src={props.value ? `http://localhost:3000/${props.value}` : null}
        // onClick={props.change}
        // onClick={(event)=>ev(event)} 
        id={props.imageShowId} />;
}
export default Image;