import React from 'react';
import classes from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = "/Dialogs/" + props.id; // переменная для динамического указания url пути

    return (
        <div className={classes.dialog}>
            <img src="https://www.kinonews.ru/insimgs/2019/newsimg/newsimg87089.jpg"></img>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}


export default DialogItem;