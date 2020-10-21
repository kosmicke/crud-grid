import React, { useEffect } from "react";
import PageTop from "../../components/page-top/page-top.component";
import "./post-list.scss";

import * as PostActions from '../../store/actions/post';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const PostList = ({ posts, search, selectPost, editPost, loadPosts }) => {

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
			{posts.map(post => (
				<div key={post.id} className="post-item" key={post.id} onClick={() => selectPost(post)}>
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

const mapStateToProps = state => ({ 
	posts : state.post.posts,
	search:  state.post.search,
	selectedPost: state.post.selectedPost,
})
const mapDispatchToProps = dispatch => bindActionCreators(PostActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PostList)
