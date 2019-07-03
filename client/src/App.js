import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Home from "./pages/Home";
import userAPI from "./utils/userAPI";
import actAPI from "./utils/actAPI";
import exerAPI from "./utils/exerAPI";
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount = () => {

  }

  render() {
    return (
      <Router>
        <span>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}/>

        </Switch>
        </span>
      </Router>
    )
  }
}

export default App;
