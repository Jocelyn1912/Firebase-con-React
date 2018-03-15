import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase, { auth, provider } from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      users: null // En la carga inicial el cliente aún no ha inicidao sesión
    }
    this.login = this.login.bind(this); // para el btn de inicio de sesión
    this.logout = this.logout.bind(this); // para el btn de cerrar sesión
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /* Función de inicio de sesión*/
  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  /* Función de cierre de sesión*/
  login() {
    auth.signInWithPopup(provider)
    .them((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
    user: this.state.user.displayName || this.state.user.email
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
    const itemsRef = firebase.database().ref('items');
  }

  render() {
  return (
    <div className='app'>
      <header>
        <div className="wrapper">
          <h1>Fun Food Friends</h1>
          {this.state.user ?
            <button onClick={this.logout}>Logout</button>
            :
            <button onClick={this.login}>Log In</button>
          }
        </div>
        </header>
        {this.state.user ?
        <div>
          <div className='user-profile'>
            <input type="text" name="username" placeholder="What's your name?" value={this.state.user.displayName || this.state.user.email} />
            <img src={this.state.user.photoURL} />
          </div>
        </div>
        :
        <div className='wrapper'>
          <p>You must be logged in to see the potluck list and submit to it.</p>
        </div>
      }
      </div>
    );
  }
}

export default App;
