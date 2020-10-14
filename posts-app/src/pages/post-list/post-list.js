import React from "react";
import "./post-list.scss";

const PostList = ({posts, selectPost}) => {
	return (
		<div className="post-list">
			{posts.map(post => (
				<div className="post-item" key={post.id} onClick={()=> selectPost(post)}>
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
