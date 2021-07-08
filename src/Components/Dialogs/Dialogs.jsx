import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../Utiles/validators";
import {Textarea} from "../../common/FormsControl/FormsControl";

const Dialogs = (props) => {

    let state = props.messagePage
    let dialogsElements = state.dialogsData.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = state.Messages.map(m => <Message message={m.message}/>)


    let addNewMessage = (values) => {
        props.addMessage(values.newMessageBody)
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItem}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
            </div>
            <AddMessageReduxForm onSubmit={addNewMessage}/>
        </div>
    )
};

const maxLength100 = maxLengthCreator(100)

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='write new text' component={Textarea} name="newMessageBody"
                validate={[required , maxLength100]}/>
            </div>
            <div>
                <button>New Message</button>
            </div>
        </form>
    )
}


const AddMessageReduxForm = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs;