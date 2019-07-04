import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/navbar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

import userAPI from "./utils/userAPI";
import actAPI from "./utils/actAPI";
import exerAPI from "./utils/exerAPI";

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: true,
      redirectToSignUp: false,
      redirectToLogin: false,
      redirectToHome: false,
    }
  }

  componentDidMount = () => {

  }

  // REDIRECTS
  // ==================================

  setRedirectToSignUp = () => {
    this.setState({
      redirectToSignUp: true,
    });
  }

  setRedirectToLogin = () => {
    this.setState({
      redirectToLogin: true,
    });
  }

  setRedirectToHome = () => {
    this.setState({
      redirectToHome: true,
    });
  }

  redirectToSignUp = () => {
    return <Redirect to="/signUp" />
  }

  redirectToLogin = () => {
    return <Redirect to="/login" />
  }

  redirectToHome = () => {
    return <Redirect to="/" />
  }

  // 
  // ==================================



  render() {
    return (
      <Router>
        <span>

          {/* Redirect To Landing Page */}

          {!this.state.isLoggedIn ? (
            <Redirect to="/landing" />
          ) : (
            <></>            
          )}

          {/* Redirect to Login Page */}

          {this.state.redirectToLogin ? (
            this.redirectToLogin()
          ) : (
            <></>
          )}

          {/* Redirect to Sign Up Page */}

          {this.state.redirectToSignUp ? (
            this.redirectToSignUp()
          ) : (
            <></>
          )}   

          {/* Redirect to Home */}

          {this.state.redirectToHome ? (
            this.redirectToHome()
          ) : (
            <></>
          )}       

          {/* Render Navbar */}

          {window.location.pathname !== "/landing" &&
           window.location.pathname !== "/login" &&
           window.location.pathname !== "/signUp" ? (
            <Navbar 
            
            />
           ) : (
             <></>
           )}

          <Switch>
            {/* Home Page */}
            <Route exact path="/" component={Home} />

            {/* Landing Page */}
            <Route exact path="/landing" render={() =>
              <Landing
                setRedirectToSignUp={this.setRedirectToSignUp}
                setRedirectToSignIn={this.setRedirectToSignIn}
              />
            } />

            {/* Login Page */}
            <Route exact path="/login" render={() => 
              <Login
                setRedirectToSignUp={this.setRedirectToSignUp}
                setRedirectToHome={this.setRedirectToHome}
              />
            } />

            {/* Sign Up Page */}
            <Route exact path="/signUp" render={() => 
              <SignUp
                setRedirectToLogin={this.setRedirectToLogin}
                setRedirectToHome={this.setRedirectToHome}
              />
            } />
          </Switch>
        </span>
      </Router>
    )
  }
}

export default App;
