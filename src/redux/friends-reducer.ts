
type friendType = {
    id: number
    name: string
    followed: boolean
}

type initialStateType = {
    friends: Array<friendType>
}

let initialState = {
   friends: [
       {id:1, name: "Andrei", followed: true},
       {id:2, name: "MAks", followed: true},
       {id:3, name: "Dima", followed: true}
   ]
};

const friendsReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {

        default:
            return state;
    }
}


export default friendsReducer;