import React, { Component } from "react";
import Container from "../Container/container";
import UserActivity from "../UserActivity/userActivity";
import workoutAPI from "../../utils/workoutAPI";
import "./profileBody.css";

class ProfileBody extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userActivity: null,
            message: null,
            displayOpt: "View All",
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            userActivity: this.props.userActivity,
        }, () => {
            this.getRecentWorkouts();
        });
    }

    getRecentWorkouts = () => {
        let userId = this.props.userId;
        workoutAPI.getRecentWorkoutsByUserId(userId)
            .then((res) => {
                this.setState({
                    userActivity: res.data,
                });
            });
    }
    
    getAllWorkouts = () => {
        let userId = this.props.userId;
        workoutAPI.getAllWorkoutsByUserId(userId)
            .then((res) => {
                this.sortByDate(res.data);
            });
    }

    getRuns = () => {
        let userId = this.props.userId;
        workoutAPI.getRunsByUserId(userId)
            .then((res) => {
                this.setState({
                    userActivity: res.data,
                });
            });
    }

    getBikes = () => {
        let userId = this.props.userId;
        workoutAPI.getBikesByUserId(userId)
            .then((res) => {
                this.setState({
                    userActivity: res.data,
                });
            });
    }

    getSwims = () => {
        let userId = this.props.userId;
        workoutAPI.getSwimsByUserId(userId)
            .then((res) => {
                this.setState({
                    userActivity: res.data,
                });
            });
    }

    getLifts = () => {
        let userId = this.props.userId;
        workoutAPI.getLiftsByUserId(userId)
            .then((res) => {
                this.setState({
                    userActivity: res.data,
                });
            });
    }
    
    sortByDate = (userActivity) => {
        userActivity.sort(this.compare);

        this.setState({
            userActivity: userActivity,
            message: "No activity found.",
        });
    }

    compare = (a, b) => {
        if (a.date === b.date) {
            return 0;
        }
        else {
            return (a.date > b.date) ? -1 : 1;
        }
    }

    render() {
        return (
            <Container>
                <div className="myActivity">
                    <h4>User Activity</h4>
                    <div className="profileFilterBtns mb-1">
                        <button
                            className="btn btn-light btn-sm profileFilterBtn"
                            onClick={this.getAllWorkouts}
                        >
                            All
                        </button>
                        <button 
                            className="btn btn-light btn-sm toggleDisplayBtn" 
                            onClick={(event) => {
                                event.preventDefault();
                                this.getRecentWorkouts();
                            }}>
                            Recent
                        </button>
                        <button
                            className="btn btn-light btn-sm profileFilterBtn"
                            onClick={this.getRuns}
                        >
                            Runs
                        </button>
                        <button
                            className="btn btn-light btn-sm profileFilterBtn"
                            onClick={this.getBikes}
                        >
                            Bikes
                        </button>
                        <button
                            className="btn btn-light btn-sm profileFilterBtn"
                            onClick={this.getSwims}
                        >
                            Swims
                        </button>
                        <button
                            className="btn btn-light btn-sm profileFilterBtn"
                            onClick={this.getLifts}
                        >
                            Lifts
                        </button>
                    </div>
                    {this.state.userActivity && this.state.userActivity.length > 0 ? (
                        this.state.userActivity.map(act => (
                            <UserActivity
                                key={Math.random() * 100000}
                                activity={act}
                                deleteActivity={this.props.deleteActivity}
                            />
                        ))
                    ) : (
                        <p className="text-center">{this.state.message}</p>
                    )}
                </div>
            </Container>
        )
    }
}

export default ProfileBody;