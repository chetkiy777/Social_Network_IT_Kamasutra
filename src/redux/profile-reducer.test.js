import profileReducer, {addPost, deletePost} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'How dou you filling?', likesCount: 21},
        {id: 2, message: 'The Best Day', likesCount: 13},
        {id: 3, message: 'its a nineteen lesson of react', likesCount: 21},
        {id: 4, message: 'Testing app - is most be!', likesCount: 2}
    ]
};

it('new post should be added', () => {
    let action = addPost('test was succesfull added post!');

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(5);

    });


it('message text should be correct', () => {
    let action = addPost('test was succesfull added post!');

    let newState = profileReducer(state, action);

    expect(newState.posts[4].message).toBe('test was succesfull added post!');

    });

it ('after deleting length of posts should be decrement',() => {
    let action = deletePost (1);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);

});

