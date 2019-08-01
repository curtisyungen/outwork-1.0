import React, { Component } from "react";
import userAPI from "../utils/userAPI";
import "./Reset.css";

class Reset extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            resetCode: "",
        }
    }

    componentDidMount = () => {
        this.setState({
            email: this.props.email,
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    submitResetCode = (event) => {
        event.preventDefault();

        let email = this.state.email;
        userAPI.submitResetCode(email, this.state.resetCode)
            .then((res) => {                
                if (res.data.length > 0) {
                    userAPI.clearResetCode(email);

                    this.props.setRedirectToCreatePassword();
                }
                else {
                    alert("Incorrect code.");
                }
            });
    }

    render() {
        return (
            <span className="resetPage">
                <div className="reset">
                    <div className="logo">
                        <a href="/">
                            <img className="loginLogo" src={require('../images/logo2.png')} alt="congo" />
                        </a>
                    </div>
                    <form>
                        <h4 className="resetFormHeader">WE DON'T TRUST YOU</h4>
                        <p className="formSubHeader">{`Alright genius. Check your stupid email and enter the six-digit code you got from us in the box below. Try not to mess THIS up too.`}</p>
                        <p className="formLabel">Enter OTP</p>
                        <input
                            autoFocus
                            className="formInput fp-wide"
                            name="resetCode"
                            value={this.state.resetCode}
                            onChange={this.handleInputChange}
                        />

                        <button
                            className="submitEmailBtn"
                            onClick={this.submitResetCode}
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </span>
        )
    }
}

export default Reset;