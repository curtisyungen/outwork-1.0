import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import userAPI from "../../utils/userAPI";
import "./user.css";

// Current user = user who is conducting the search for other users
// Subject user = user who appears in search results

class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subjUserId: null,
            followers: [],
            isFollowed: false,
            redirect: false,
        }
    }

    componentDidMount = () => {
        let followers = [];
        if (this.props.followers !== null) {
            followers = JSON.parse(this.props.followers);
        }
        
        this.setState({
            subjUserId: this.props.userId,
            followers: followers,
        }, () => {
            this.getFollowedStatus();
        });
    }

    getFollowedStatus = () => {
        let followers = this.state.followers;
        let userId = localStorage.getItem("userId");
        let isFollowed = false;

        for (var f in followers) {
            if (followers[f] === userId) {
                isFollowed = true;
            }
        }

        this.setState({
            isFollowed: isFollowed,
        });
    }

    toggleFollow = (event) => {
        event.preventDefault();

        // Add subject user to list of users being followed by current user
        this.props.updateUserFollowings(this.props.userId);

        // Add current user to list of followers of subject user
        this.updateUserFollowers();

        this.getFollowedStatus();
    }

    // Add current user to list of followers of subject user
    updateUserFollowers = () => {
        let followers = this.state.followers;
        let userId = localStorage.getItem("userId");

        let idx = followers.indexOf(userId);
        if (idx === -1) {
            followers.push(userId);
        }
        else {
            followers.splice(idx, 1);
        }

        userAPI.updateUserFollowers(this.state.subjUserId, JSON.stringify(followers))
            .then(() => {
                // this.setState({
                //     followers: followers,
                // });
            });        
    }

    viewProfile = () => {
        this.setState({
            redirect: true,
        }, () => {
            console.log("User Props", this.props);
        });
    }

    render() {
        return (
            <span>
                {this.props.userId !== localStorage.getItem("userId") ? (
                    <div 
                        className="user"
                        onClick={this.viewProfile}
                    >
                        <div>{this.props.firstName} {this.props.lastName}</div>
                    </div>
                ) : (
                    <></>
                )}

                {this.state.redirect ? (
                    <Redirect 
                        to={{
                            pathname: "/profile/" + this.props.userId,
                            params: {
                                userId: this.props.userId,
                                firstName: this.props.firstName,
                                lastName: this.props.lastName,
                            }
                        }}
                    />
                ) : (
                    <></>
                )}

            </span>
        )
    }
}

export default User;