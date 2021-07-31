import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Sidedrawer/Sidedrawer';
import DrawerToggle from '../Navigation/Sidedrawer/DrawerToggle/DrawerToggle';
import Backdrop from '../UI/Backdrop/Backdrop';
import { Redirect } from 'react-router-dom';
import classes from './Layout.css'
class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    SideDrawerCloseHandeler = () => {
        this.setState({
            showSideDrawer: false
        })
    }
    drowerToggleHandeler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return (
            <Aux>
                <main className={classes.Content}>
                    <Toolbar auth={this.props.auth} druee={this.props.druee} drawerToggleClicked={this.drowerToggleHandeler} />
                    <SideDrawer
                        close={this.SideDrawerCloseHandeler}
                        open={this.state.showSideDrawer}
                    />
                    <DrawerToggle clicked={this.drowerToggleHandeler} />
                    <Backdrop show={this.state.showSideDrawer} clicked={this.SideDrawerCloseHandeler} />

                    {this.props.children}
                </main>
            </Aux>
        );
    }
}
export default Layout;