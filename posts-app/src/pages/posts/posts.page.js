import React from "react";
import { Redirect } from "react-router-dom";
import PageTop from "../../components/page-top/page-top.component";
import authService from "../../services/auth.service";
import postsService from "../../services/posts.service";
import PostDetail from "../post-detail/post-detail";
import PostEdit from "../post-edit/post-edit";
import PostList from "../post-list/post-list";
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

  async deletePost(postId) {
    if (!window.confirm("Deseja realmente excluir este post?")) return;
    try {
      await postsService.delete(postId);
      alert("Post excluído com sucesso");
    } catch (error) {
      console.log(error);
      alert("Não foi excluir o post.");
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

   // // Função que exclui o post, chamada ao clicar no botão "Excluir"
    // const deletePost = useCallback((postId) => {
        
    //     if (!window.confirm("Deseja realmente excluir este post?")) return;

    //     postsService.delete(postId)
    //         .then(res => {
    //             alert("Post excluído com sucesso")
    //             props.history.replace('/post-list')
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             alert("Não foi excluir o post.")
    //         })

    // }, [])

  selectPost(selectedPost){
    this.setState({selectedPost})
  }
  editPost(inEditPost){
    this.setState({inEditPost})
  }

  render() {
    const { posts, selectedPost, redirectTo, inEditPost } = this.state;

    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }

    return (
        <div className="post-grid">
          <div className="post-grid__col">
            <PostList posts={posts} selectPost={(post) => this.selectPost(post)}/>
          </div>
          {selectedPost ? (
            <div className="post-grid__col">
              <PostDetail post={selectedPost} editPost={(post) => this.editPost(post)}/>
            </div>
          ) : null }
          {inEditPost ? (
            <div className="post-grid__col">
              <PostEdit post={inEditPost}/>
            </div>
          ) : null }
        </div>
    )
  }
}

export default PostListPage;
