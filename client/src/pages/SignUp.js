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
        this.props.createUser(this.state.firstName, this.state.lastName, this.state.email, this.state.password);
    }

    render() {
        return (
            <div className="container">
                <form className="col-md-4">
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            name="firstName"
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            onChange={this.handleInputChange}
                        // value={this.state.firstName}
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
                        // value={this.state.lastName}
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
                        // value={this.state.email}
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
                        // value={this.state.password}
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
        )
    }
}

export default SignUp;