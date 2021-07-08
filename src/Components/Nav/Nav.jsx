import React from 'react';
import classes from './Nav.module.css';
import {NavLink} from "react-router-dom";
import Friends from "./Friends/Friends";

const Nav = (props) => {
    return (
        <nav className={classes.nav}>
            <div className={classes.item}>
                <NavLink to="/profile" activeClassName={classes.activeLink}>Profile</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/Dialogs" activeClassName={classes.activeLink}>Message</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/News" activeClassName={classes.activeLink}>News</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/Music" activeClassName={classes.activeLink}>Music</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/Settings" activeClassName={classes.activeLink}>Settings</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/Users" activeClassName={classes.activeLink}>Users</NavLink>
            </div>

            <div className={classes.friendsBlock}>
                <Friends/>
            </div>


        </nav>
    )
}

export default Nav;