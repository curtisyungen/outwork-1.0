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
      redirectToSignUp: false,
      redirectToLogin: false,
      redirectToHome: false,
      redirectToLanding: false,
      userId: null,
    }
  }

  componentDidMount = () => {

    let loginStatus;
    if (localStorage.getItem("isLoggedIn")) {
      loginStatus = JSON.parse(localStorage.getItem("isLoggedIn"));

      this.setState({
        isLoggedIn: loginStatus,
      });
    } 

    this.setState({
      redirectToSignUp: false,
      redirectToLogin: false,
      redirectToHome: false,
      redirectToLanding: false,
    });
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

  setRedirectToLanding = () => {
    this.setState({
      redirectToLanding: true,
    });
  }

  redirectToLanding = () => {
    return <Redirect to="/landing" />
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

  updateParentState = () => {
    this.setState({
      redirectToHome: false,
      redirectToLogin: false,
      redirectToSignup: false,
      redirectToLanding: false,
    });
  }

  // USER
  // ==================================

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
                alert("User created.");
                this.setRedirectToHome();
              }
            });
        }
        else {
          alert("Account already exists for this email address.");
          this.setRedirectToLogin();
        }
      });    
  }

  loginUser = (email, password) => {

    // Check if email exists in database
    userAPI.getUser(email)
      .then((res) => {
        if (res.data.length === 0) {
          alert("No account exists for this email address.");
          this.setRedirectToSignUp();
        }
        else {
          userAPI.loginUser(email, password)
            .then((res) => {
              if (res.data.length === 0) {
                alert("Incorrect password.");
              }
              else { 
                // Store login status and userId in local storage
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userId", res.data[0].userId);

                // Store login data and userId in state
                this.setState({
                  isLoggedIn: "true",
                  userId: res.data.userId,
                }, () => {

                  // Redirect to home page
                  alert("Successful login.");
                  this.setRedirectToHome();
                });
              }
            });
        }
      });
  }

  logoutUser = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("userId", null);

    this.setState({
      isLoggedIn: "false",
      userId: null,
    }, () => {
      this.setRedirectToLanding();
    });
  }



  render() {
    return (
      <Router>
        <span>

          {/* Redirect To Landing Page */}

          {this.state.redirectToLanding ? (
            this.redirectToLanding()
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
          <Navbar 
            logoutUser={this.logoutUser}
          />

          <Switch>
            {/* Home Page */}
            <Route exact path="/" render={() => 
              <Home 
                updateParentState={this.updateParentState}
              />
            } />

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
