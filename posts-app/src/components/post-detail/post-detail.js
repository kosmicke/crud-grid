import React from 'react';
import PageTop from '../../components/page-top/page-top.component';
import './post-detail.scss';

const PostDetail = ({post, editPost, deletePost, onClose}) => {

    return (

        <div className="container">
            
            <PageTop title="Post" desc="Detalhes do post">
				<button className="btn btn-default" onClick={() => onClose()}>
					Fechar
				</button>
			</PageTop>

            <div className="row">
                <div className="col-12">
                    <img className="post-img" src={post?.imageUrl} alt="image" />
                    <div className="post-info">
                        <h4>ID</h4>
                        <p>{post?.id}</p>
                    </div>
                    <div className="post-info">
                        <h4>Título</h4>
                        <p>{post?.title}</p>
                    </div>
                    <div className="post-info">
                        <h4>Conteúdo</h4>
                        <p>{post?.content}</p>
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deletePost(post.id)}>
                            Excluir
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => editPost(post)}>
                            Editar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default PostDetail