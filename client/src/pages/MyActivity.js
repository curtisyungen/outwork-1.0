import React, { Component } from "react";
import Activity from "../components/Activity/activity";
import workoutAPI from "../utils/actAPI";
import "./MyActivity.css";

class MyActivity extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userActivity: null,
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
        workoutAPI.getAllWorkoutsByUserId(this.state.userId)
            .then((res) => {
                this.setState({
                    userActivity: res.data,
                });
            });
    }

    deleteActivity = (workoutId) => {

        let userId = this.state.userId;

        workoutAPI.deleteWorkoutById(userId, workoutId)
            .then((res) => {
                console.log(res);
                window.location.reload();
            });
    }

    render() {
        return (
            <div className={`myActivityPage`}>

                {this.state.userActivity && this.state.userActivity.length > 0 ? (
                    this.state.userActivity.map(act => (
                        <Activity 
                            key={act.id}
                            id={act.id}
                            workoutType={act.workoutType}
                            userId={act.userId}
                            firstName={act.firstName}
                            lastName={act.lastName}
                            date={act.date}
                            location={act.location}
                            distance={act.distance}
                            duration={act.duration}
                            milePace={act.milePace}
                            runType={act.runType}
                            laps={act.laps}
                            repeats={act.repeats}
                            race={act.race}
                            surface={act.surface}
                            weather={act.weather}
                            climb={act.climb}
                            grade={act.grade}
                            shoe={act.shoe}
                            bike={act.bike}
                            generator={act.generator}
                            pushups={act.pushups}
                            pullups={act.pullups}
                            workout={act.workout}
                            muscleGroups={act.muscleGroups}
                            notes={act.notes}
                            map={act.map}
                        />
                    ))
                ) : (
                    <></>
                )}

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
        )
    }
}

export default MyActivity;