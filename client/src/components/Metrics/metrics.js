import React, { Component } from "react";
import Container from "../Container/container";
import RunMetrics from "./runMetrics";
import BikeMetrics from "./bikeMetrics";
import SwimMetrics from "./swimMetrics";
import LiftMetrics from "./liftMetrics";
import actAPI from "../../utils/actAPI";
// import "./Metrics.css";

class Metrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            screenWidth: null,
            screenHeight: null,
            flexDir: null,
            userId: null,
            firstName: null,
            userRuns: null,
            userBikes: null,
            userSwims: null,
            userLifts: null,            
        }
    }

    componentDidMount = () => {
        // this.props.checkValidUser();

        let firstName = localStorage.getItem("fn");
        let userId = localStorage.getItem("userId");

        this.setState({
            firstName: firstName,
            userId: userId,
        }, () => {
            this.getScreenSize();
            this.getUserRuns();
            this.getUserBikes();
            this.getUserSwims();
            this.getUserLifts();
        });
    }

    componentDidUpdate = () => {
        // this.props.checkValidUser();
    }

    getScreenSize = () => {
        let width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        let height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        let flexDir = "row";
        if (width <= 420) {
            flexDir = "column";
        }

        this.setState({
            screenWidth: width,
            screenHeight: height,
            flexDir: flexDir,
        }, () => {
            console.log(flexDir, width, height);
        });
    }

    getUserRuns = () => {
        actAPI.getRunsByUser(this.state.userId)
            .then((res) => {
                this.setState({
                    userRuns: res.data,
                });
            });
    }

    getUserBikes = () => {
        actAPI.getBikesByUser(this.state.userId)
            .then((res) => {
                this.setState({
                    userBikes: res.data,
                });
            });
    }

    getUserSwims = () => {
        actAPI.getSwimsByUser(this.state.userId)
            .then((res) => {
                this.setState({
                    userSwims: res.data,
                });
            });
    }

    getUserLifts = () => {
        actAPI.getLiftsByUser(this.state.userId)
            .then((res) => {
                this.setState({
                    userLifts: res.data,
                });
            });
    }

    render() {
        return (
            <div className="col-md-12">
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
                    />
                ) : (
                    <></>
                )}

                {this.state.userSwims && this.state.userSwims.length > 0 ? (
                    <SwimMetrics 
                        userId={this.state.userId}
                        userSwims={this.state.userSwims}
                    />
                ) : (
                    <></>
                )}

                {this.state.userLifts && this.state.userLifts.length > 0 ? (
                    <LiftMetrics 
                        userId={this.state.userId}
                        userLifts={this.state.userLifts}
                    />
                ) : (
                    <></>
                )}
            </div>
        )
    }
}

export default Metrics;