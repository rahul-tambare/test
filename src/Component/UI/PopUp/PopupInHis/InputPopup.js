import React ,{useState} from "react";
import classes from './PopupClass.css';
import Table from '../../Table/FormTable/FormTable';

const InputPopup =(props)=>{
    return(
    <form className={classes.Form} >
        <table className={classes.Table}>
            <Table fields = {props.fields} fieldsInRow='2' change={props.change} />            
            <tr><td><button id='submit' onClick={props.change} className={classes.Submit}>submit</button></td></tr>
        </table> 
       
    </form>);
}
export default InputPopup;