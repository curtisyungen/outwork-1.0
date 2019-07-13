import React, { Component } from "react";
import Container from "../components/Container/container";
import User from "../components/User/user";
import userAPI from "../utils/userAPI";
import "./FindUsers.css";

// THIS PAGE IS CURRENTLY NOT USED.
// REPLACED BY ALLUSERS.JS.

class FindUsers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userSearch: null,
            users: null,
            followedUsers: [],
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();
        this.getFollowedUsers();
    }

    getFollowedUsers = () => {
        let userId = localStorage.getItem("userId");

        userAPI.getUserById(userId)
            .then((res) => {
                let followedUsers = [];
                if (res.data[0].following !== null) {
                    followedUsers = JSON.parse(res.data[0].following);
                }
                this.setState({
                    followedUsers: followedUsers,
                });
            });
    }

    // handleInputChange = (event) => {
    //     const { name, value } = event.target;

    //     this.setState({
    //         [name]: value,
    //     });
    // }

    // searchForUser = (event) => {
    //     event.preventDefault();

    //     this.props.checkValidUser();

    //     userAPI.searchForUser(this.state.userSearch)
    //         .then((res) => {
    //             this.setState({
    //                 users: res.data,
    //             });
    //         });
    // }

    // updateUserFollowings = (subjUserId) => {
    //     let followedUsers = this.state.followedUsers;
    //     let userId = localStorage.getItem("userId");

    //     let idx = followedUsers.indexOf(subjUserId);

    //     if (idx === -1) {
    //         followedUsers.push(subjUserId);
    //     }
    //     else {
    //         followedUsers.splice(idx, 1);
    //     }
        
    //     userAPI.updateUserFollowings(userId, JSON.stringify(followedUsers))
    //         .then(() => {
    //             this.setState({
    //                 followedUsers: followedUsers,
    //             });
    //         });
    // }

    render() {
        return (
            <Container>
                <div className={`${this.props.theme} col-md-6 input-group mb-3 findUsersPage`}>
                    <input 
                        autoComplete="off"
                        name="userSearch" 
                        type="text" 
                        className="form-control" 
                        aria-describedby="basic-addon2" 
                        onChange={this.handleInputChange}
                    />
                    <div className="input-group-append">
                        <button 
                            className="btn btn-outline-secondary" 
                            type="button"
                            onClick={this.searchForUser}
                        >
                            Search
                        </button>
                    </div>
                </div>

                <div>
                    {this.state.users && this.state.users.length > 0 ? (
                        this.state.users.map(user => (
                            <User 
                                key={Math.random() * 100000}
                                userId={user.userId}
                                firstName={user.firstName}
                                lastName={user.lastName}
                                followers={user.followers}
                                // updateUserFollowings={this.updateUserFollowings}
                                loadProfile={this.props.loadProfile}
                            />
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </Container>
        )
    }
}

export default FindUsers;