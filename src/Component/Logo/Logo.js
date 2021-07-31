import React from 'react';
import classes from './Logo.css';
import aaiLogo from '../../Assets/Logo/logo.jpg';
const logo =(props)=>{
    return (
        <img src={aaiLogo} className={classes.Logo}/>
    )
}
export default logo;