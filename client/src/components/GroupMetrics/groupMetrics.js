import React, { Component } from "react";
import workoutAPI from "../../utils/workoutAPI";
import userAPI from "../../utils/userAPI";
import "./groupMetrics.css";

import moment from "moment";

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
                this.setState({
                    users: res.data,
                }, () => {
                    let users = res.data;
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
                let week = moment(today).getWeek();

                for (var w in workouts) {

                    // Get miles run, climb, current week miles
                    if (workouts[w].workoutType === "run") {
                        miles += parseFloat(workouts[w].distance);
                        climb += parseFloat(workouts[w].climb);

                        if (moment(workouts[w].date).getWeek() === week) {
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

                userMetrics.firstName = firstName;
                userMetrics.workouts = workouts.length;
                userMetrics.currWkMiles = currWkMiles;
                userMetrics.totalMilesRun = miles;
                userMetrics.distClimbed = climb;
                userMetrics.pushups = pushups;
                userMetrics.pullups = pullups;

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
                        <div className="gm-row">
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
                            <div key={indiv.name} className="gm-row">
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
            </span>
        )
    }
}

export default GroupMetrics;