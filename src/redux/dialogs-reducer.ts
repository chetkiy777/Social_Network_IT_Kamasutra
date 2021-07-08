import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const ADD_MESSAGE = 'Social_Network/ADD-MESSAGE'

type DialogType = {
    id: number,
    name: string
}

type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogsData: [
        {id: 1, name: 'Gladkiy'},
        {id: 2, name: 'Vovchik'},
        {id: 3, name: 'Kohanchuk'},
        {id: 4, name: 'Artemon'},
        {id: 5, name: 'Hodakovskiy'},
        {id: 6, name: 'Gladkaya'}
    ] as Array<DialogType>,
    Messages: [
        {id: 1, message: 'Hello World'},
        {id: 2, message: 'Im fine, and you?'},
        {id: 3, message: 'Yo!'},
        {id: 4, message: 'Yo!'},
        {id: 5, message: 'Yo!'}
    ] as Array<MessageType>
};

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: dialogsActionType): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newText = action.newMessageBody
            return {
                ...state,
                Messages: [...state.Messages, {id: 6, message: newText}]
            }
        default:
            return state;
    }
}

type dialogsActionType = addMessageActionCreatorType


type addMessageActionCreatorType = {
    type: typeof ADD_MESSAGE
    newMessageBody: string
}

export const addMessageActionCreator = (newMessageBody: string): addMessageActionCreatorType => ({type: ADD_MESSAGE , newMessageBody})

export default dialogsReducer;