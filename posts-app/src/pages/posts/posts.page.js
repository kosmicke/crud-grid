import React from "react";
import { Redirect } from "react-router-dom";
import authService from "../../services/auth.service";
import postsService from "../../services/posts.service";
import PostDetail from "../../components/post-detail/post-detail";
import PostEdit from "../../components/post-edit/post-edit";
import PostList from "../../components/post-list/post-list";
import "./posts.page.scss";

class PostListPage extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			selectedPost: null,
			inEditPost: null,
			redirectTo: null,
			search: "",
		};
		this.searchTimer = null;
	}

	componentDidMount() {
		let userData = authService.getLoggedUser();
		if (!userData) {
			this.setState({ redirectTo: "/login" });
		} else {
			this.loadPosts();
		}
	}

	async loadPosts(query) {
		try {
			let res = await postsService.list(query);
			this.setState({ posts: res.data.data });
		} catch (error) {
			console.log(error);
			alert("Não foi possível listar os posts.");
		}
	}

	async deletePost(postId) {
		if (!window.confirm("Deseja realmente excluir este post?")) return;
		try {
			await postsService.delete(postId);
			alert("Post excluído com sucesso");
			
			// After Delete
			this.setState({ inEditPost: null, selectedPost: null })
			this.loadPosts()
		} catch (error) {
			console.log(error);
			alert("Não foi excluir o post.");
		}
	}

	async savePost(data) {

		// Realizando verificações
		if (!data.title || data.title === '') {
			alert("Título é obrigatório!")
			return;
		}
		if (!data.content || data.content === '') {
			alert("Conteúdo é obrigatório!")
			return;
		}
		if (!data.imageUrl || data.imageUrl === '') {
			alert("Imagem URl é obrigatório!")
			return;
		}

		try {
			// Caso seja uma edição, chamar o "edit" do serviço
			if (data.id) {
				await postsService.edit(data, data.id)
				alert("Post editado com sucesso!")
			}
			// Caso seja uma adição, chamar o "create" do serviço
			else {
				await postsService.create(data)
				alert("Post criado com sucesso!")
			}

			// After save
			this.setState({ inEditPost: null, selectedPost: null })
			this.loadPosts()

		} catch (error) {
			console.log(error)
			alert("Erro ao criar post.")
		}
	}

	handleSearchChange(value) {
		this.setState({ search: value }, () => {
			this.searchPosts(value);
		});
	}

	searchPosts(search) {
		if (this.searchTimer != null) {
			clearTimeout(this.searchTimer);
		}

		this.searchTimer = setTimeout(() => {
			if (search != "") {
				this.loadPosts({ search });
			} else {
				this.loadPosts();
			}
		}, 500);
	}

	selectPost(selectedPost) {
		this.setState({ selectedPost, inEditPost: null })
	}

	editPost(inEditPost) {
		this.setState({ inEditPost })
	}

	addPost() {
		this.setState({ selectedPost: null, inEditPost: {} })
	}

	render() {

		const {
			posts,
			selectedPost,
			redirectTo,
			inEditPost,
			search
		} = this.state;

		if (redirectTo) {
			return <Redirect to={redirectTo} />;
		}

		return (
			<div className="post-grid">
				<div className="post-grid__col">
					<PostList />
				</div>
				<div className="post-grid__col">
					<PostDetail />
				</div>
				<div className="post-grid__col">
					<PostEdit />
				</div>
				{/* <div className="post-grid__col">
					<PostList
						posts={posts}
						selectPost={(post) => this.selectPost(post)}
						search={search}
						onSearch={(value) => this.handleSearchChange(value)}
						addPost={() => this.addPost()}
					/>
				</div>
				{selectedPost ? (
					<div className="post-grid__col">
						<PostDetail
							post={selectedPost}
							editPost={(post) => this.editPost(post)}
							deletePost={(postId) => this.deletePost(postId)}
							onClose={() => this.setState({ selectedPost: null })}
						/>
					</div>
				) : null}
				{inEditPost ? (
					<div className="post-grid__col">
						<PostEdit
							post={inEditPost}
							onSave={(post) => this.savePost(post)}
							onCancel={() => this.setState({ inEditPost: null })}
						/>
					</div>
				) : null} */}
			</div>
		)
	}
}

export default PostListPage;
