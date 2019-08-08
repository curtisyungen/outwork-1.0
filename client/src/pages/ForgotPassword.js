import React, { Component } from "react";
import userAPI from "../utils/userAPI";
import "./ForgotPassword.css";

class ForgotPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            agree: false,
            hover: 0,
        }
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

    agree = () => {
        this.setState({
            agree: true,
        });
    }

    hover = () => {
        this.setState({
            hover: this.state.hover + 1,
        });
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
                        <h4 className="formHeader pwordAssist">Password assistance</h4>
                        <p className="formSubHeader">
                            You forgot your password? Alright then. 
                            Enter your email address below and we'll get this sorted out.
                        </p>
                        <p className="formLabel">Email</p>
                        <input
                            autoFocus
                            autoComplete="off"
                            className="formInput fp-wide"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />

                        <button
                            className="submitEmailBtn"
                            onClick={this.getPasswordReset}
                            disabled={this.state.agree === false}
                        >
                            Continue
                        </button>
                        
                        {this.state.email !== null && this.state.email.length > 0 && this.state.agree === false ? (
                            <span>
                                <p className="lecture">
                                    Look, try not to forget your password anymore. 
                                    It's just a lot of trouble to have to reset it and use up time and computing energy.
                                    I work hard all day and then come home and you've forgotten your stupid password.
                                    How do you think I feel about you always being the way that you are? 
                                    It's important to keep track of information like this for yourself. I can't always help you.
                                    Do you do the same with your bank PIN number? Or your phone number? 
                                    Seriously, figure this out. If you have to write it down somewhere then fine, do that.
                                    But don't keep coming back again and again saying "waa waa I forgot my password help me."
                                    It's really annoying and pathetic. Ask anyone and they'll agree with me.
                                    You need to keep track of your own things. It's ridiculous. 
                                    I honestly don't know what you'd do without me.
                                </p>

                                {this.state.hover >= 1 ? (
                                    <p className="lecture">
                                        Since you started working out you've become like a total meathead.
                                        Forgetful, slow, careless. I'd be seriously worried if I were you. 
                                        Sheesh.
                                    </p>
                                ) : (
                                    <></>
                                )}
                                
                                <button 
                                    className="submitEmailBtn agree" onHover={this.hover} onClick={this.agree}>
                                    Agree and Acknowledge
                                </button>
                            </span>
                        ) : (
                            <></>
                        )}
                    </form>
                </div>
            </span>
        )
    }
}

export default ForgotPassword;