import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LogActivity from "./pages/LogActivity";
import SubmitRun from "./pages/SubmitRun";
import SubmitBike from "./pages/SubmitBike";
import SubmitSwim from "./pages/SubmitSwim";
import SubmitLift from "./pages/SubmitLift";
import Generator from "./pages/Generator";
import FindUsers from "./pages/FindUsers";
import Settings from "./pages/Settings";
import Error from "./pages/Error";
import userAPI from "./utils/userAPI";
import actAPI from "./utils/actAPI";
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
      allActivity: [],
    }
  }

  componentDidMount = () => {

    // Check if logged in
    let loginStatus = false;
    if (localStorage.getItem("isLoggedIn")) {
      loginStatus = JSON.parse(localStorage.getItem("isLoggedIn"));
    }

    this.setState({
      isLoggedIn: loginStatus,
      redirectToSignUp: false,
      redirectToLogin: false,
      redirectToHome: false,
      redirectToLanding: false,
    });

    // Get userId from local storage
    let userId;
    if (localStorage.getItem("userId") && localStorage.getItem("userId") !== null) {
      userId = localStorage.getItem("userId");

      // Verify userId
      userAPI.getUserById(userId)
        .then((res) => {
          if (res.data.length === 0) {
            this.logoutUser();
            return;
          }
          else {
            localStorage.setItem("fn", res.data[0].firstName);
            localStorage.setItem("ln", res.data[0].lastName);
          }
        });
    }
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
    return <Redirect to="/" />
  }

  redirectToSignUp = () => {
    return <Redirect to="/signUp" />
  }

  redirectToLogin = () => {
    return <Redirect to="/login" />
  }

  redirectToHome = () => {
    return <Redirect to="/home" />
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

                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userId", res.data.userId);

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
                localStorage.setItem("fn", res.data[0].firstName);

                this.getUserActivity(res.data[0].userId);
                this.setRedirectToHome();
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

  // Called on each page load
  // Checks userId in local storage to see if it exists in database
  // If it doesn't/it is a fake userId, automatically logs out user and redirects to landing page
  // This prevents users from navigating to pages without being properly logged in
  checkValidUser = () => {
    let userId;
    if (localStorage.getItem("userId") && localStorage.getItem("userId") !== null) {
      userId = localStorage.getItem("userId");

      return userAPI.getUserById(userId)
        .then((res) => {
          if (res.data.length === 0) {
            this.logoutUser();
            return false;
          }
          else {
            return true;
          }
        });
    }
    else {
      this.logoutUser();
      return false;
    }
  }

  getUserActivity = (userId) => {

    this.setState({
      loadingActivity: true,
    }, () => {

      let allActivity = this.state.allActivity;

      // GET RUNS
      actAPI.getRunsByUser(userId)
        .then((res) => {
          for (var item in res.data) {
            allActivity.push(res.data[item]);
          };

          // GET BIKES
          actAPI.getBikesByUser(userId)
            .then((res) => {
              for (var item in res.data) {
                allActivity.push(res.data[item]);
              };

              // GET SWIMS
              actAPI.getSwimsByUser(userId)
                .then((res) => {
                  for (var item in res.data) {
                    allActivity.push(res.data[item]);
                  };

                  // GET LIFTS
                  actAPI.getLiftsByUser(userId)
                    .then((res) => {
                      for (var item in res.data) {
                        allActivity.push(res.data[item]);
                      };

                      // SORT BY DATE
                      this.sortByDate(allActivity);
                    });
                });
            });
        });
    });
  }

  sortByDate = (allActivity) => {
    allActivity.sort(this.compare);

    this.setState({
      allActivity: allActivity,
      loadingActivity: false,
    });
  }

  compare = (a, b) => {
    if (a.date === b.date) {
      return 0;
    }
    else {
      return (a.date > b.date) ? -1 : 1;
    }
  }

  deleteActivity = (type, id) => {

    let userId = this.state.userId;

    if (type === "run") {
      actAPI.deleteRunById(id, userId);
    }
    else if (type === "bike") {
      actAPI.deleteBikeById(id, userId);
    }
    else if (type === "swim") {
      actAPI.deleteSwimById(id, userId);
    }
    else if (type === "lift") {
      actAPI.deleteLiftById(id, userId);
    }

    window.location.reload();
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

          {/* Navbar */}
          <Navbar
            isLoggedIn={this.state.isLoggedIn}
            logoutUser={this.logoutUser}
          />

          <Switch>
            {/* Landing Page */}
            <Route exact path="/" render={() =>
              <Landing
                setRedirectToSignUp={this.setRedirectToSignUp}
                setRedirectToLogin={this.setRedirectToLogin}
                setRedirectToHome={this.setRedirectToHome}
                checkValidUser={this.checkValidUser}
                logoutUser={this.logoutUser}
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

            {/* Home Page */}
            <Route exact path="/home" render={() =>
              <Home
                updateParentState={this.updateParentState}
                checkValidUser={this.checkValidUser}
                getUserActivity={this.getUserActivity}
                allActivity={this.state.allActivity}
              />
            } />

            {/* Profile Page */}
            <Route exact path="/profile" render={() =>
              <Profile
                checkValidUser={this.checkValidUser}
              />
            } />

            {/* Log Activity Page */}
            <Route exact path="/logActivity" render={() =>
              <LogActivity
                checkValidUser={this.checkValidUser}
              />
            } />

            {/* Log Run Page */}
            <Route exact path="/run" render={() =>
              <SubmitRun
                checkValidUser={this.checkValidUser}
              />
            } />

            {/* Log Bike Page */}
            <Route exact path="/bike" render={() =>
              <SubmitBike
                checkValidUser={this.checkValidUser}
              />
            } />

            {/* Log Swim Page */}
            <Route exact path="/swim" render={() =>
              <SubmitSwim
                checkValidUser={this.checkValidUser}
              />
            } />

            {/* Log Lift Page */}
            <Route exact path="/lift" render={() =>
              <SubmitLift
                checkValidUser={this.checkValidUser}
              />
            } />

            {/* Generator Page */}
            <Route exact path="/generator" render={() =>
              <Generator
                checkValidUser={this.checkValidUser}
              />
            } />

            {/* Find Users Page */}
            <Route exact path="/findUsers" render={() =>
              <FindUsers
                checkValidUser={this.checkValidUser}
              />
            } />

            {/* Settings Page */}
            <Route exact path="/settings" render={() =>
              <Settings
                checkValidUser={this.checkValidUser}
              />
            } />

            <Route component={Error} />
          </Switch>
        </span>
      </Router>
    )
  }
}

export default App;
