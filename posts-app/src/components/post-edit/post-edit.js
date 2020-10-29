import React, { useEffect, useState } from 'react';
import PageTop from '../../components/page-top/page-top.component';
import './post-edit.scss';
import { connect } from 'react-redux';

import * as PostsActions from "../../store/actions/post";

const PostEdit = ({ inEditPost, cancelEdit, savePost }) => {

    const [post, setPost] = useState(inEditPost || {});

    useEffect(() => {
        setPost(inEditPost || {})
    }, [inEditPost])

    if(!inEditPost){
        return null;
    }

    let title = post.id ? 'Editar Post' : 'Novo Post';
    let desc = post.id ? 'Editar informações de um post' : 'Formulário de criação de posts';

    return (
        <div className="container">

            <PageTop title={title} desc={desc}>
                <button className="btn btn-light" onClick={() => cancelEdit()}>
                    Cancelar
                </button>
                <button className="btn btn-primary" onClick={() => savePost(post)}>
                    Salvar
                </button>
            </PageTop>

            <form onSubmit={e => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={post.title}
                        onChange={e => setPost({ ...post, title: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Conteúdo</label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="content"
                        value={post.content}
                        rows={4}
                        style={{ resize: 'none' }}
                        onChange={e => setPost({...post, content: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="imageurl">Url da imagem</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imageurl"
                        value={post.imageUrl}
                        onChange={e => setPost({ ...post, imageUrl: e.target.value })} />
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    inEditPost : state.post.inEditPost
})

const mapDispatchToProps = (dispatch) => {
    return {
        cancelEdit : () => dispatch(PostsActions.cancelEdit()),
        savePost : (post) => dispatch(PostsActions.savePost(post)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);