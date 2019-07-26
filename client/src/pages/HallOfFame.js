import React, { Component } from "react";
import workoutAPI from "../utils/workoutAPI";
import userAPI from "../utils/userAPI";
import "./HallOfFame.css";

class HallOfFame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            users: null,
            userActivity: null,
        }
    }

    componentDidMount = () => {
        let userId;
        userId = localStorage.getItem("userId");
        this.setState({
            userId: userId,
        }, () => {
            this.getAllUsers();
            this.getWorkoutsByUser(this.state.userId);
        });
    }

    getAllUsers = () => {
        userAPI.getAllUsers()
            .then((res) => {
                this.setState({
                    users: res.data,
                });
            });
    }

    getWorkoutsByUser = (userId) => {
        workoutAPI.getAllWorkoutsByUserId(userId)
            .then((res) => {
                this.setState({
                    userActivity: res.data,
                });
            });
    }

    render() {
        return (
            <div className="container pageContainer">
                {this.state.users && this.state.users.length > 0 ? (
                    this.state.users.map(user => (
                        <div 
                            key={Math.random() * 1000000}
                            className="metricsUser"
                            onClick={this.getWorkoutsByUser.bind(null, user.userId)}
                        >
                            {user.firstName} {user.lastName}
                        </div>
                    ))
                ) : (
                    <></>
                )}

                {this.state.userActivity && this.state.userActivity.length > 0 ? (
                    <div></div>
                ) : (
                    <></>
                )}
            </div>
        )
    }
}

export default HallOfFame;