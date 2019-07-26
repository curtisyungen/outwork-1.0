import React, { Component } from "react";
import workoutAPI from "../utils/workoutAPI";
import userAPI from "../utils/userAPI";
import "./HallOfFame.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faBed, faRulerHorizontal, faMountain, faMedal, faDragon, faClock, faFlagCheckered } from '@fortawesome/free-solid-svg-icons';

library.add(faTrophy, faBed, faRulerHorizontal, faMountain, faMedal, faDragon, faClock, faFlagCheckered);

class HallOfFame extends Component {

    // Global data: 
    // most workouts, 
    // most rest days, 
    // longest run, 
    // greatest climb, 
    // most push-ups, 
    // most pull-ups, 
    // most Goggins workouts,
    // most races,
    // most time spent,

    constructor(props) {
        super(props);

        this.state = {
            users: null,
            globalData: null,
        }
    }

    componentDidMount = () => {
        let globalData = [];

        for (var i = 0; i < 9; i++) {
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
        let userRaces = 0;
        let userTime = 0;

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

            // MOST RACES
            if (activity[a].race && activity[a].race !== "") {
                userRaces += 1;
            }

            // MOST TIME
            let time = activity[a].duration.split(":");
            let hours = parseFloat(time[0]);
            let mins = parseFloat(time[1]);
            let secs = parseFloat(time[2]);

            let totalMins = Math.round((hours * 60) + mins + (secs / 60));

            userTime += totalMins;
        }

        let userData = [
            userName, userWorkouts, userRestDays,
            userLongestRun, userClimb, userPushUps,
            userPullUps, userGoggins, userRaces, userTime,
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
            <div className="container">
                {this.state.globalData ? (
                    <div className="hallOfFame">

                        {/* MOST WORKOUTS */}
                        <div className="hofMetric">
                            <div className="hofHover">Highest number of workouts completed of any type.</div>
                            <div className="hofIcon"><FontAwesomeIcon className="fa-3x trophyIcon" icon={faTrophy} /></div>
                            <div className="hofTitle">Most Workouts</div>
                            <div className="hofName">{this.state.globalData[0][0]}</div>
                            <div className="hofValue">{this.state.globalData[0][1]}</div>
                        </div>

                        {/* MOST REST DAYS */}
                        <div className="hofMetric">
                            <div className="hofHover">Most number of rest days. Person here needs to stop cuddling with blanky, get the fuck out of bed, and quit being a lazy bitch.</div>
                            <div className="hofIcon"><FontAwesomeIcon className="fa-3x restIcon" icon={faBed} /></div>
                            <div className="hofTitle">Most Rest Days</div>
                            <div className="hofName">{this.state.globalData[1][0]}</div>
                            <div className="hofValue">{this.state.globalData[1][1]}</div>
                        </div>

                        {/* LONGEST RUN */}
                        <div className="hofMetric">
                            <div className="hofHover">Most number of miles run in one workout.</div>
                            <div className="hofIcon"><FontAwesomeIcon className="fa-3x rulerIcon" icon={faRulerHorizontal} /></div>
                            <div className="hofTitle">Longest Run</div>
                            <div className="hofName">{this.state.globalData[2][0]}</div>
                            <div className="hofValue">{this.state.globalData[2][1]}</div>
                        </div>

                        {/* GREATEST CLIMB */}
                        <div className="hofMetric">
                            <div className="hofHover">Most elevation climbed in single workout. Measured in feet.</div>
                            <div className="hofIcon"><FontAwesomeIcon className="fa-3x mountainIcon" icon={faMountain} /></div>
                            <div className="hofTitle">Greatest Climb</div>
                            <div className="hofName">{this.state.globalData[3][0]}</div>
                            <div className="hofValue">{this.state.globalData[3][1]}</div>
                        </div>

                        {/* MOST PUSH-UPS */}
                        <div className="hofMetric">
                            <div className="hofHover">Most push-ups done in a single workout.</div>
                            <div className="hofIcon"><FontAwesomeIcon className="fa-3x silverMedalIcon" icon={faMedal} /></div>
                            <div className="hofTitle">Most Push-Ups</div>
                            <div className="hofName">{this.state.globalData[4][0]}</div>
                            <div className="hofValue">{this.state.globalData[4][1]}</div>
                        </div>

                        {/* MOST PULL-UPS */}
                        <div className="hofMetric">
                            <div className="hofHover">Most pull-ups done in a single workout.</div>
                            <div className="hofIcon"><FontAwesomeIcon className="fa-3x bronzeMedalIcon" icon={faMedal} /></div>
                            <div className="hofTitle">Most Pull-Ups</div>
                            <div className="hofName">{this.state.globalData[5][0]}</div>
                            <div className="hofValue">{this.state.globalData[5][1]}</div>
                        </div>

                        {/* MOST GOGGINS WORKOUTS */}
                        <div className="hofMetric">
                            <div className="hofHover">Most Goggins workouts completed. Winner here is a total badass.</div>
                            <div className="hofIcon"><FontAwesomeIcon className="fa-3x dragonIcon" icon={faDragon} /></div>
                            <div className="hofTitle">Most Goggins</div>
                            <div className="hofName">{this.state.globalData[6][0]}</div>
                            <div className="hofValue">{this.state.globalData[6][1]}</div>
                        </div>

                        {/* MOST RACES */}
                        <div className="hofMetric">
                            <div className="hofHover">Most number of races completed.</div>
                            <div className="hofIcon"><FontAwesomeIcon className="fa-3x flagIcon" icon={faFlagCheckered} /></div>
                            <div className="hofTitle">Most Races</div>
                            <div className="hofName">{this.state.globalData[7][0]}</div>
                            <div className="hofValue">{this.state.globalData[7][1]}</div>
                        </div>

                        {/* MOST TIME */}
                        <div className="hofMetric">
                            <div className="hofHover">Most time spent working out. Measured in minutes.</div>
                            <div className="hofIcon"><FontAwesomeIcon className="fa-3x clockIcon" icon={faClock} /></div>
                            <div className="hofTitle">Most Time</div>
                            <div className="hofName">{this.state.globalData[8][0]}</div>
                            <div className="hofValue">{this.state.globalData[8][1]} mins.</div>
                        </div>
                    </div>
                ) : (
                        <></>
                    )
                }
            </div>
        )
    }
}

export default HallOfFame;