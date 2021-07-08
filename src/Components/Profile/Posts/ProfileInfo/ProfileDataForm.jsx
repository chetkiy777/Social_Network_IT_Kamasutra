import React from 'react'
import classes from "./ProfileInfo.module.css";
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../../../common/FormsControl/FormsControl";

const ProfileDataForm = ({handleSubmit, profile}) => {
    return (<form onSubmit={handleSubmit}>
            <div>
                 <button>SAVE</button>
            </div>
        <div>
            <b>Full name</b>: {createField("full Name" , "fullName", [], Input)}
        </div>

        <div>
            <b>Looking for a job</b>: {createField("", "lookingForAJob", [], Input , {type: "checkbox"})}
        </div>


        <div>
            <b>Professional Skills</b>: {createField("Professional Skills", "lookingForAJobDescription", [], Textarea)}
        </div>

        <div>
            <b>About Me</b>:  {createField("About Me", "AboutMe", [], Textarea)}
        </div>

        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div className={classes.contacts}>
                <b>{key}: {createField(key , "contacts." + key, [], Input)}</b>
            </div>
        })}
        </div>

    </form>
    )
}

const ProfileDataReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataReduxForm