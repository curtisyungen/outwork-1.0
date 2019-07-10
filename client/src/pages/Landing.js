import React, { Component } from "react";
import userAPI from "../utils/userAPI";
import "./Landing.css";

class Landing extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount = () => {
        let userId;
        if (localStorage.getItem("userId") !== null) {
            userId=localStorage.getItem("userId");
            userAPI.getUserById(userId)
                .then((res) => {
                    if (res.data.length === 0) {
                        this.props.logoutUser();
                        return;
                    }
                    else {
                        this.props.setRedirectToHome();
                    }
            });
        }
    }

    render() {
        return (
            <span>
                <div className="jumbotron jumbotron-fluid text-center">
                    <div>
                        <h1 className="display-12">Outwork</h1>
                        <p className="lead">Welcome.</p>
                    </div>
                    <div className="loginBtns btn-group col-lg-2 text-center">
                        <button 
                            className="btn btn-outline-dark btn-sm" 
                            onClick={this.props.setRedirectToSignUp}
                        >
                            Sign Up
                        </button>
                        <button 
                            className="btn btn-outline-dark btn-sm" 
                            onClick={this.props.setRedirectToLogin}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </span>
        )
    }
}

export default Landing;
