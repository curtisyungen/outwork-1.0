import React, { Component } from "react";
import ProfileHeader from "../components/ProfileHeader/profileHeader";
import ProfileBody from "../components/ProfileBody/profileBody";
import "./Profile.css";

class Profile extends Component {

    componentDidMount = () => {
        this.props.checkValidUser();
    
        let userId;
        userId = localStorage.getItem("userId");

        this.props.getUserActivity(userId);
    }

    render() {
        return (
            <span>
                <ProfileHeader />
                <ProfileBody 
                    allActivity={this.props.allActivity}
                    deleteActivity={this.props.deleteActivity}
                />                    
            </span>
        )
    }
}

export default Profile;