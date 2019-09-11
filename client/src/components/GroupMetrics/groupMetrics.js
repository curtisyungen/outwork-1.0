import React, { Component } from "react";
import workoutAPI from "../../utils/workoutAPI";
import userAPI from "../../utils/userAPI";
import "./groupMetrics.css";

import moment from "moment";

moment.locale('zh-cn', {
    week: {
        dow : "Sunday" // Sunday is the first day of the week
    }
});

class GroupMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            groupMetrics: [],
            users: null,
        }
    }

    componentDidMount = () => {
        this.getUsers();
    }

    getUsers = () => {
        userAPI.getAllUsers()
            .then((res) => {

                // Remove guest from user list
                let users = res.data;
                let idx = -1;
                for (var u in users) {
                    if (users[u].userId === "834292GU") {
                        idx = u;
                    }
                }

                users.splice(idx, 1);

                this.setState({
                    users: users,
                }, () => {
                    for (var u in users) {
                        this.getMetrics(users[u].userId, users[u].firstName);
                    }
                });
            });
    }

    getMetrics = (userId, firstName) => {
        let groupMetrics = this.state.groupMetrics;

        let userMetrics = {};

        workoutAPI.getAllWorkoutsByUserId(userId)
            .then((res) => {
                let workouts = res.data;
                let pushups = 0, pullups = 0, climb = 0;
                let miles = 0, currWkMiles = 0;
                let today = new Date();
                let week = moment(this.props.firstDOW).week();

                for (var w in workouts) {

                    // Get miles run, climb, current week miles
                    if (workouts[w].workoutType === "run") {
                        if (workouts[w].distance) {
                            miles += parseFloat(workouts[w].distance);
                        }
                        
                        if (workouts[w].climb) {
                            climb += parseFloat(workouts[w].climb);
                        }

                        if (moment(workouts[w].date).week() === week) {
                            currWkMiles += workouts[w].distance;
                        }
                    }

                    // Get pushups
                    if (workouts[w].pushups !== null) {
                        pushups += parseFloat(workouts[w].pushups);
                    }

                    // Get pullups
                    if (workouts[w].pullups !== null) {
                        pullups += parseFloat(workouts[w].pullups);
                    }
                }

                // Get current week metrics for Champ of Week 
                let weekWorkouts = this.props.weekWorkouts;
                let weekTime = this.props.weekTime;
                let weekUniqueWorkouts = this.props.weekUniqueWorkouts;

                let currWkWrkts = 0;
                let currWkTime = 0;
                let currWkUniqueWrkts = 0;
                for (w in weekWorkouts) {
                    if (weekWorkouts[w].firstName === firstName) {
                        currWkWrkts = weekWorkouts[w].value;
                    }
                }

                for (w in weekTime) {
                    if (weekTime[w].firstName === firstName) {
                        currWkTime = weekTime[w].value;
                    }
                }

                for (w in weekUniqueWorkouts) {
                    if (weekUniqueWorkouts[w].firstName === firstName) {
                        currWkUniqueWrkts = weekUniqueWorkouts[w].value;
                    }
                }

                userMetrics.firstName = firstName;
                userMetrics.workouts = workouts.length;
                userMetrics.currWkMiles = Math.round(currWkMiles * 100) / 100;
                userMetrics.totalMilesRun = Math.round(miles * 100) / 100;
                userMetrics.distClimbed = climb;
                userMetrics.pushups = pushups;
                userMetrics.pullups = pullups;
                userMetrics.currWkWrkts = currWkWrkts;
                userMetrics.currWkTime = currWkTime;
                userMetrics.currWkUniqueWrkts = currWkUniqueWrkts;

                groupMetrics.push(userMetrics);

                this.setState({
                    groupMetrics: groupMetrics,
                });
            });
    }

    render() {
        return (
            <span>
                <h4>Quick Stats</h4>
                {this.state.groupMetrics && this.state.groupMetrics.length > 0 ? (
                    <div className="groupMetrics">
                        <div className="gm-row gm-label">
                            <div className="gm-col">
                                <div className="gm-cell">User Name</div>
                                <div className="gm-cell">Total Workouts</div>
                                <div className="gm-cell">Current Week's Miles</div>
                                <div className="gm-cell">Total Miles Run</div>
                                <div className="gm-cell">Distance Climbed (ft.)</div>
                                <div className="gm-cell">Push-Ups</div>
                                <div className="gm-cell">Pull-Ups</div>
                            </div>
                        </div>

                        {this.state.groupMetrics.map(indiv => (
                            <div key={indiv.firstName} className="gm-row">
                                <div className="gm-col">
                                    <div className="gm-cell">{indiv.firstName}</div>
                                    <div className="gm-cell">{indiv.workouts}</div>
                                    <div className="gm-cell">{indiv.currWkMiles}</div>
                                    <div className="gm-cell">{indiv.totalMilesRun}</div>
                                    <div className="gm-cell">{indiv.distClimbed}</div>
                                    <div className="gm-cell">{indiv.pushups}</div>
                                    <div className="gm-cell">{indiv.pullups}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading stats...</p>
                )}

            <h4>Weekly Champ</h4>
                <div className="firstDOW">First day of week: {this.props.firstDOW}</div>
                {this.state.groupMetrics && this.state.groupMetrics.length > 0 ? (
                    <div className="groupMetrics">
                        <div className="gm-row gm-label">
                            <div className="gm-col">
                                <div className="gm-cell">User Name</div>
                                <div className="gm-cell currWeek">Curr. Wk. Workouts</div>
                                <div className="gm-cell currWeek">Curr. Wk. Time (min.)</div>
                                <div className="gm-cell currWeek">Curr. Wk. Days Worked Out</div>
                            </div>
                        </div>

                        {this.state.groupMetrics.map(indiv => (
                            <div key={indiv.firstName} className="gm-row">
                                <div className="gm-col">
                                    <div className="gm-cell">{indiv.firstName}</div>
                                    <div className="gm-cell currWeek">{indiv.currWkWrkts}</div>
                                    <div className="gm-cell currWeek">{indiv.currWkTime.toFixed(2)}</div>
                                    <div className="gm-cell currWeek">{indiv.currWkUniqueWrkts}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading stats...</p>
                )}
            </span>
        )
    }
}

export default GroupMetrics;
