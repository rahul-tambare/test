import React,{Fragment,useState} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './PopUp.css';
import History from './PopupInHis/ListHistory';
import Update from './PopupInHis/InputPopup';
import {Route} from 'react-router-dom';
const PopUp = (props)=>{
    //props.show clicked
    // const [show,setShow]=useState(true);
    
    const popup = [classes.PopUp,classes.Active]

    return(
        <Fragment>
            <div className = {popup.join(' ')}>
                <div className = {classes.PopBox}>
                            <div className={classes.Header}>
                                    <div className={classes.Title}> {props.studentName} </div>
                                    <div onClick={props.closePopUp} className ={classes.closeButton}>&times;</div>
                            </div>
                            <div className={classes.Body}>
                                {props.popUpHostory? <Route render={()=> <History  th={props.th} history={props.studentHistory}/>}/> :null}
                                {props.update? <Route render={() => <Update heId={props.heId} change = {props.change} fields={props.fields} />}/>:null}           

                            </div>
                </div>
            </div>
            <Backdrop show   clicked={props.closePopUp}/>
        </Fragment>
    );
}
export default PopUp;