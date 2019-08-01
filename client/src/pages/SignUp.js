import React, { Component } from "react";
import "./SignUp.css";

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createUser(this.state.firstName, this.state.lastName, this.state.email, this.state.password);
    }

    render() {
        return (
            <span className="resetPage">
                <div className="reset">
                    <div className="logo">
                        <a href="/">
                            <img className="loginLogo" src={require('../images/logo2.png')} alt="congo" />
                        </a>
                        <h4 className="standardTitle">Outwork</h4>
                    </div>
                    <form>
                        <h4 className="resetFormHeader">Sign up</h4>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                name="firstName"
                                type="text"
                                className="form-control"
                                autoComplete="off"
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                name="lastName"
                                type="text"
                                className="form-control"
                                autoComplete="off"
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                name="email"
                                type="email"
                                className="form-control"
                                autoComplete="off"
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                name="password"
                                type="password"
                                autoComplete="off"
                                className="form-control"
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="submitEmailBtn"
                            onClick={this.handleSubmit}
                        >
                            Submit
                    </button>
                    </form>
                </div>
            </span>
        )
    }
}

export default SignUp;