import React, { Component } from "react";
import Run from "../components/Run/run";
import Bike from "../components/Bike/bike";
import Swim from "../components/Swim/swim";
import Lift from "../components/Lift/lift";
import actAPI from "../utils/actAPI";
import "./MyActivity.css";

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

    deleteActivity = (type, id) => {

        let userId = this.state.userId;

        if (type === "run") {
            actAPI.deleteRunById(id, userId);
        }
        else if (type === "bike") {
            actAPI.deleteBikeById(id, userId);
        }
        else if (type === "swim") {
            actAPI.deleteSwimById(id, userId);
        }
        else if (type === "lift") {
            actAPI.deleteLiftById(id, userId);
        }

        window.location.reload();
    }

    render() {
        return (
            <div className="myActivityPage col-md-12">

                {/* RUNS */}
                {this.state.runs && this.state.runs.length ? (
                    this.state.runs.map(run => (
                        <Run
                            key={run.id}
                            id={run.id}
                            date={run.date}
                            distance={run.distance}
                            duration={run.duration}
                            location={run.location}
                            climb={run.climb}
                            deleteActivity={this.deleteActivity}
                        />
                    ))
                ) : (
                        <></>
                    )}

                {/* BIKES */}
                {this.state.bikes && this.state.bikes.length ? (
                    this.state.bikes.map(bike => (
                        <Bike
                            key={bike.id}
                            id={bike.id}
                            date={bike.date}
                            distance={bike.distance}
                            duration={bike.duration}
                            deleteActivity={this.deleteActivity}
                        />
                    ))
                ) : (
                        <></>
                    )}

                {/* SWIMS */}
                {this.state.swims && this.state.swims.length ? (
                    this.state.swims.map(swim => (
                        <Swim
                            key={swim.id}
                            id={swim.id}
                            date={swim.date}
                            distance={swim.distance}
                            duration={swim.duration}
                            deleteActivity={this.deleteActivity}
                        />
                    ))
                ) : (
                        <></>
                    )}

                {/* LIFTS */}
                {this.state.lifts && this.state.lifts.length ? (
                    this.state.lifts.map(lift => (
                        <Lift
                            key={lift.id}
                            id={lift.id}
                            userId={lift.userId}
                            date={lift.date}
                            duration={lift.duration}
                            generator={lift.generator}
                            location={lift.location}
                            muscleGroups={lift.muscleGroups}
                            notes={lift.notes}
                            pullups={lift.pullups}
                            pushups={lift.pushups}
                            workout={lift.workout}
                            deleteActivity={this.deleteActivity}
                        />
                    ))
                ) : (
                        <></>
                    )}
            </div>
        )
    }
}

export default MyActivity;