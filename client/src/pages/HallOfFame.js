import React, { Component } from "react";
import workoutAPI from "../utils/workoutAPI";
import userAPI from "../utils/userAPI";
import "./HallOfFame.css";

class HallOfFame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: null,
            globalData: null,
        }
    }

    componentDidMount = () => {
        let globalData = [];

        for (var i=0; i < 7; i++) {
            globalData.push([null, 0]);
        }

        this.setState({
            globalData: globalData,
        }, () => {
            this.getAllUsers();
        });
    }

    // Get all users from database
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

    // Get activity for each user
    // Loop to get maximums for each user
    getActivity = () => {
        let users = this.state.users;

        for (var u in users) {
            workoutAPI.getAllWorkoutsByUserId(users[u].userId)
                .then((res) => {
                    this.getUserMaxes(users[u].firstName, res.data);
                });
        }
    }

    // Calculate maximums for each user
    // Determine if it's maximum of all users
    getUserMaxes = (userName, activity) => {

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

        let userData = [
            userName, userWorkouts, userRestDays, 
            userLongestRun, userClimb, userPushUps, 
            userPullUps, userGoggins
        ];

        this.compareMetrics(userData);
    }

    compareMetrics = (userData) => {

        let globalData = this.state.globalData;
        let name = userData[0];

        for (var i=1; i<userData.length; i++) {
            if (userData[i] > globalData[i][1]) {
                globalData[i] === [name, userData[i]];
            }
        }

        this.setState({
            globalData: globalData,
        });
    }

    render() {
        return (
            <div className="container pageContainer">

            </div>
        )
    }
}

export default HallOfFame;