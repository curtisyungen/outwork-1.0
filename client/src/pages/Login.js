import React, { Component } from "react";
// import Container from "../components/Container/container";
import "./Login.css";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        }
    }

    componentDidMount = () => {

    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.loginUser(this.state.email, this.state.password);
    }

    render() {
        return (
            <div className="container loginContainer">
                <div className="row loginRow">
                    <form className="loginForm">
                        <div className="logo"><a href="/landing">Outwork</a></div>
                        <h4>Sign in</h4>
                        <div className="form-group">
                            <label>Email address</label>
                            <input 
                                name="email"
                                type="email" 
                                className="form-control"
                                autoComplete="off"
                                onChange={this.handleInputChange}
                                value={this.state.email}
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
                                value={this.state.password}
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            onClick={this.handleSubmit}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;