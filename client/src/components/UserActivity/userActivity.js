import React, { Component } from "react";
import Run from "../Run/run";
import Bike from "../Bike/bike";
import Swim from "../Swim/swim";
import Lift from "../Lift/lift";
import "./userActivity.css";

class UserActivity extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            activity: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            activity: this.props.activity,
        });
    }

    getComponent = () => {
        let activity = this.props.activity;

        if (this.props.activity.workoutType === "run") {
            return this.getRunComponent(activity);
        }
        else if (this.props.activity.workoutType === "bike") {
            return this.getBikeComponent(activity);
        }
        else if (this.props.activity.workoutType === "swim") {
            return this.getSwimComponent(activity);
        }
        else if (this.props.activity.workoutType === "lift") {
            return this.getLiftComponent(activity);
        }
        else {
            return (
                <></>
            )
        }
    }

    getRunComponent = (activity) => {
        return (
            <Run 
                id={activity.id}
                userId={activity.userId}
                firstName={activity.firstName}
                lastName={activity.lastName}
                date={activity.date}
                time={activity.time}
                distance={activity.distance}
                duration={activity.duration}
                milePace={activity.milePace}
                runType={activity.runType}
                repeats={activity.repeats}
                race={activity.race}
                location={activity.location}
                surface={activity.surface}
                weather={activity.weather}
                climb={activity.climb}
                grade={activity.grade}
                shoe={activity.shoe}
                notes={activity.notes}
                map={activity.map}
                deleteActivity={this.props.deleteActivity}
            />
        )
    }

    getBikeComponent = (activity) => {
        return (
            <Bike 
                id={activity.id}
                userId={activity.userId}
                firstName={activity.firstName}
                lastName={activity.lastName}
                date={activity.date}
                time={activity.time}
                distance={activity.distance}
                duration={activity.duration}
                location={activity.location}
                surface={activity.surface}
                weather={activity.weather}
                climb={activity.climb}
                grade={activity.grade}
                bike={activity.bike}
                notes={activity.notes}
                map={activity.map}
                deleteActivity={this.props.deleteActivity}
            />
        )
    }

    getSwimComponent = (activity) => {
        return (
            <Swim 
                id={activity.id}
                userId={activity.userId}
                firstName={activity.firstName}
                lastName={activity.lastName}
                date={activity.date}
                time={activity.time}
                distance={activity.distance}
                laps={activity.laps}
                duration={activity.duration}
                location={activity.location}
                surface={activity.surface}
                workout={activity.workout}
                notes={activity.notes}
                deleteActivity={this.props.deleteActivity}
            />
        )
    }

    getLiftComponent = (activity) => {
        return (
            <Lift 
                id={activity.id}
                userId={activity.userId}
                firstName={activity.firstName}
                lastName={activity.lastName}
                date={activity.date}
                time={activity.time}
                location={activity.location}
                duration={activity.duration}
                generator={activity.generator}
                pushups={activity.pushups}
                pullups={activity.pullups}
                workout={activity.workout}
                muscleGroups={activity.muscleGroups}
                notes={activity.notes}
                deleteActivity={this.props.deleteActivity}
            />
        )
    }

    render() {
        return (
            this.getComponent()
        )
    }
}

export default UserActivity;