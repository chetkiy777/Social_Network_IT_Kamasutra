import {userAPI} from "../API/api";
import {updateObjectInArray} from "../Utiles/objects-helpers";
import {PhotosType, UserType} from "../types/types";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";

const FOLLOW = 'Social_Network/FOLLOW';
const UNFOLLOW = 'Social_Network/UNFOLLOW';
const SET_USERS = 'Social_Network/SET_USERS';
const SET_CURRENT_PAGE = 'Social_Network/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'Social_Network/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'Social_Network/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'Social_Network/TOGGLE_FOLLOWING_IN_PROGRESS';



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>
};

type InitialStateType = typeof initialState

let usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id" , {followed: true} )
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id" , {followed: false} )
            };
        case SET_USERS: {
            return {...state, users: [...action.users]}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalItemsCount: action.totalItemsCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
};

type ActionsTypes = followSuccesActionType | unfollowSuccesActionType | setUsersActionType | setCurrentPageActionType |
    setTotalUsersCountActionType | toggleIsFetchingCountActionType | toggleFollowingInProgressActionType



type followSuccesActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSucces = (userId: number): followSuccesActionType => ({type: FOLLOW, userId});

type unfollowSuccesActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSucces = (userId: number): unfollowSuccesActionType => ({type: UNFOLLOW, userId});


type setUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>):setUsersActionType => ({type: SET_USERS, users});


type setCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage});


type setTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalItemsCount: number
}
export const setTotalUsersCount = (totalItemsCount: number): setTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalItemsCount});


type toggleIsFetchingCountActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingCountActionType => ({type: TOGGLE_IS_FETCHING, isFetching});

type toggleFollowingInProgressActionType = {
    type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingInProgress = (isFetching: boolean, userId: number): toggleFollowingInProgressActionType => ({type: TOGGLE_FOLLOWING_IN_PROGRESS,
    isFetching, userId
});

export type getStateType = () => AppStateType

export type dispatchType = Dispatch<ActionsTypes>

export const getUsers = (page: number, pageSize: number) => {
    return async (dispatch: dispatchType, getState: getStateType) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        let data = await userAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount))
    }
};

const followUnfollowFlow = async (dispatch: dispatchType, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingInProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingInProgress(false, userId))
};


export const follow = (userId: number) => {
    return async (dispatch: dispatchType) => {
        followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), followSucces);
    }
};

export const unfollow = (userId: number) => {
    return async (dispatch: dispatchType) => {
        followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), unfollowSucces);
    }
};

export default usersReducer