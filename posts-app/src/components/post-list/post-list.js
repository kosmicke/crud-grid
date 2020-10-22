import React from "react";
import PageTop from "../../components/page-top/page-top.component";
import "./post-list.scss";
import { connect } from "react-redux";

const editPost = (post) => {
	return {
		type : "EDIT_POST",
		payload: { post }
	}
}

const selectPost = (post) => {
	return {
		type : "SELECT_POST",
		payload: { post }
	}
}

const PostList = ({ posts, search, onSearch, dispatch }) => {

	return (
		<div className="post-list">
			<PageTop title="Posts" desc="Todos os posts">
				<button className="btn btn-primary" onClick={() => dispatch(editPost({}))}>
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
					onChange={(e) => onSearch(e.target.value)}
				/>
			</div>
			{posts.map(post => (
				<div className="post-item" key={post.id} onClick={() => dispatch(selectPost(post))}>
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

const mapStateToProps = state => {
	return {
		posts: state.post.posts,
		search: state.post.search
	}
}

export default connect(mapStateToProps)(PostList);
