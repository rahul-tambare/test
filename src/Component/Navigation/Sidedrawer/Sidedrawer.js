import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Sidedrawer.css';
import Aux from '../../../hoc/Auxiliary';
const sideDrawer =(props)=>{
    let attachedClasses = [classes.SideDrawer,classes.Close];
    if (props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    
    return (
        <Aux>
            <div>
                <nav className = {attachedClasses.join(' ')}>
                    <NavigationItems/>
                </nav>
            </div>
            
        </Aux>
           
    );
}
export default sideDrawer;