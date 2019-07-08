import React, { Component } from "react";
// import UserActivity from "../components/UserActivity/userActivity";
import Run from "../components/Run/run";
import Bike from "../components/Bike/bike";
import Swim from "../components/Swim/swim";
import Lift from "../components/Lift/lift";
import userAPI from "../utils/userAPI";
import actAPI from "../utils/actAPI";
import "./Home.css";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            following: null,
            allRuns: [],
            allBikes: [],
            allSwims: [],
            allLifts: [],
        }
    }

    componentDidMount = () => {
        this.props.updateParentState();

        // Validate user and then call getUserById
        if (this.props.checkValidUser()) {
            let userId = localStorage.getItem("userId");
            this.setState({
                userId: userId,
            }, () => {
                this.getUserById();
            });
        }
    }

    getUserById = () => {
        userAPI.getUserById(this.state.userId)
            .then((res) => {

                let following = [];
                following.push(res.data[0].following);

                this.setState({
                    following: following,
                }, () => {
                    // Get user's activity
                    this.getUserActivity(this.state.userId);

                    // Get following's activity
                    for (var f in following) {
                        this.getUserActivity(following[f]);
                    }
                });
                
            });
    }

    getUserActivity = (userId) => {
        this.getRunsByUser(userId);
        this.getBikesByUser(userId);
        this.getSwimsByUser(userId);
        this.getLiftsByUser(userId);
    }

    getRunsByUser = (userId) => {
        actAPI.getRunsByUser(userId)
            .then((res) => {
                let allRuns = this.state.allRuns;

                for (var item in res.data) {
                    allRuns.push(res.data[item]);
                };

                this.setState({
                    allRuns: allRuns,
                });
            });
    }

    getBikesByUser = (userId) => {
        actAPI.getBikesByUser(userId)
            .then((res) => {
                let allBikes = this.state.allBikes;

                for (var item in res.data) {
                    allBikes.push(res.data[item]);
                };

                this.setState({
                    allBikes: allBikes
                });
            });
    }

    getSwimsByUser = (userId) => {
        actAPI.getSwimsByUser(userId)
            .then((res) => {
                let allSwims = this.state.allSwims;

                for (var item in res.data) {
                    allSwims.push(res.data[item]);
                };

                this.setState({
                    allSwims: allSwims
                });
            });
    }

    getLiftsByUser = (userId) => {
        actAPI.getLiftsByUser(userId)
            .then((res) => {
                let allLifts = this.state.allLifts;
                
                for (var item in res.data) {
                    allLifts.push(res.data[item]);
                };

                this.setState({
                    allLifts: allLifts
                });
            });
    }

    render() {
        return (
            <div className="homePage">

                {/* RUNS */}
                {this.state.allRuns && this.state.allRuns.length > 0 ? (
                    this.state.allRuns.map(run => (
                        <Run 
                            key={Math.random() * 100000}
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
                        />
                    ))
                ) : (
                    <></>
                )}

                {/* BIKES */}
                {this.state.allBikes && this.state.allBikes.length > 0 ? (
                    this.state.allBikes.map(bike => (
                        <Bike 
                            key={Math.random() * 100000}
                            id={bike.id}
                            userId={bike.userId}
                            firstName={bike.firstName}
                            lastName={bike.lastName}
                            date={bike.date}
                            distance={bike.distance}
                            duration={bike.duration}
                            location={bike.location}
                            surface={bike.surface}
                            weather={bike.weather}
                            climb={bike.climb}
                            grade={bike.grade}
                            bike={bike.bike}
                            notes={bike.notes}
                            map={bike.map}
                        />
                    ))
                ) : (
                    <></>
                )}

                {/* SWIMS */}
                {this.state.allSwims && this.state.allSwims.length > 0 ? (
                    this.state.allSwims.map(swim => (
                        <Swim 
                            key={Math.random() * 100000}
                            id={swim.id}
                            userId={swim.userId}
                            firstName={swim.firstName}
                            lastName={swim.lastName}
                            date={swim.date}
                            distance={swim.distance}
                            laps={swim.laps}
                            duration={swim.duration}
                            location={swim.location}
                            waterType={swim.waterType}
                            swimWorkout={swim.swimWorkout}
                            notes={swim.notes}
                        />
                    ))
                ) : (
                    <></>
                )}

                {/* LIFTS */}
                {this.state.allLifts && this.state.allLifts.length > 0 ? (
                    this.state.allLifts.map(lift => (
                        <Lift 
                            key={Math.random() * 100000}
                            id={lift.id}
                            userId={lift.userId}
                            firstName={lift.firstName}
                            lastName={lift.lastName}
                            date={lift.date}
                            location={lift.location}
                            duration={lift.duration}
                            generator={lift.generator}
                            pushups={lift.pushups}
                            pullups={lift.pullups}
                            workout={lift.workout}
                            muscleGroups={lift.muscleGroups}
                            notes={lift.notes}
                        />
                    ))
                ) : (
                    <></>
                )}
            </div>
        )
    }
}

export default Home;