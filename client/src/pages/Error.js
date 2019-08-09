import React, { Component } from "react";
import "./Error.css";

class Error extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <div className="jumbotron fluid-jumbotron text-center errorPage">
                <div className="logo">
                    <a href="/">
                        <img className="loginLogo" src={require('../images/logo2.png')} alt="congo" />
                    </a>
                </div>
                <div className="errorMessage">Page not found.</div>
                <div className="errorSubMessage">Click logo to go home.</div>
            </div>
        )
    }
}

export default Error;