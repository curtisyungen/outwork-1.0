import React, { Component } from "react";
import Modal from "react-responsive-modal";
import RunMetrics from "./runMetrics";
import BikeMetrics from "./bikeMetrics";
import SwimMetrics from "./swimMetrics";
import LiftMetrics from "./liftMetrics";
import ShoeMetrics from "./shoeMetrics";
import GeneralMetrics from "./genMetrics";
import BarChart from "../BarChart/barChart";
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
            maxPushUps: null,
            maxPullUps: null,
            restDays: null,
            rainyDays: null,
            time: null,
            races: null,
            loading: true,
            year: null,
            openBarChart: false,
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
            this.getMaxPushUps();
            this.getMaxPullUps();
        });
    }

    getScreenSize = () => {
        let width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        let flexDir = "row";
        if (width <= 768) {
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
                    rainyDays: days,
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

    getMaxPushUps = () => {
        hofAPI.getMaxPushups()
            .then((res) => {
                let results = res.data;
                let pushups = 0;
                for (var u in results) {
                    if (results[u].userId === this.state.userId) {
                        pushups = results[u].value;
                    }
                }

                this.setState({
                    maxPushUps: pushups,
                });
            });
    }

    getMaxPullUps = () => {
        hofAPI.getMaxPullups()
            .then((res) => {
                let results = res.data;
                let pullups = 0;
                for (var u in results) {
                    if (results[u].userId === this.state.userId) {
                        pullups = results[u].value;
                    }
                }

                this.setState({
                    maxPullUps: pullups,
                });
            });
    }

    getYearData = (year) => {
        this.setState({
            year: year,
        });
    }

    openBarChart = () => {
        this.setState({
            openBarChart: true,
        });
    }

    closeBarChart = () => {
        this.setState({
            openBarChart: false,
        });
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

                    {/* BAR CHART */}

                    <button className="btn btn-outline-light btn-sm barChartBtn" onClick={this.openBarChart}>
                        Chart
                    </button>

                    {this.state.openBarChart ? (
                        <Modal
                            open={this.openBarChart}
                            onClose={this.closeBarChart}
                        >
                            {this.state.year && this.state.year.length > 0 ? (
                                <BarChart
                                    data={this.state.year}
                                />
                            ) : (
                                <></>
                            )}
                        </Modal>
                    ) : (
                        <></>
                    )}

                    {/* SHOE METRICS */}

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

                            {/* RUN METRICS */}

                            {this.state.userRuns && this.state.userRuns.length > 0 ? (
                                <RunMetrics
                                    userId={this.state.userId}
                                    userRuns={this.state.userRuns}
                                    flexDir={this.state.flexDir}
                                    getYearData={this.getYearData}
                                />
                            ) : (
                                    <></>
                                )}

                            {/* BIKE METRICS */}

                            {this.state.userBikes && this.state.userBikes.length > 0 ? (
                                <BikeMetrics
                                    userId={this.state.userId}
                                    userBikes={this.state.userBikes}
                                    flexDir={this.state.flexDir}
                                />
                            ) : (
                                    <></>
                                )}

                            {/* SWIM METRICS */}

                            {this.state.userSwims && this.state.userSwims.length > 0 ? (
                                <SwimMetrics
                                    userId={this.state.userId}
                                    userSwims={this.state.userSwims}
                                    flexDir={this.state.flexDir}
                                />
                            ) : (
                                    <></>
                                )}

                            {/* LIFT METRICS */}

                            {this.state.userLifts && this.state.userLifts.length > 0 ? (
                                <LiftMetrics
                                    userId={this.state.userId}
                                    userLifts={this.state.userLifts}
                                    flexDir={this.state.flexDir}
                                    maxPushUps={this.state.maxPushUps}
                                    maxPullUps={this.state.maxPullUps}
                                />
                            ) : (
                                    <></>
                                )}

                            <GeneralMetrics
                                userId={this.state.userId}
                                flexDir={this.state.flexDir}
                                workouts={this.state.totalWorkouts}
                                time={this.state.time}
                                rainyDays={this.state.rainyDays}
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