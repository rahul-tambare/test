import React ,{useState} from "react";
import ListTable from '../../Table/ListTable/ListTable';
import classes from './PopupClass.css';
const ListHistory =(props)=>{
    return (<div  className = {classes.Form}>        
        <ListTable  th={props.th}  row ={props.history}/>       
       
    </div>)
}

export default ListHistory;