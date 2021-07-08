import React from 'react';
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return <header className={classes.header}>
            <img src='https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg'/>
            <div className={classes.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Log Out</button> </div>
                    : <NavLink to={'/login'}>Login</NavLink> }
            </div>

        </header>
}

export default Header;