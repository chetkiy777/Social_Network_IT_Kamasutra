import React from 'react';
import classes from "./users.module.css";
import userPhoto from "../../assets/img/userPhoto.jpg";
import {NavLink} from "react-router-dom";


let User = ({user, followingInProgress, follow, unfollow}) => {



    return (<div>
                    <span>
                            <div className={classes.userPhoto}>
                                <NavLink to={`/profile/${user.id}`}>
                                     <img src={user.photos.small != null ? user.photos.small : userPhoto}/>
                                </NavLink>
                            </div>

                        <div>
                            {user.followed ?
                                <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                    unfollow(user.id)
                                }}>Unfollow</button>
                                : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                    follow(user.id)
                                }}>Follow</button>};
                        </div>
                    </span>
                        <span>
                           <span>
                               <div>{user.name}</div>
                               <div>{user.status}</div>
                           </span>
                        <span>
                            <div>{"user.location.city"}</div>
                            <div>{"user.location.country"}</div>
                        </span>
                    </span>
                    </div>
                )
}

export default User;