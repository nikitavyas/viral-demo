import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from './axios'


import {
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Messages from './components/Messages';
import Login from './components/login';
import Info from './components/info';
import Cart from './components/cart';
import Signup from './components/signup';

class App extends Component {
  componentDidMount() {}
  
  logout() {
    axios.post('/admin/logout', {}).then((res) => {
      localStorage.removeItem('token');
      // this.props.history.push('/login');
    }).catch((err) => {
      console.log(err);
    });
  }
    
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        {/* <div className="menu">
            <ul>
              <li> <Link to="/">Home</Link> </li>
              <li> <Link to="/messages">Messages</Link> </li>
              <li> <Link to="/about">About</Link> </li>
              <li> <Link to="/login">Login</Link> </li>
            </ul>
        </div> */}
        {/* <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
  
  <a className="navbar-brand" href="#">Logo</a>

  <ul className="navbar-nav">
    <li className="nav-item">
      <Link to="/">Home</Link>
    </li>
    <li className="nav-item">
    <Link to="/messages">Messages</Link>
    </li>
    <li className="nav-item">
    <Link to="/about">About</Link>
    </li>
    <li className="nav-item">
    <Link to="/cart">Cart</Link>
    </li>
    {localStorage.getItem('token') ? 
    <li className="nav-item">
    <button onClick={() => this.logout()}>Logout</button>
    </li> : '' }
    
  </ul>
  
</nav> */}
<header>
  <div id="top-header">
            <div class="container">
              <ul class="header-links pull-left">
                <li><a href="#"><i class="fa fa-phone"></i> +021-95-51-84</a></li>
                <li><a href="#"><i class="fa fa-envelope-o"></i> email@email.com</a></li>
                <li><a href="#"><i class="fa fa-map-marker"></i> 1734 Stonecoal Road</a></li>
              </ul>
              <ul class="header-links pull-right">
                <li><a href="#"><i class="fa fa-dollar"></i> USD</a></li>
                <li><a href="#"><i class="fa fa-user-o"></i> My Account</a></li>
              </ul>
            </div>
          </div>
          </header>
        <div className="App-intro">
          <Switch>
            <Route exact path="/"  component={Home} />
            <Route path="/messages" component={Messages} />
            <Route path="/about" component={About} />
            <Route path="/info/:id" component={Info} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
