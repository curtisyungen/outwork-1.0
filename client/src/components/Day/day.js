import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./day.css";

class Day extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openModal: false,
        }
    }

    openModal = () => {
        this.setState({
            openModal: true,
        });
    }

    closeModal = () => {
        this.setState({
            openModal: false,
        });
    }

    render() {
        return (
            <span>
                <Popup
                    trigger={
                        this.props.day.date ? (
                            <div className={`day day-${this.props.type}`}></div>
                        ) : (
                                <></>
                            )
                    }
                    on="hover"
                    position="top right"
                    closeOnDocumentClick
                    className="popup"
                >
                    {this.props.day.date ? (
                        <span>
                            <h4>{this.props.day.date}</h4>
                            <div>{this.props.day.workoutType.toUpperCase()}</div>
                        </span>
                    ) : (
                        <div>Rest Day</div>
                    )}
                    {this.props.day.workoutType === "run" ? (
                        <span>
                            <div>Miles: {this.props.day.distance}</div>
                            <div>Time: {this.props.day.duration}</div>
                            <div>Climb: {this.props.day.climb} Feet</div>
                        </span>
                    ) : (
                        <></>
                    )}
                    {this.props.day.workoutType === "bike" ? (
                        <span>
                            <div>Miles: {this.props.day.distance}</div>
                            <div>Time: {this.props.day.duration}</div>
                            <div>Climb: {this.props.day.climb} Feet</div>
                        </span>
                    ): (
                        <></>
                    )}
                    {this.props.day.workoutType === "swim" ? (
                        <span>
                            <div>Distance: {this.props.day.distance}</div>
                            <div>Time: {this.props.day.duration}</div>
                        </span>
                    ): (
                        <></>
                    )}
                    {this.props.day.workoutType === "lift" ? (
                        <span>
                            <div>Generator: {this.props.day.generator}</div>
                            <div>Muscle Groups: {this.props.day.muscleGroups}</div>
                        </span>
                    ): (
                        <></>
                    )}
                </Popup>
            </span>
        )
    }
}

export default Day;