import React from 'react';
import {addPost} from "../../../../redux/profile-reducer";
import MyPost from "./MyPost";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
    }
}

const MyPostContainer = connect(mapStateToProps, {addPost})(MyPost);

export default MyPostContainer;
