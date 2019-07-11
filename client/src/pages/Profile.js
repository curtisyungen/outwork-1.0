import React, { Component } from "react";
import Container from "../components/Container/container";
import Modal from "react-responsive-modal";
import Run from "../components/Run/run";
import Bike from "../components/Bike/bike";
import Swim from "../components/Swim/swim";
import Lift from "../components/Lift/lift";
import actAPI from "../utils/actAPI";
import "./Profile.css";

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            firstName: null,
            lastName: null,
            following: null,
            followers: null,
            runs: null,
            bikes: null,
            swims: null,
            lifts: null,
            openFollowingModal: false,
            openFollowersModal: false,
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

    openFollowingModal = () => {
        this.setState({
            openFollowingModal: true,
        });
    }

    openFollowersModal = () => {
        this.setState({
            openFollowersModal: true,
        });
    }

    closeModal = () => {
        this.setState({
            openFollowingModal: false,
            openFollowersModal: false,
        });
    }

    render() {
        return (
            <Container>
                <div className="profile">
                    <div>
                        <h4>{this.props.firstName} {this.props.lastName}</h4>
                        <div>
                            <div
                                className="followStats"
                                onClick={this.openFollowingModal}
                            >
                                Following: {this.props.following ? (this.props.following.length) : ("")}
                            </div>

                            <div
                                className="followStats"
                                onClick={this.openFollowersModal}
                            >
                                Followers: {this.props.followers ? (this.props.followers.length) : ("")}
                            </div>
                        </div>
                    </div>

                    <Modal
                        open={this.state.openFollowingModal}
                        onClose={this.closeModal}
                    >

                    </Modal>

                    <Modal
                        open={this.state.openFollowersModal}
                        onClose={this.closeModal}
                    >

                    </Modal>

                    <div>
                        {/* RUNS */}
                        {this.state.runs && this.state.runs.length ? (
                            this.state.runs.map(run => (
                                <Run
                                    key={run.id}
                                    id={run.id}
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
                </div>
            </Container>
        )
    }
}

export default Profile;