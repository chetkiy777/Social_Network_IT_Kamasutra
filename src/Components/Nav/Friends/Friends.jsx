import React from 'react'
import classes from './friends.module.css'
import {connect} from "react-redux";



const Friends = (props) => {


    return (
        <div className={classes.friendsBlock}>
            <h2>Friends</h2>

            {props.friends.map(f => f.followed &&
                 <div key={f.id} className={classes.friend}>{f.name}</div>
                )

            }
        </div>
    )
}



let mapStateToProps = (state) => ({
    friends: state.friendsPage.friends
})

export default connect(mapStateToProps)(Friends);