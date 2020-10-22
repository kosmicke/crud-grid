const INITIAL_STATE = {
    posts: [],
    selectedPost: null,
    inEditPost: null,
    search: "teste",
}

const post = (state = INITIAL_STATE, action) => {

    if(action.type == "EDIT_POST"){
        const post = action.payload.post;
        return {...state, inEditPost: post}
    }

    if(action.type == "SELECT_POST"){
        console.log("SELECT_POST", action)
    }

    return state;
}

export default post