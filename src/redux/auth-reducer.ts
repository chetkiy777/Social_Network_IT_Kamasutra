import {authAPI, ResultCodeEnum, ResultCodeWithCaptcha, securityAPI} from "../API/api";
import {stopSubmit} from "redux-form";
import {Dispatch} from "redux";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";



const SET_USER_DATA = 'Social_Networl/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCES = 'Social_Networl/GET_CAPTCHA_URL_SUCCES';

type InitialStateType2 = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean | null
    captchaUrl: string | null
}

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}


let authReducer = (state = initialState, action: AuthActionsTypes): InitialStateType2 => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        case  GET_CAPTCHA_URL_SUCCES:
            return {
                ...state, ...action.payload
            }
        default:
            return state;
    }
};

type AuthActionsTypes = getCaptchaUrlSuccessActionType | setAuthUserDataActionType
type dispatchType = Dispatch<AuthActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthActionsTypes>



type setAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean | null
}
type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: setAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});

type getCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCES,
    payload: {captchaUrl: string}
}
export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({type: GET_CAPTCHA_URL_SUCCES, payload: {captchaUrl}})


export const getAuthUserData = () => async (dispatch: dispatchType, getState: () => AppStateType ) => {
    let meData = await authAPI.me();
    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};


export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch: any) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodeWithCaptcha.RequiredCaptcha) {
            dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0 ? data.messages[0] : "Some Error";
        dispatch(stopSubmit("login", {_error: message}))
    }
};

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer;