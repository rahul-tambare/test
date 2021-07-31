import React, { Component, useState } from 'react';
import { Redirect } from 'react-router-dom';
import classes from './Toolbar.css';
import Menu from '../Sidedrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
const Toolbar = (props) => {
    const [redirect, setRedirect] = useState(false);
    const logOut = () => {
        localStorage.removeItem('token');

        props.druee();
    }
    const signup = () => {
        setRedirect(true);
    }
    const login = () => {
        setRedirect(false);
    }
    return (<header className={classes.Toolbar}>
        {props.auth ? <><Menu clicked={props.drawerToggleClicked} />
            <Logo />
            <button onClick={logOut}>logout</button>
            <nav className={classes.Desktop}>
                <NavigationItems />
            </nav></> : <><Menu clicked={props.drawerToggleClicked} />
            <Logo />
            <div>you are currently logged out please login</div>

            {redirect ? <><button onClick={login}>login</button> <Redirect to="/signup" /> </> : <><button onClick={signup}>signup</button>  <Redirect to="/login" /></>}
        </>}
    </header>);

}
export default Toolbar;