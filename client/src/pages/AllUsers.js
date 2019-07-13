import React, { Component } from "react";
import Container from "../components/Container/container";
import User from "../components/User/user";
import userAPI from "../utils/userAPI";
import "./AllUsers.css";

class AllUsers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: null,
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();

        userAPI.getAllUsers()
            .then((res) => {
                this.setState({
                    users: res.data,
                });
            });
    }

    render() {
        return (
            <Container>
                {this.state.users !== null ? (
                    <div className={`allUsersPage ${this.props.background}`}>
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
                ) : (
                    <p>Loading users...</p>
                )}
            </Container>
        )
    }
}

export default AllUsers;