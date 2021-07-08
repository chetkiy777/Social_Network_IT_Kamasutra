import {getAuthUserData} from "./auth-reducer";
import {dispatchType} from "./users-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const INITIALIZED_SUCCESS = 'Social_Network/INITIALIZED_SUCCESS';

type InitialStateType = {
    initialized: boolean | null
}

let initialState: InitialStateType = {
    initialized: false
};

let appReducer = (state = initialState, action: ActionsTypes):InitialStateType => {
    switch(action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
};

type ActionsTypes =  initializedSuccessActionType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): initializedSuccessActionType => ({type: INITIALIZED_SUCCESS });


export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
        dispatch(initializedSuccess())
    })
};


export default appReducer;