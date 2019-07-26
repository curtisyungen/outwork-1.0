import React, { Component } from "react";
import workoutAPI from "../utils/workoutAPI";
import userAPI from "../utils/userAPI";
import "./HallOfFame.css";

class HallOfFame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: null,
            maxWorkouts: [null, 0],
            mostRestDays: [null, 0],
            longestRun: [null, 0],
            maxClimb: [null, 0],
            maxPushUps: [null, 0],
            maxPullUps: [null, 0],
            maxGoggins: [null, 0],
        }
    }

    componentDidMount = () => {
        this.getAllUsers();
    }

    getAllUsers = () => {
        userAPI.getAllUsers()
            .then((res) => {
                this.setState({
                    users: res.data,
                }, () => {
                    this.getActivity();
                });
            });
    }

    getActivity = () => {
        let users = this.state.users;

        for (var u in users) {
            workoutAPI.getAllWorkoutsByUserId(users[u].userId)
            .then((res) => {
                this.getMetrics(users[u].firstName, res.data);
            });
        }
    }

    getMetrics = (userName, activity) => {

        let userWorkouts = activity.length;
        let userRestDays = 365 - userWorkouts;
        let userLongestRun = 0;
        let userClimb = 0;
        let userPushUps = 0;
        let userPullUps = 0;
        let userGoggins = 0;

        for (var a in activity) {

            if (activity[a].workoutType === "run") {
                // LONGEST RUN
                if (activity[a].distance > userLongestRun) {
                    userLongestRun = activity[a].distance;
                }

                // MAX CLIMB
                if (activity[a].climb > userClimb) {
                    userClimb = activity[a].climb;
                }
            }

            if (activity[a].workoutType === "lift") {
                // MAX PUSH-UPS
                if (activity[a].pushups > userPushUps) {
                    userPushUps = activity[a].pushups;
                }

                // MAX PULL-UPS
                if (activity[a].pullups > userPullUps) {
                    userPullUps = activity[a].pullups;
                }
            }

            // MOST GOGGINS WORKOUTS
            if (activity[a].generator === "Goggins") {
                userGoggins += 1;
            }
        }

        let maxWorkouts = this.compareMetrics(userName, this.state.maxWorkouts, userWorkouts);
        let mostRestDays = this.compareMetrics(userName, this.state.mostRestDays, userRestDays);
        let longestRun = this.compareMetrics(userName, this.state.longestRun, userLongestRun);
        let maxClimb = this.compareMetrics(userName, this.state.maxClimb, userClimb);
        let maxPushUps = this.compareMetrics(userName, this.state.maxPushUps, userPushUps);
        let maxPullUps = this.compareMetrics(userName, this.state.maxPullUps, userPullUps);
        let maxGoggins = this.compareMetrics(userName, this.state.maxGoggins, userGoggins);

        this.setState({
            maxWorkouts: maxWorkouts,
            mostRestDays: mostRestDays,
            longestRun: longestRun,
            maxClimb: maxClimb,
            maxPushUps: maxPushUps,
            maxPullUps: maxPullUps, 
            maxGoggins: maxGoggins,
        });

    }

    compareMetrics = (userName, globalMetric, userMetric) => {
        if (globalMetric[1] < userMetric) {
            return [userName, userMetric];
        }
        else {
            return globalMetric;
        }
    }


    render() {
        return (
            <div className="container pageContainer">
                <div className="hofMetric">
                    <div className="hofTitle">Most Workouts</div>
                    <div className="hofName">{this.state.maxWorkouts[0]}</div>
                    <div className="hofValue">{this.state.maxWorkouts[1]}</div>
                </div>
                
                <div className="hofMetric">
                    <div className="hofTitle">Most Rest Days</div>
                    <div className="hofName">{this.state.mostRestDays[0]}</div>
                    <div className="hofValue">{this.state.mostRestDays[1]}</div>
                </div>

                <div className="hofMetric">
                    <div className="hofTitle">Longest Run</div>
                    <div className="hofName">{this.state.longestRun[0]}</div>
                    <div className="hofValue">{this.state.longestRun[1]}</div>
                </div>

                <div className="hofMetric">
                    <div className="hofTitle">Max Climb</div>
                    <div className="hofName">{this.state.maxClimb[0]}</div>
                    <div className="hofValue">{this.state.maxClimb[1]}</div>
                </div>

                <div className="hofMetric">
                    <div className="hofTitle">Max Push-Ups</div>
                    <div className="hofName">{this.state.maxPushUps[0]}</div>
                    <div className="hofValue">{this.state.maxPushUps[1]}</div>
                </div>

                <div className="hofMetric">
                    <div className="hofTitle">Max Pull-Ups</div>
                    <div className="hofName">{this.state.maxPullUps[0]}</div>
                    <div className="hofValue">{this.state.maxPullUps[1]}</div>
                </div>

                <div className="hofMetric">
                    <div className="hofTitle">Max Goggins</div>
                    <div className="hofName">{this.state.maxGoggins[0]}</div>
                    <div className="hofValue">{this.state.maxGoggins[1]}</div>
                </div>
            </div>
        )
    }
}

export default HallOfFame;