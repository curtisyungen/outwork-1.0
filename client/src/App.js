import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/navbar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

import userAPI from "./utils/userAPI";
// import actAPI from "./utils/actAPI";
// import exerAPI from "./utils/exerAPI";

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

  // LOGIN
  // ==================================

  loginUser = (email, password) => {

    // Check if email exists in database
    userAPI.getUser(email)
      .then((res) => {
        console.log("Login User", res);
      });
  }

  createUser = (firstName, lastName, email, password) => {

    // Check if email already exists in database
    userAPI.getUser(email) 
      .then((res) => {
        if (res.data.length === 0) {
          let weight = 150;
          let privacy = "public";

          userAPI.createUser(firstName, lastName, email, password, weight, privacy)
            .then((res) => {
              if (res.status === 200) {
                console.log("yes");
              }
            });
        }
        else {
          alert("Account already exists for this email address.");

          this.setRedirectToLogin();
        }
      });    
  }

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
                setRedirectToLogin={this.setRedirectToLogin}
              />
            } />

            {/* Login Page */}
            <Route exact path="/login" render={() => 
              <Login
                setRedirectToSignUp={this.setRedirectToSignUp}
                setRedirectToHome={this.setRedirectToHome}
                loginUser={this.loginUser}
              />
            } />

            {/* Sign Up Page */}
            <Route exact path="/signUp" render={() => 
              <SignUp
                setRedirectToLogin={this.setRedirectToLogin}
                setRedirectToHome={this.setRedirectToHome}
                createUser={this.createUser}
              />
            } />
          </Switch>
        </span>
      </Router>
    )
  }
}

export default App;
