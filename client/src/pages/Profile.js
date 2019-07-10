import React, { Component } from "react";
// import Container from "../components/Container/container";
import userAPI from "../utils/userAPI";
// import "./Profile.css";

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            firstName: null,
            lastName: null,
            following: null,
            followers: null,
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();

        let userId;
        if (localStorage.getItem("userId") && localStorage.getItem("userId") !== null) {
            userId = localStorage.getItem("user");
        }

        this.setState({
            userId: userId,
        }, () => {
            this.getUser();
        });
    }

    getUser = () => {
        userAPI.getUserById(this.state.userId)
            .then((res) => {
                this.setState({
                    firstName: res.data[0].firstName,
                    lastName: res.data[0].lastName,
                    following: res.data[0].following,
                    followers: res.data[0].followers,
                });
            });
    }

    render() {
        return (
            <div className="profile">
                <div>
                    <h4>{this.state.firstName} {this.state.lastName}</h4>
                    <div>
                        <p>Following: {this.state.following ? (this.state.following.length):("")}</p>
                        <p>Followers: {this.state.followers ? (this.state.followers.length):("")}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;