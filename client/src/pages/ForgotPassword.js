import React, { Component } from "react";
import userAPI from "../utils/userAPI";
import "./ForgotPassword.css";

class ForgotPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
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

    getPasswordReset = (event) => {
        event.preventDefault();

        if (this.state.email !== null && this.state.email !== "") {
            
            // Check if email exists in database
            userAPI.getUser(this.state.email)
                .then((res) => {

                    // If email is found, send password reset message
                    if (res.data.length > 0) {

                        let email = this.state.email;

                        // Set reset code in database
                        userAPI.setResetCode(email)
                            .then((res) => {

                                // Save subject email in parent state
                                this.props.setResetEmail(email);

                                // Email reset code to user
                                userAPI.sendPasswordResetCode(email, res.data[0].resetCode);

                                // Redirect to reset code input page
                                this.props.setRedirectToPasswordReset();
                            });       
                    }
                    // Message if email not found in database
                    else {
                        alert("No account exists for this user.");

                        this.setState({
                            email: "",
                        });
                    }
                });
        }
        else {
            alert("Please enter your email address.");
        }
    }

    sendPasswordReset = () => {
        if (this.state.email !== null && this.state.email !== "") {
            userAPI.sendPasswordReset(this.state.email);
        }
        else {
            alert("Please enter your email address.");
        }
    }

    render() {
        return (
            <span className="forgotPage">
                <div className="forgot">
                    <div className="logo">
                        <a href="/">
                            <img className="loginLogo" src={require('../images/logo2.png')} alt="congo" />
                        </a>
                    </div>
                    <form>
                        <h4 className="formHeader">Password assistance</h4>
                        <p className="formSubHeader">
                            You forgot your password? Wow, that's really stupid and annoying of you.
                            Well, enter your email address below then.
                        </p>
                        <p className="formLabel">Email</p>
                        <input
                            autoFocus
                            className="formInput fp-wide"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />

                        <button
                            className="submitEmailBtn"
                            onClick={this.getPasswordReset}
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </span>
        )
    }
}

export default ForgotPassword;