import React, { useState } from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary';
import SubNav from './SubNav/SubNav'

const NavigationItem = (props) => {
    const [navClick, setClick] = useState(classes.NavigationItem);
    const cli = () => {

        let navC = [classes.NavigationItem, classes.NavigationItemclick].join(' ');
        setClick(navC)
    }

    const button = (
        <NavLink
            to={props.link}
            exact={props.exact}
            className={classes.A}
            activeClassName={classes.Active}>
            <button className={classes.Button}>
                {props.children}
            </button>
        </NavLink>);
    return (
        <li className={navClick} onClick={cli} key={props.children}>
            {button}
            <div className={classes.div}>
                <SubNav subNav={props.subNav} />
            </div>
        </li>);




}
export default NavigationItem;