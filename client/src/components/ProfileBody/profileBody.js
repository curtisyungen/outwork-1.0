import React, { Component } from "react";
import Container from "../Container/container";
import Run from "../Run/run";
import Bike from "../Bike/bike";
import Swim from "../Swim/swim";
import Lift from "../Lift/lift";
import Metrics from "../Metrics/metrics";
import actAPI from "../../utils/actAPI";
// import "./profileBody.css";

class ProfileBody extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
        }
    }

    componentDidMount = () => {
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

        let userId = this.props.userId;

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
            <Container>

                <Metrics />

                <div className="col-md-12 myActivity">

                    <h4>User Activity</h4>

                    {/* RUNS */}
                    {this.state.runs && this.state.runs.length ? (
                        this.state.runs.map(run => (
                            <Run
                                key={run.id}
                                id={run.id}
                                userId={run.userId}
                                firstName={run.firstName}
                                lastName={run.lastName}
                                date={run.date}
                                distance={run.distance}
                                duration={run.duration}
                                milePace={run.milePace}
                                type={run.type}
                                repeats={run.repeats}
                                race={run.race}
                                location={run.location}
                                surface={run.surface}
                                weather={run.weather}
                                climb={run.climb}
                                grade={run.grade}
                                shoe={run.shoe}
                                notes={run.notes}
                                map={run.map}
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
                                userId={bike.userId}
                                firstName={bike.firstName}
                                lastName={bike.lastName}
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
                                userId={swim.userId}
                                firstName={swim.firstName}
                                lastName={swim.lastName}
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
                                firstName={lift.firstName}
                                lastName={lift.lastName}
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

                
            </Container>
        )
    }
}

export default ProfileBody;