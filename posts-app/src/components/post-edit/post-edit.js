import React from 'react';
import PageTop from '../../components/page-top/page-top.component';
import './post-edit.scss'

class PostEdit extends React.Component {

    constructor(props) {
        super(props)
        this.state = props.post
    }

    render() {

        let title = this.state.id ? 'Editar Post' : 'Novo Post';
        let desc = this.state.id ? 'Editar informações de um post' : 'Formulário de criação de posts';

        return (
            <div className="container">

                <PageTop title={title} desc={desc}>
                    <button className="btn btn-light" onClick={() => this.props.onCancel()}>
                        Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={() => this.props.onSave(this.state)}>
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
                            value={this.state.title}
                            onChange={e => this.setState({ title: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Conteúdo</label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="content"
                            value={this.state.content}
                            rows={4}
                            style={{ resize: 'none' }}
                            onChange={e => this.setState({ content: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageurl">Url da imagem</label>
                        <input
                            type="text"
                            className="form-control"
                            id="imageurl"
                            value={this.state.imageUrl}
                            onChange={e => this.setState({ imageUrl: e.target.value })} />
                    </div>
                </form>
            </div>
        )
    }
}   

export default PostEdit;