import { v4 as uuid } from 'uuid';

const INITIAL_STATE = {
    posts: [],
    selectedPost: null,
    inEditPost: null,
    search: "",
}

const post = (state = INITIAL_STATE, action) => {

    if( action.type === "LOAD_POSTS"){
        const search = action.payload.search ? action.payload.search : ""
        return { ...state, search : search}
    }

    if( action.type === "DELETE_POST"){
        if(window.confirm("Deseja realmente Excluir este post?")){
            const post = action.payload.post
            const posts = state.posts.filter(item => item.id != post.id)
            return {...state, posts : posts, selectedPost : null}
        }
    }

    if( action.type === "EDIT_POST"){
        const inEditPost = action.payload.post
        console.log("inEditPost", inEditPost)
        return {...state, inEditPost : inEditPost}
    }

    if( action.type === "SAVE_POST"){
        let post = action.payload.post;
        let posts = [...state.posts];
        if(!post.id){
            post.id = uuid();
            posts = [...posts, post];
        }else{
            posts = posts.filter(item => item.id != post.id)
            posts = [...posts, post];
        }
        return {...state, posts : posts, inEditPost: null, selectedPost: null}
    }

    if( action.type === "CANCEL_EDIT"){
        return {...state, inEditPost: null}
    }

    if( action.type === "SELECT_POST"){
        const post = action.payload.post;
        return {...state, selectedPost: post}
    }

    return state;
}

export default post