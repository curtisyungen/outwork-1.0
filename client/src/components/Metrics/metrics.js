import React, { Component } from "react";
import RunMetrics from "./runMetrics";
import BikeMetrics from "./bikeMetrics";
import SwimMetrics from "./swimMetrics";
import LiftMetrics from "./liftMetrics";
import ShoeMetrics from "./shoeMetrics";
import GeneralMetrics from "./genMetrics";
import workoutAPI from "../../utils/workoutAPI";
import hofAPI from "../../utils/hofAPI";
// import "./Metrics.css";

import moment from "moment";

class Metrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            screenWidth: null,
            firstName: null,
            flexDir: null,
            userRuns: null,
            userBikes: null,
            userSwims: null,
            userLifts: null,
            loading: true,
        }
    }

    componentDidMount = () => {
        window.addEventListener("resize", this.getScreenSize.bind(this));

        this.setState({
            firstName: this.props.firstName,
            userId: this.props.userId,
        }, () => {
            this.getScreenSize();
            this.getUserActivity();
            this.getRestDays();
            this.getTotalTime();
            this.getRainyDays();
            this.getTotalRaces();
        });
    }

    getScreenSize = () => {
        let width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        let flexDir = "row";
        if (width <= 520) {
            flexDir = "column";
        }

        this.setState({
            screenWidth: width,
            flexDir: flexDir,
        });
    }

    getUserActivity = () => {
        workoutAPI.getAllWorkoutsByUserId(this.props.userId)
            .then((res) => {
                this.setState({
                    userActivity: res.data,
                }, () => {
                    this.categorizeActivities();
                });
            });
    }

    categorizeActivities = () => {
        let userActivity = this.state.userActivity;
        let runs = [];
        let bikes = [];
        let swims = [];
        let lifts = [];

        for (var a in userActivity) {
            if (userActivity[a].workoutType === "run") {
                runs.push(userActivity[a]);
            }
            else if (userActivity[a].workoutType === "bike") {
                bikes.push(userActivity[a]);
            }
            else if (userActivity[a].workoutType === "swim") {
                swims.push(userActivity[a]);
            }
            else if (userActivity[a].workoutType === "lift") {
                lifts.push(userActivity[a]);
            }
        }

        let workouts = 0;
        if (userActivity) {
            workouts = userActivity.length;
        }

        this.setState({
            userRuns: runs,
            userBikes: bikes,
            userSwims: swims,
            userLifts: lifts,
            loading: false,
            totalWorkouts: workouts,
        });
    }

    getRestDays = () => {
        hofAPI.getMaxRestDays()
            .then((res) => {
                console.log(res);
                let workDays = 0;
                for (var d in res.data) {
                    if (res.data[d].firstName === this.state.firstName) {
                        workDays = res.data[d].value;
                    }
                }

                let dateNum = moment().dayOfYear();
                let restDays = dateNum - workDays;

                this.setState({
                    restDays: restDays,
                });
            });
    }

    getRainyDays = () => {
        hofAPI.getRainyDays() 
            .then((res) => {
                let days = 0;
                for (var d in res.data) {
                    if (res.data[d].firstName === this.state.firstName) {
                        days = res.data[d].value;
                    }
                }

                this.setState({
                    days: days,
                });
            });
    }

    getTotalTime = () => {
        hofAPI.getTotalTime()
            .then((res) => {

                let time = 0;
                for (var t in res.data) {
                    if (res.data[t].firstName === this.state.firstName) {
                        time = Math.round(res.data[t].value * 100) / 100;
                    }
                }

                this.setState({
                    time: time,
                });
            })
    }

    getTotalRaces = () => {
        hofAPI.getMaxRaces()
            .then((res) => {
                let races = 0;
                for (var r in res.data) {
                    if (res.data[r].firstName === this.state.firstName) {
                        races = res.data[r].value;
                    }
                }

                this.setState({
                    races: races,
                });
            })
    }

    render() {
        return (
            <div>
                <div className="metricsTitleBlock">
                    <h4 className="userTotalsTitle">User Totals</h4>
                    {this.state.userActivity === null ? (
                        <p>No activity found. What a loser!</p>
                    ) : (
                            <></>
                        )}
                    {this.state.userRuns && (this.props.userId === localStorage.getItem("userId")) ? (
                        <ShoeMetrics
                            userId={this.state.userId}
                            userRuns={this.state.userRuns}
                            flexDir={this.state.flexDir}
                        />
                    ) : (
                            <></>
                        )}
                </div>

                {this.state.loading ? (
                    <p className="text-center">Loading metrics...</p>
                ) : (
                    <span>

                {this.state.userRuns && this.state.userRuns.length > 0 ? (
                    <RunMetrics
                        userId={this.state.userId}
                        userRuns={this.state.userRuns}
                        flexDir={this.state.flexDir}
                    />
                ) : (
                        <></>
                    )}

                {this.state.userBikes && this.state.userBikes.length > 0 ? (
                    <BikeMetrics
                        userId={this.state.userId}
                        userBikes={this.state.userBikes}
                        flexDir={this.state.flexDir}
                    />
                ) : (
                        <></>
                    )}

                {this.state.userSwims && this.state.userSwims.length > 0 ? (
                    <SwimMetrics
                        userId={this.state.userId}
                        userSwims={this.state.userSwims}
                        flexDir={this.state.flexDir}
                    />
                ) : (
                        <></>
                    )}

                {this.state.userLifts && this.state.userLifts.length > 0 ? (
                    <LiftMetrics
                        userId={this.state.userId}
                        userLifts={this.state.userLifts}
                        flexDir={this.state.flexDir}
                    />
                ) : (
                        <></>
                    )}

                <GeneralMetrics 
                    userId={this.state.userId}
                    flexDir={this.state.flexDir}
                    workouts={this.state.totalWorkouts}
                    time={this.state.time}
                    rainyDays={this.state.days}
                    races={this.state.races}
                    restDays={this.state.restDays}
                />
                </span>
                )}
            </div>
        )
    }
}

export default Metrics;