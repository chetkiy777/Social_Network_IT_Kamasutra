
let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'How dou you filling?', likesCount: 21},
                {id: 2, message: 'The Best Day', likesCount: 13}
            ],
            newPostText: 'it-kamasutra.com'
        },
        messagePage: {
            dialogsData: [
                {id: 1, name: 'Gladkiy'},
                {id: 2, name: 'Vovchik'},
                {id: 3, name: 'Kohanchuk'},
                {id: 4, name: 'Artemon'},
                {id: 5, name: 'Hodakovskiy'},
                {id: 6, name: 'Gladkaya'}
            ],
            Messages: [
                {id: 1, message: 'Hello World'},
                {id: 2, message: 'Im fine, and you?'},
                {id: 3, message: 'Yo!'},
                {id: 4, message: 'Yo!'},
                {id: 5, message: 'Yo!'}
            ],
            newMessageText: ''
        },
        sidebarPage: {}
    },
    _callSubscriber() {
        console.log('oy eeeee')
    }, //заглушка

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage , action)
        this._state.messagePage = dialogsReducer(this._state.messagePage , action)
        this._state.sidebarPage = sidebarReducer(this._state.sidebarPage , action)

        this._callSubscriber(this._state);
        }
    }



export default storeCustom;


















