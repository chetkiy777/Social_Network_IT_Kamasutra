import React from 'react';
import classes from './MyPost.module.css';
import Post from "../Post";
import {Field, reduxForm} from "redux-form";
import { maxLengthCreator, required} from "../../../../Utiles/validators";
import {Textarea} from "../../../../common/FormsControl/FormsControl";

const MyPost = React.memo( (props) => {

    let postsData = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    let addNewPost = (values) => {
        props.addPost(values.newPostBody)
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My Posts</h3>
                <AddNewPostReduxForm onSubmit={addNewPost}/>
            <div className={classes.posts}>
                {postsData}
            </div>
        </div>
    )
});

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="newPostBody" placeholder="write message"
                validate={[required , maxLength10]} />
            </div>
            <div>
                <button>add Post</button>
            </div>
        </form>
    )
};

const AddNewPostReduxForm = reduxForm({form: "addNewPost"})(AddNewPostForm);

export default MyPost;