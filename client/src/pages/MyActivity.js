import React, { Component } from "react";
import Run from "../components/Run/run";
import Bike from "../components/Bike/bike";
import Swim from "../components/Swim/swim";
import Lift from "../components/Lift/lift";
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
                            <Run 
                                key={run.id}
                                date={run.date}
                                distance={run.distance}
                                duration={run.duration}
                                location={run.location}
                                climb={run.climb}
                            />
                        ))
                    ) : (
                        <p>No running workouts found.</p>
                    )}
                </div>

                {/* BIKES */}
                <div className="userBikes">Bikes
                    {this.state.bikes && this.state.bikes.length ? (
                        this.state.bikes.map(bike => (
                            <Bike 
                                key={bike.id}
                                date={bike.date}
                                distance={bike.distance}
                                duration={bike.duration}
                            />
                        ))
                    ) : (
                        <p>No biking workouts found.</p>
                    )}
                </div>

                {/* SWIMS */}
                <div className="userSwims">Swims
                    {this.state.swims && this.state.swims.length ? (
                        this.state.swims.map(swim => (
                            <Swim 
                                key={swim.id}
                                date={swim.date}
                                distance={swim.distance}
                                duration={swim.duration}
                            />
                        ))
                    ) : (
                        <p>No swimming workouts found.</p>
                    )}
                </div>

                {/* LIFTS */}
                <div className="userLifts">Lifts
                    {this.state.lifts && this.state.lifts.length ? (
                        this.state.lifts.map(lift => (
                            <Lift
                                key={lift.id}
                                date={lift.date}
                                location={lift.location}
                                duration={lift.duration}
                            />
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