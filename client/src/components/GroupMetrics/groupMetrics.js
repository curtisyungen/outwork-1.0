import React, { Component } from "react";
import hofAPI from "../../utils/hofAPI";
import workoutAPI from "../../utils/workoutAPI";
import userAPI from "../../utils/userAPI";
import "./groupMetrics.css";

class GroupMetrics extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            groupMetrics: [],
            users: null,
            workouts: null,
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
                    this.getMetrics();
                });
            })
    }

    getMetrics = () => {
        let users = this.state.users;

        for (var u in users) {
            this.getWorkouts(users[u].userId);
        }
    }

    getWorkouts = (userId) => {
        workoutAPI.getAllWorkoutsByUserId(userId)
            .then((res) => {
                this.setState({
                    workouts: res.data,
                }, () => {
                    this.analyzeWorkouts(userId);
                });
            });
    }

    analyzeWorkouts = (userId) => {
        let user = {
            name: null,
            workouts: 0,
            currWkMiles: 0,
            avgMiles: 0,
            maxMiles: 0,
            avgDist: 0,
            longestRun: 0,
            avgPace: 0,
            totalMiles: 0,
            distClimb: 0,
            pushUps: 0,
            pullUps: 0,
        }

        let users = this.state.users;

        for (var u in users) {
            if (users[u].userId === userId) {
                user.name = users[u].firstName;
            }
        }

        let workouts = this.state.workouts;

        for (var w in workouts) {
            if (workouts[w].userId === userId) {
                user.workouts += 1;

                if (workouts[w].workoutType === "run") {
                    user.totalMiles += parseFloat(workouts[w].distance);
                    user.distClimb += parseFloat(workouts[w].climb);

                    if (workouts[w].distance > user.longestRun) {
                        user.longestRun = parseFloat(workouts[w].distance);
                    }
                }

            }
        }

        let groupMetrics = this.state.groupMetrics;
        groupMetrics.push(user);

        this.setState({
            groupMetrics: groupMetrics,
        });
    }

    render() {
        return (
            <div className="groupMetrics">
                <div className="gm-row">
                    <div className="gm-col">
                        <div className="gm-cell">User Name</div>
                        <div className="gm-cell">Total Workouts</div>
                        <div className="gm-cell">Current Week's Miles</div>
                        <div className="gm-cell">Avg. Miles / Week</div>
                        <div className="gm-cell">Max. Miles / Week</div>
                        <div className="gm-cell">Avg. Distance Run (mi.)</div>
                        <div className="gm-cell">Longest Run (mi.)</div>
                        <div className="gm-cell">Avg. Mile Pace</div>
                        <div className="gm-cell">Total Miles Run</div>
                        <div className="gm-cell">Distance Climbed (ft.)</div>
                        <div className="gm-cell">Push-Ups</div>
                        <div className="gm-cell">Pull-Ups</div>
                    </div>
                </div>

                {this.state.groupMetrics && this.state.groupMetrics.length > 0 ? (
                    this.state.groupMetrics.map(indiv => (
                        <div key={indiv.name} className="gm-row">
                            <div className="gm-col">
                                <div className="gm-cell">{indiv.name}</div>
                                <div className="gm-cell">{indiv.workouts}</div>
                                <div className="gm-cell">{indiv.currWkMiles}</div>
                                <div className="gm-cell">{indiv.avgMiles}</div>
                                <div className="gm-cell">{indiv.maxMiles}</div>
                                <div className="gm-cell">{indiv.avgDist}</div>
                                <div className="gm-cell">{indiv.longestRun}</div>
                                <div className="gm-cell">{indiv.avgPace}</div>
                                <div className="gm-cell">{indiv.totalMiles}</div>
                                <div className="gm-cell">{indiv.distClimb}</div>
                                <div className="gm-cell">{indiv.pushUps}</div>
                                <div className="gm-cell">{indiv.pullUps}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <></>
                )}

            </div>
        )
    }
}

export default GroupMetrics;