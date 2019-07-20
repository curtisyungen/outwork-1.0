import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Modal from "react-responsive-modal";
import Navbar from "./components/Navbar/navbar";
import Backgrounds from "./components/Backgrounds/backgrounds";
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
import Streaks from "./pages/Streaks";
// import FindUsers from "./pages/FindUsers";
import AllUsers from "./pages/AllUsers";
import Error from "./pages/Error";
import userAPI from "./utils/userAPI";
import workoutAPI from "./utils/workoutAPI";
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      redirectToSignUp: false,
      redirectToLogin: false,
      redirectToHome: false,
      redirectToLanding: false,
      redirectToProfile: false,
      userId: null,
      profileId: null,
      otherUserFirst: null,
      otherUserLast: null,
      allActivity: [],
      background: "none",
    }
  }

  componentDidMount = () => {

    // Check if logged in
    let loginStatus = false;
    if (localStorage.getItem("isLoggedIn")) {
      loginStatus = JSON.parse(localStorage.getItem("isLoggedIn"));
    }

    // Get background image from local storage or default to None
    let background = "none";
    if (localStorage.getItem("background") && localStorage.getItem("background") !== null) {
      background = localStorage.getItem("background");
    }
    else {
      localStorage.setItem("background", "none");
    }

    this.setState({
      isLoggedIn: loginStatus,
      redirectToSignUp: false,
      redirectToLogin: false,
      redirectToHome: false,
      redirectToLanding: false,
      redirectToProfile: false,
      background: background,
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

  setRedirectToProfile = () => {
    this.setState({
      redirectToProfile: true,
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

  redirectToProfile = () => {
    return <Redirect to="/profile" />
  }

  updateParentState = () => {
    this.setState({
      redirectToHome: false,
      redirectToLogin: false,
      redirectToSignup: false,
      redirectToLanding: false,
      redirectToProfile: false,
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

                this.getAllWorkouts();
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
  // If it doesn't exist/it is a fake userId, automatically logs out user and redirects to landing page
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

  getAllWorkouts = () => {
    workoutAPI.getAllWorkouts()
      .then((res) => {
        this.setState({
          allActivity: res.data,
        });
      });
  }

  // sortByDate = (allActivity) => {
  //   allActivity.sort(this.compare);

  //   this.setState({
  //     allActivity: allActivity,
  //     loadingActivity: false,
  //   });
  // }

  // compare = (a, b) => {
  //   if (a.date === b.date) {
  //     return 0;
  //   }
  //   else {
  //     return (a.date > b.date) ? -1 : 1;
  //   }
  // }

  deleteActivity = (workoutId) => {

    let userId = localStorage.getItem("userId");

    workoutAPI.deleteWorkoutById(userId, workoutId)
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
  }

  loadProfile = (userId, firstName, lastName) => {
    this.setState({
      profileId: userId,
      otherUserFirst: firstName,
      otherUserLast: lastName,
    }, () => {
      this.setRedirectToProfile();
    });
  }

  openBackgrounds = () => {
    this.setState({
      openModal: true,
    });
  }

  setBackground = (background) => {
    this.setState({
      background: background,
    }, () => {
      localStorage.setItem("background", background);
      this.closeBackgrounds();
    });
  }

  closeBackgrounds = () => {
    this.setState({
      openModal: false,
    });
  }

  render() {
    return (
      <Router>
        <div className={`appClass ${this.state.background}`}>

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

          {/* Redirect To Profile */}

          {this.state.redirectToProfile ? (
            this.redirectToProfile()
          ) : (
              <></>
            )}

          {this.state.openModal ? (
            <Modal
              open={this.state.openModal}
              onClose={this.closeBackgrounds}
            >
              <Backgrounds
                setBackground={this.setBackground}
              />
            </Modal>
          ) : (
              <></>
            )}

          {/* Navbar */}
          <Navbar
            isLoggedIn={this.state.isLoggedIn}
            openBackgrounds={this.openBackgrounds}
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
                getAllWorkouts={this.getAllWorkouts}
                allActivity={this.state.allActivity}
                deleteActivity={this.deleteActivity}
                background={this.state.background}
              />
            } />

            {/* Profile Page */}
            <Route exact path="/profile" render={() =>
              <Profile
                profileId={this.state.profileId}
                otherUserFirst={this.state.otherUserFirst}
                otherUserLast={this.state.otherUserLast}
                checkValidUser={this.checkValidUser}
                deleteActivity={this.deleteActivity}
                background={this.state.background}
              />
            } />

            {/* Log Activity Page */}
            <Route exact path="/logActivity" render={() =>
              <LogActivity
                checkValidUser={this.checkValidUser}
                background={this.state.background}
              />
            } />

            {/* Log Run Page */}
            <Route exact path="/run" render={() =>
              <SubmitRun
                checkValidUser={this.checkValidUser}
                background={this.state.background}
              />
            } />

            {/* Log Bike Page */}
            <Route exact path="/bike" render={() =>
              <SubmitBike
                checkValidUser={this.checkValidUser}
                background={this.state.background}
              />
            } />

            {/* Log Swim Page */}
            <Route exact path="/swim" render={() =>
              <SubmitSwim
                checkValidUser={this.checkValidUser}
                background={this.state.background}
              />
            } />

            {/* Log Lift Page */}
            <Route exact path="/lift" render={() =>
              <SubmitLift
                checkValidUser={this.checkValidUser}
                background={this.state.background}
              />
            } />

            {/* Generator Page */}
            <Route exact path="/generator" render={() =>
              <Generator
                checkValidUser={this.checkValidUser}
                background={this.state.background}
                difficulty={sessionStorage.getItem("diff")}
              />
            } />

            {/* Streaks Page */}
            <Route exact path="/streaks" render={() =>
              <Streaks
                checkValidUser={this.checkValidUser}
                background={this.state.background}
              />
            } />

            {/* Find Users Page */}
            <Route exact path="/allUsers" render={() =>
              <AllUsers
                checkValidUser={this.checkValidUser}
                loadProfile={this.loadProfile}
                background={this.state.background}
              />
            } />

            <Route component={Error} />
          </Switch>
        </div>
      </Router >
    )
  }
}

export default App;
