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

                // Remove guest user from results
                let users = res.data;
                let idx = -1;
                for (var u in users) {
                    if (users[u].firstName === guest) {
                        console.log(users[u]);
                        idx = u;
                    }
                }

                users.splice(idx, 1);

                this.setState({
                    users: users,
                });
            });
    }

    render() {
        return (
            <Container>
                {this.state.users !== null ? (
                    <div className={`allUsersPage`}>
                        {this.state.users && this.state.users.length > 0 ? (
                            this.state.users.map(user => (
                                <User 
                                    key={user.userId}
                                    userId={user.userId}
                                    firstName={user.firstName}
                                    lastName={user.lastName}
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