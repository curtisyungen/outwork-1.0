import React, { Component } from "react";
import Run from "../Run/run";
import Bike from "../Bike/bike";
import Swim from "../Swim/swim";
import Lift from "../Lift/lift";
import "./activity.css";

class Activity extends Component {
    render() {
        return (
            <span>
                {this.props.workoutType === "run" ? (
                    <Run
                        key={Math.random() * 100000}
                        id={this.props.id}
                        userId={this.props.userId}
                        firstName={this.props.firstName}
                        lastName={this.props.lastName}
                        date={this.props.date}
                        location={this.props.location}
                        duration={this.props.duration}
                        distance={this.props.distance}
                        milePace={this.props.milePace}
                        runType={this.props.runType}
                        repeats={this.props.repeats}
                        race={this.props.race}
                        climb={this.props.climb}
                        weather={this.props.weather}
                        shoe={this.props.shoe}
                        notes={this.props.notes}
                        map={this.props.map}
                    />
                ) : (
                        <></>
                    )}

                {this.props.workoutType === "bike" ? (
                    <Bike
                        key={Math.random() * 100000}
                        id={this.props.id}
                        userId={this.props.userId}
                        firstName={this.props.firstName}
                        lastName={this.props.lastName}
                        date={this.props.date}
                        location={this.props.location}
                        duration={this.props.duration}
                        distance={this.props.distance}
                        climb={this.props.climb}
                        weather={this.props.weather}
                        bike={this.props.bike}
                        notes={this.props.notes}
                    />
                ) : (
                        <></>
                    )}

                {this.props.workoutType === "swim" ? (
                    <Swim
                        key={Math.random() * 100000}
                        id={this.props.id}
                        userId={this.props.userId}
                        firstName={this.props.firstName}
                        lastName={this.props.lastName}
                        date={this.props.date}
                        location={this.props.location}
                        duration={this.props.duration}
                        distance={this.props.distance}
                        surface={this.props.surface}
                        laps={this.props.laps}
                        workout={this.props.workout}
                        notes={this.props.notes}
                    />
                ) : (
                        <></>
                    )}

                {this.props.workoutType === "lift" ? (
                    <Lift
                        key={Math.random() * 100000}
                        id={this.props.id}
                        userId={this.props.userId}
                        firstName={this.props.firstName}
                        lastName={this.props.lastName}
                        date={this.props.date}
                        location={this.props.location}
                        duration={this.props.duration}
                        generator={this.props.generator}
                        muscleGroups={this.props.muscleGroups}
                        pushups={this.props.pushups}
                        pullups={this.props.pullups}
                        workout={this.props.workout}
                        notes={this.props.notes}
                    />
                ) : (
                        <></>
                    )}
            </span>
        )
    }
}

export default Activity;