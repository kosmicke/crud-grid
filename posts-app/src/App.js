import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/login/login.page';
import PostsPage from './pages/posts/posts.page';
import authService from './services/auth.service';

import { Provider } from 'react-redux';
import store from './store';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: null
    }
  }

  componentDidMount() {
    this.loadUserData()
  }

  loadUserData() {
    let userData = authService.getLoggedUser()
    if (userData) {
      this.setState({ userData: userData })
    }
  }

  logout() {
    authService.clearLoggedUser();
    window.location.reload();
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Post App</Link>
            <button className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarMenu"
              aria-controls="navbarMenu">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarMenu">
              {(this.state.userData) ? (
                <div className="nav-user">
                  <div className="nav-user__info">
                    <h4>{this.state.userData.name}</h4>
                    <p>{this.state.userData.email}</p>
                  </div>
                  <button className="btn btn-outline-dark" onClick={e => this.logout()}>Sair</button>
                </div>
              ) : null}
            </div>
          </nav>
          <Switch>
            <Route path="/" exact={true} component={PostsPage} />
            <Route path="/login" component={props => <LoginPage {...props} onLogin={() => this.loadUserData()} />} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }

}

export default App;
