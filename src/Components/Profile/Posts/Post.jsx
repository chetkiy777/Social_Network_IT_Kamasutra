import React from 'react';
import classes from './Post.module.css';


const Post = (props) => {
    return (

        <div className={classes.item}>
            <img src="https://www.kinonews.ru/insimgs/2019/newsimg/newsimg87089.jpg" />
            {props.message}
            <div>
                <span>Like</span> {props.likesCount}
            </div>
        </div>

    )
}

export default Post;