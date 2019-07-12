import React, { Component } from "react";
import "./profileHeader.css";

class ProfileHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            firstName: null,
            lastName: null,
            badges: null,
        }
    }

    componentDidMount = () => {

        let userId, firstName, lastName;

        if (this.props.location.state && this.props.location.state.userId !== null) {
            userId = this.props.location.state.userId;
            firstName = this.props.location.state.firstName;
            lastName = this.props.location.state.lastName;
        }
        else {
            userId = localStorage.getItem("userId");
            firstName = localStorage.getItem("fn");
            lastName = localStorage.getItem("ln");
        }

        this.setState({
            userId: userId,
            firstName: firstName,
            lastName: lastName,
        });
    }

    render() {
        return (
            <div className="jumbotron jumbotron-fluid profileHeader">
                <div className="container">
                    <h1 className="display-4">{this.state.firstName} {this.state.lastName}</h1>
                </div>
            </div>
        )
    }
}

export default ProfileHeader;