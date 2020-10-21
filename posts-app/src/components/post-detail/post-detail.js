import React from 'react';
import PageTop from '../../components/page-top/page-top.component';
import './post-detail.scss';
import { connect } from 'react-redux';
import * as PostActions from '../../store/actions/post';
import { bindActionCreators } from 'redux';

const PostDetail = ({selectedPost, selectPost, editPost, deletePost}) => {

    if(!selectedPost) return null;

    return (

        <div className="container">
            
            <PageTop title="Post" desc="Detalhes do post">
				<button className="btn btn-default" onClick={() => selectPost(null)}>
					Fechar
				</button>
			</PageTop>

            <div className="row">
                <div className="col-12">
                    <img className="post-img" src={selectedPost?.imageUrl} alt="image" />
                    <div className="post-info">
                        <h4>ID</h4>
                        <p>{selectedPost?.id}</p>
                    </div>
                    <div className="post-info">
                        <h4>Título</h4>
                        <p>{selectedPost?.title}</p>
                    </div>
                    <div className="post-info">
                        <h4>Conteúdo</h4>
                        <p>{selectedPost?.content}</p>
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deletePost(selectedPost)}>
                            Excluir
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => editPost(selectedPost)}>
                            Editar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

const mapStateToProps = state => ({
    selectedPost : state.post.selectedPost
})

// const mapDispatchToProps = dispatch => ({
//     selectPost : (post) => dispatch(PostActions.selectPost(post)),
//     deletePost : (postId) => dispatch(PostActions.deletePost(postId)),
//     editPost : (post) => dispatch(PostActions.deletePost(post)),
// })

const mapDispatchToProps = dispatch => bindActionCreators(PostActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)