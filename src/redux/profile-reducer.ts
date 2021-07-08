import {profileAPI} from "../API/api";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
const ADD_POST = 'Social_Network/ADD-POST';
const SET_USER_PROFILE = 'Social_Network/SET_USER_PROFILE';
const SET_STATUS = 'Social_Network/SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCES = 'SAVE_PHOTO_SUCCES';




let initialState = {
    posts: [
        {id: 1, message: 'How dou you filling?', likesCount: 21},
        {id: 2, message: 'The Best Day', likesCount: 13}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    newPostBody: ""
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [...state.posts, {id: 5, message: action.newPostBody, likesCount: 0}]
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case DELETE_POST:
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.postId)
            };
        case SAVE_PHOTO_SUCCES:
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            };

        default:
            return state;
    }
};

type ActionsTypes = addPostActionType | setUserProfileActionTyoe | setStatusActionType | deletePostActionType | savePhotoSuccesActionType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

type addPostActionType = {
    type: typeof ADD_POST
    newPostBody: string
}
export const addPost = (newPostBody: string): addPostActionType => ({type: ADD_POST, newPostBody});

type setUserProfileActionTyoe = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): setUserProfileActionTyoe => ({type: SET_USER_PROFILE, profile});

type setStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): setStatusActionType => ({type: SET_STATUS, status: status});

type deletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): deletePostActionType => ({type: DELETE_POST, postId});

type savePhotoSuccesActionType = {
    type: typeof SAVE_PHOTO_SUCCES
    photos: PhotosType
}
export const savePhotoSucces = (photos: PhotosType): savePhotoSuccesActionType => ({type: SAVE_PHOTO_SUCCES, photos});



export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data))
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data))
};


export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
};

export const savePhoto = (file: any): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSucces(response.data.data.photos))
    }
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState: any) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getProfile(userId))
    }
};


export default profileReducer