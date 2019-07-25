import React, { Component } from "react";
import RunMetrics from "./runMetrics";
import BikeMetrics from "./bikeMetrics";
import SwimMetrics from "./swimMetrics";
import LiftMetrics from "./liftMetrics";
import ShoeMetrics from "./shoeMetrics";
import workoutAPI from "../../utils/workoutAPI";
// import "./Metrics.css";

class Metrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            screenWidth: null,
            flexDir: null,
            userRuns: null,
            userBikes: null,
            userSwims: null,
            userLifts: null,
        }
    }

    componentDidMount = () => {
        let firstName = localStorage.getItem("fn");
        let userId = localStorage.getItem("userId");

        window.addEventListener("resize", this.getScreenSize.bind(this));

        this.setState({
            firstName: firstName,
            userId: userId,
        }, () => {
            this.getScreenSize();
            this.getUserActivity();
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

        this.setState({
            userRuns: runs,
            userBikes: bikes,
            userSwims: swims,
            userLifts: lifts,
        });
    }

    render() {
        return (
            <div>
                {this.state.userActivity === null ? (
                    <p>No activity found. What a loser!</p>
                ) : (
                        <></>
                    )}


                <ShoeMetrics
                    userId={this.state.userId}
                    userRuns={this.state.userRuns}
                    flexDir={this.state.flexDir}
                />

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
            </div>
        )
    }
}

export default Metrics;