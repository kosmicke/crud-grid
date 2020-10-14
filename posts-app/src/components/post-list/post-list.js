import React from "react";
import PageTop from "../../components/page-top/page-top.component";
import "./post-list.scss";

const PostList = ({ posts, search, onSearch, selectPost, addPost }) => {
	return (
		<div className="post-list">
			<PageTop title="Posts" desc="Todos os posts">
				<button className="btn btn-primary" onClick={() => addPost()}>
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

export default PostList;
