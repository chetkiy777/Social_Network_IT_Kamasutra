import React, {FC} from 'react';
import Pagenator from "../../common/Pagenator/Pagenator";
import User from "./User";
import {UserType} from "../../types/types";
import {UserSearchForm} from "./UserSearchForm";

type PropsTypes = {
    totalItemsCount: number
    pageSize: number
    onPageChange: (pageNumber: number) => void
    currentPage: number
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: () => void
    unfollow: () => void

}

let Users: FC<PropsTypes> = ({totalItemsCount, pageSize, onPageChange, currentPage, users, ...props}) => {
    return (<div>
                <UserSearchForm/>
                <Pagenator totalItemsCount={totalItemsCount} pageSize={pageSize}
                           onPageChange={onPageChange}
                           currentPage={currentPage} />
                <div>
                        {
                            users.map(u => <User user={u} key={u.id}
                                                 followingInProgress={props.followingInProgress}
                                                 follow={props.follow} unfollow={props.unfollow}/>
                            )
                        }
                </div>
        </div>
    )
}


export default Users;