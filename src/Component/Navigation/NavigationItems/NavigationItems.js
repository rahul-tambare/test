import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
import { useLocation } from 'react-router-dom';
import Logo from '../../Logo/Logo'
const NavigationItems = (props) => {
    const location = useLocation();
    return (
        <ul className={classes.NavigationItems}>
            <div className={classes.Logo}><Logo /></div>
            <NavigationItem exact link='/home'>Home</NavigationItem>
            <NavigationItem link={location.pathname} subNav={[{ link: '/student/addStudent', name: 'Add Student' }, { link: '/student/editStudent', name: 'Edit Student' }, { link: '/student/health', name: 'Helth' }, { link: '/student/cloth', name: 'Clothes' }]}>Student</NavigationItem>
            <NavigationItem link={location.pathname} subNav={[{ link: '/store/view', name: 'View' }, { link: '/store/createProduct', name: "create Product" }, { link: '/store/createSubProduct', name: "Create Sub Product " }, { link: '/store/storeList', name: "Store List" }, { link: "/store/cart", name: "Cart" }, { link: "/store/products", name: "products" }]}>Store</NavigationItem>
            <NavigationItem link={location.pathname} subNav={[{ link: '/student/Library', name: 'Library' }]}>Library</NavigationItem>
        </ul>
    );
}
export default NavigationItems;