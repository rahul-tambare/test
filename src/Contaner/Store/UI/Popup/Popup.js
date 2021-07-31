import React from "react";
import classes from "./Popup.module.css";
import Backdrop from '../Backdrop/Backdrop'
const Popup = (props) => {

    return (<div>
        <div className={classes.Popup}>
            <div className={classes.Close} style={{ float: "right" }} onClick={props.onClick} >
                &times;
            </div>
            {props.children}

        </div >
        <Backdrop onClick={props.onClick}></Backdrop>
    </div >)
}
export default Popup