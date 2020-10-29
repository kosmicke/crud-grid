import React from "react";
import PageTop from "../../components/page-top/page-top.component";
import "./post-list.scss";
import { connect } from "react-redux";
import * as PostsActions from '../../store/actions/post';


const PostList = ({ posts, search, selectPost, editPost, loadPosts }) => {

	let filteredPosts = posts;
	if(search && search != ""){
		filteredPosts = posts.filter(item => item.title.includes(search))
	}

	return (
		<div className="post-list">
			<PageTop title="Posts" desc="Todos os posts">
				<button className="btn btn-primary" onClick={() => editPost({})}>
					Adicionar
				</button>
			</PageTop>
			<div className="form-group">
				<input
					type="text"
					className="form-control"
					id="search"
					placeholder="Digite para buscar"
					value={search}
					onChange={(e) => loadPosts(e.target.value)}
				/>
			</div>
			{filteredPosts.map(post => (
				<div className="post-item" key={post.id} onClick={() => selectPost(post)}>
					<h3>
						{post.title}
					</h3>
					<p>
						{post.content}
					</p>
				</div>
			))}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		posts: state.post.posts,
		search: state.post.search
	}
}

const mapDispatchtoProps = (dispatch) => {
	return {
		selectPost : (post) => dispatch(PostsActions.selectPost(post)),
		editPost : (post) => dispatch(PostsActions.editPost(post)),
		loadPosts: (search) => dispatch(PostsActions.loadPosts(search))
	}
}

export default connect(mapStateToProps, mapDispatchtoProps)(PostList);
