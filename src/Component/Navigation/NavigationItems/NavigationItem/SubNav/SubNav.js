import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './SubNav.css';
const subNav =(props)=>{
    let name = null;
    if(props.subNav){
        name = props.subNav.map(subNav=>{
            return  (<li className={classes.SubNav_li} key={subNav.name}>                    
                        <NavLink
                            exact = {subNav.exact}
                            to={subNav.link} 
                            activeClassName={classes.Active}
                        >
                            <button>
                                {subNav.name}
                            </button>
                        </NavLink>
                        
                        
                </li>);
            // <div>{subNav.name}</div>
        });
        
    }
   
    return(
        <ul className={classes.SubNav}>
            {name}
        </ul>

    );
};
export default subNav;
