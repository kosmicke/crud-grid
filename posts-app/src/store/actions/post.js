export const loadPosts = (search) => {
    return {
        type: "LOAD_POSTS",
        payload: { search }
    }
}

export const deletePost = (post) => {
    return {
        type: "DELETE_POST",
        payload: { post }
    }
}

export const editPost = (post) => {
    return {
        type: "EDIT_POST",
        payload: { post }
    }
}

export const selectPost = (post) => {
    return {
        type: "SELECT_POST",
        payload: { post }
    }
}

export const cancelEdit = () => {
    return {
        type: "CANCEL_EDIT",
    }
}

export const savePost = (post) => {
    return {
        type: "SAVE_POST",
        payload: { post }
    }
}
