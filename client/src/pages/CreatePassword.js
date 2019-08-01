import React, { Component } from "react";
import userAPI from "../utils/userAPI";
import "./CreatePassword.css";

class CreatePassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newPassword: null,
            verifyPassword: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            email: this.props.email,
        });
    }

    validatePassword = () => {
        
        if (this.state.newPassword === null || this.state.newPassword === "") {
            return "blank";
        }

        if (this.state.newPassword.length < 6) {
            return "short";
        }

        if (this.state.newPassword !== this.state.verifyPassword) {
            return "unmatch";
        }

        return "good";
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    submitNewPassword = (event) => {

        event.preventDefault();

        let valid = this.validatePassword();
        let errMsg = "Invalid password.";

        switch (valid) {
            case "blank": errMsg = "Password cannot be blank."; break;
            case "short": errMsg = "Password must be at least 6 characters."; break;
            case "unmatch": errMsg = "Passwords don't match."; break;
            default: errMsg = "Invalid password.";
        }

        if (valid === "good") {
            userAPI.updatePassword(this.state.email, this.state.newPassword)
                .then((res) => {
                    this.props.setRedirectToLogin();
                });
        }
        else {
            alert(errMsg);
        }
    }

    render() {
        return (
            <span className="createPasswordPage">
                <div className="reset">
                    <div className="logo">
                        <a href="/">
                            <img className="loginLogo" src={require('../images/logo2.png')} alt="congo" />
                        </a>
                    </div>
                    <form>
                        <h4 className="passwordFormHeader">Create New Password</h4>
                        <p className="formSubHeader">We'll ask for this password whenever you Sign-In.</p>
                        <p className="formLabel">New Password</p>
                        <input
                            autoFocus
                            className="formInput fp-wide"
                            name="newPassword"
                            type="password"
                            value={this.state.newPassword}
                            onChange={this.handleInputChange}
                            autoComplete="off"
                        />
                        <label className="passwordLabel">
                            Passwords must be at least 6 characters. 
                            Count on your fat fingers if you have to once you're done licking the Cheeto dust off of them.
                        </label>

                        <p className="formLabel">Re-enter Password</p>
                        <input
                            className="formInput fp-wide"
                            name="verifyPassword"
                            type="password"
                            value={this.state.verifyPassword}
                            onChange={this.handleInputChange}
                            autoComplete="off"
                        />

                        <button
                            className="submitEmailBtn"
                            onClick={this.submitNewPassword}
                        >
                            Save changes and Sign-In
                        </button>
                    </form>
                </div>

                <div className="passwordTips">
                    <div className="passwordTipsTitle">Secure password tips:</div>
                    <ul>
                        <li className="passwordTip">Use passwords like "123456" or your birthdate. No one would ever guess it because it's too obvious.</li>
                        <li className="passwordTip">Write your password down on a sticky note and keep it displayed by your computer.</li>
                        <li className="passwordTip">Use a password that is personal and easy to guess in case you forget it again.</li>
                        <li className="passwordTip">Use one single password for all of your online accounts so it's easier to remember.</li>
                    </ul>
                </div>
            </span>
        )
    }
}

export default CreatePassword;
