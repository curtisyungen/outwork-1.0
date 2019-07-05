import React, { Component } from "react";
import actAPI from "../utils/actAPI";
// import "./MyActivity.css";

class MyActivity extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            runs: null,
            bikes: null,
            swims: null,
            lifts: null,
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();
        
        let userId = localStorage.getItem("userId");
        this.setState({
            userId: userId,
        }, () => {
            this.getUserActivity();
        });
    }

    getUserActivity = () => {
        actAPI.getRunsByUser(this.state.userId)
            .then((res) => {
                this.setState({
                    runs: res.data,
                });
            });

        actAPI.getBikesByUser(this.state.userId)
            .then((res) => {
                this.setState({
                    bikes: res.data,
                });
            });

        actAPI.getSwimsByUser(this.state.userId)
            .then((res) => {
                this.setState({
                    swims: res.data,
                });
            });

        actAPI.getLiftsByUser(this.state.userId)
            .then((res) => {
                this.setState({
                    lifts: res.data,
                });
            });
    }

    render() {
        return (
            <div className="myActivityPage col-lg-12">

                {/* RUNS */}
                <div className="userRuns">Runs
                    {this.state.runs && this.state.runs.length ? (
                        this.state.runs.map(run => (
                            <div>
                                {run.date}
                                {run.distance}
                                {run.duration}
                            </div>
                        ))
                    ) : (
                        <p>No running workouts found.</p>
                    )}
                </div>

                {/* BIKES */}
                <div className="userBikes">Bikes
                    {this.state.bikes && this.state.bikes.length ? (
                        this.state.bikes.map(bike => (
                            <div>
                                {bike.date}
                                {bike.distance}
                                {bike.duration}
                            </div>
                        ))
                    ) : (
                        <p>No biking workouts found.</p>
                    )}
                </div>

                {/* SWIMS */}
                <div className="userSwims">Swims
                    {this.state.swims && this.state.swims.length ? (
                        this.state.swims.map(swim => (
                            <div>
                                {swim.date}
                                {swim.distance}
                                {swim.duration}
                            </div>
                        ))
                    ) : (
                        <p>No swimming workouts found.</p>
                    )}
                </div>

                {/* LIFTS */}
                <div className="userLifts">Lifts
                    {this.state.lifts && this.state.lifts.length ? (
                        this.state.lifts.map(lift => (
                            <div>
                                {lift.date}
                                {lift.location}
                                {lift.duration}
                            </div>
                        ))
                    ) : (
                        <p>No lifting workouts found.</p>
                    )}
                </div>
            </div>
        )
    }
}

export default MyActivity;