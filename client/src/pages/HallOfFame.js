import React, { Component } from "react";
import workoutAPI from "../utils/workoutAPI";
import userAPI from "../utils/userAPI";
import "./HallOfFame.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faBed, faRulerHorizontal, faMountain, faMedal, faDragon } from '@fortawesome/free-solid-svg-icons';

library.add(faTrophy, faBed, faRulerHorizontal, faMountain, faMedal, faDragon);

class HallOfFame extends Component {

    // Global data: 
    // most workouts, 
    // most rest days, 
    // longest run, 
    // greatest climb, 
    // most push-ups, 
    // most pull-ups, 
    // most Goggins workouts

    constructor(props) {
        super(props);

        this.state = {
            users: null,
            globalData: null,
        }
    }

    componentDidMount = () => {
        let globalData = [];

        for (var i = 0; i < 7; i++) {
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
            let firstName = users[u].firstName;
            workoutAPI.getAllWorkoutsByUserId(users[u].userId)
                .then((res) => {
                    this.getUserMaxes(firstName, res.data);
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

    // Sets user metric as global max if appropriate
    compareMetrics = (userData) => {

        let globalData = this.state.globalData;
        let name = userData[0];

        userData.shift();

        for (var i = 0; i < userData.length; i++) {
            if (userData[i] > globalData[i][1]) {
                globalData[i] = [name, userData[i]];
            }
        }

        this.setState({
            globalData: globalData,
        });
    }

    render() {
        return (
            <div className="container pageContainer">
                {this.state.globalData ? (
                    <span>

                        {/* MOST WORKOUTS */}
                        <div className="hofMetric">
                            <FontAwesomeIcon className="fa-3x" icon={faTrophy} />
                            <div className="hofTitle">Most Workouts</div>
                            <div className="hofName">{this.state.globalData[0][0]}</div>
                            <div className="hofValue">{this.state.globalData[0][1]}</div>
                        </div>

                        {/* MOST REST DAYS */}
                        <div className="hofMetric">
                            <FontAwesomeIcon className="fa-3x" icon={faBed} />
                            <div className="hofTitle">Most Rest Days</div>
                            <div className="hofName">{this.state.globalData[1][0]}</div>
                            <div className="hofValue">{this.state.globalData[1][1]}</div>
                        </div>

                        {/* LONGEST RUN */}
                        <div className="hofMetric">
                            <FontAwesomeIcon className="fa-3x" icon={faRulerHorizontal} />
                            <div className="hofTitle">Longest Run</div>
                            <div className="hofName">{this.state.globalData[2][0]}</div>
                            <div className="hofValue">{this.state.globalData[2][1]}</div>
                        </div>

                        {/* GREATEST CLIMB */}
                        <div className="hofMetric">
                            <FontAwesomeIcon className="fa-3x" icon={faMountain} />
                            <div className="hofTitle">Greatest Climb</div>
                            <div className="hofName">{this.state.globalData[3][0]}</div>
                            <div className="hofValue">{this.state.globalData[3][1]}</div>
                        </div>

                        {/* MOST PUSH-UPS */}
                        <div className="hofMetric">
                            <FontAwesomeIcon className="fa-3x" icon={faMedal} />
                            <div className="hofTitle">Most Push-Ups</div>
                            <div className="hofName">{this.state.globalData[4][0]}</div>
                            <div className="hofValue">{this.state.globalData[4][1]}</div>
                        </div>

                        {/* MOST PULL-UPS */}
                        <div className="hofMetric">
                            <FontAwesomeIcon className="fa-3x" icon={faMedal} />
                            <div className="hofTitle">Most Pull-Ups</div>
                            <div className="hofName">{this.state.globalData[5][0]}</div>
                            <div className="hofValue">{this.state.globalData[5][1]}</div>
                        </div>

                        {/* MOST GOGGINS WORKOUTS */}
                        <div className="hofMetric">
                            <FontAwesomeIcon className="fa-3x" icon={faDragon} />
                            <div className="hofTitle">Most Goggins Workouts</div>
                            <div className="hofName">{this.state.globalData[6][0]}</div>
                            <div className="hofValue">{this.state.globalData[6][1]}</div>
                        </div>
                    </span>
                ) : (
                        <></>
                    )}
            </div>
        )
    }
}

export default HallOfFame;