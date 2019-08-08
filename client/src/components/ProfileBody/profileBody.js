import React, { Component } from "react";
import Container from "../Container/container";
import UserActivity from "../UserActivity/userActivity";
import Metrics from "../Metrics/metrics";
import Calendar from "../Calendar/calendar";
import workoutAPI from "../../utils/workoutAPI";
// import "./profileBody.css";

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
            this.getRecentWorkouts(this.state.userId);
        });
    }

    toggleDisplay = () => {
        let opt = this.state.displayOpt;
        let userId = this.state.userId;

        if (opt === "View All") {
            opt = "View Recent";
            this.getAllWorkouts(userId);
        }
        else {
            opt = "View All";
            this.getRecentWorkouts(userId);
        }

        this.setState({
            displayOpt: opt,
        });
    }

    getRecentWorkouts = (userId) => {
        workoutAPI.getRecentWorkoutsByUserId(userId)
            .then((res) => {
                this.setState({
                    userActivity: res.data,
                });
            });
    }
    
    getAllWorkouts = (userId) => {
        workoutAPI.getAllWorkoutsByUserId(userId)
            .then((res) => {
                this.sortByDate(res.data);
            });

        // workoutAPI.getRunsByUserId(userId)
        //     .then((res) => {
        //         console.log(res);
        //     });

        // workoutAPI.getBikesByUserId(userId)
        //     .then((res) => {
        //         console.log(res);
        //     });

        // workoutAPI.getSwimsByUserId(userId)
        //     .then((res) => {
        //         console.log(res);
        //     });

        // workoutAPI.getLiftsByUserId(userId)
        //     .then((res) => {
        //         console.log(res);
        //     });
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
                    <div className="toggleDisplayBtn">
                        <button 
                        className="btn btn-dark btn-sm toggleDisplayBtn" 
                        onClick={(event) => {
                            event.preventDefault();
                            this.toggleDisplay();
                        }}>
                            {"View Recent"}
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