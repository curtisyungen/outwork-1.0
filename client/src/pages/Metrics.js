import React, { Component } from "react";
import Container from "../components/Container/container";
import RunMetrics from "../components/Metrics/runMetrics";
import BikeMetrics from "../components/Metrics/bikeMetrics";
import SwimMetrics from "../components/Metrics/swimMetrics";
import LiftMetrics from "../components/Metrics/liftMetrics";
import actAPI from "../utils/actAPI";
// import "./Metrics.css";

class Metrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: null,
            userRuns: null,
            userBikes: null,
            userSwims: null,
            userLifts: null,            
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();

        let firstName = localStorage.getItem("fn");
        let userId = localStorage.getItem("userId");

        this.setState({
            firstName: firstName,
            userId: userId,
        }, () => {
            this.getUserRuns();
            this.getUserBikes();
            this.getUserSwims();
            this.getUserLifts();
        });
    }

    componentDidUpdate = () => {
        this.props.checkValidUser();
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
            <Container>
                {this.state.userRuns && this.state.userRuns.length > 0 ? (
                    <RunMetrics 
                        userRuns={this.state.userRuns}
                    />
                ) : (
                    <></>
                )}

                {this.state.userBikes && this.state.userBikes.length > 0 ? (
                    <BikeMetrics 
                        userBikes={this.state.userBikes}
                    />
                ) : (
                    <></>
                )}

                {this.state.userSwims && this.state.userSwims.length > 0 ? (
                    <SwimMetrics 
                        userSwims={this.state.userSwims}
                    />
                ) : (
                    <></>
                )}

                {this.state.userLifts && this.state.userLifts.length > 0 ? (
                    <LiftMetrics 
                        userLifts={this.state.userLifts}
                    />
                ) : (
                    <></>
                )}
            </Container>
        )
    }
}

export default Metrics;