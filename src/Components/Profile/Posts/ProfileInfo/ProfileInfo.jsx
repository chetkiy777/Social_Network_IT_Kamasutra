import React, {useState} from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from "../../../../common/preloader/Preloader";
import userPhoto from './../../../../assets/img/userPhoto.jpg';
import ProfileStatusWithHook from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";



const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false);



    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    };

    if (!profile) {
        return <Preloader/>
    }

    const onSubmit = (formData) => {
        saveProfile(formData);
        setEditMode(false)
    }


    return (

        <div>
            <div className={classes.descriptionBlock}>


                <img src={profile.photos.large != null ? profile.photos.large
                : userPhoto } />
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

                {editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData  profile={profile} isOwner={isOwner} activeEditMode={() => setEditMode(true)}/>
                }


                <ProfileStatusWithHook status={status}  updateStatus={updateStatus} />

            </div>
        </div>
    )
}

const ProfileData = ({profile, isOwner, activeEditMode}) => {
    return <div className={classes.infoAbout}>
        {isOwner && <div><button onClick={activeEditMode}>EDIT</button></div>}
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>

        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "No"}
        </div>

        {profile.lookingForAJob &&
        <div>
            <b>Professional Skills</b>: {profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>About Me</b>: {profile.aboutMe}
        </div>

        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>

    </div>
}



const Contact = ({contactTitle, contactValue}) => {
    return <div className={classes.contacts}><b>{contactTitle}</b>: {contactValue} </div>
}

export default ProfileInfo;