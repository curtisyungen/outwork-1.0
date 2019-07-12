import React, { Component } from "react";
import ProfileHeader from "../components/ProfileHeader/profileHeader";
import ProfileBody from "../components/ProfileBody/profileBody";
import "./Profile.css";

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            firstName: null,
            lastName: null,
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();

        console.log("Profile", this.props);

        let userId, firstName, lastName;

        if (this.props.location && this.props.location.state.userId !== null) {
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
        }, () => {
            this.props.getUserActivity(userId);
        });
    }

    render() {
        return (
            <span>
                <ProfileHeader 
                    userId={this.state.userId}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                />
                <ProfileBody 
                    userId={this.state.userId}
                    allActivity={this.props.allActivity}
                    deleteActivity={this.props.deleteActivity}
                />                    
            </span>
        )
    }
}

export default Profile;