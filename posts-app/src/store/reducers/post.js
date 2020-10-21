import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {
    posts: [],
    selectedPost: null,
    inEditPost: null,
    search: "",
}

const post = (state = INITIAL_STATE, action ) => {

    if(action.type == "LOAD_POSTS"){
        const search = action.payload.search ? action.payload.search : "";
        return {...state, search}
    }

    if(action.type == "SELECT_POST"){
        const selectedPost = action.payload.post
        return {...state, selectedPost, inEditPost : null}
    }

    if(action.type == "DELETE_POST"){
        const post = action.payload.post;
        const posts = state.posts.filter( item => item.id != post.id)
        return {...state, posts}
    }

    if(action.type == "EDIT_POST"){
        const inEditPost = action.payload.post;
        return {...state, inEditPost}
    }

    if(action.type == "SAVE_POST"){
        let post = action.payload.post;
        let posts = [...state.posts];
        if(post.id){
            posts = posts.filter(item => item.id != post.id )
            posts = [...posts, post]
        }else{
            post.id = uuidv4();
            posts = [...posts, post]
        }
        return {...state, posts, inEditPost : null, selectedPost: null}
    }

    if(action.type == "CANCEL_EDIT"){
        return {...state, inEditPost : null}
    }

    return state;
}

export default post;