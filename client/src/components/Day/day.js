import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./day.css";

class Day extends Component {

    componentDidMount = () => {
        console.log("Day", this.props);
    }

    render() {
        return (
            <span>
                <Popup
                    trigger={
                        <div className={`day day-${this.props.type}`}></div>
                    }
                    on="hover"
                    position="top right"
                    closeOnDocumentClick
                    className="popup"
                >
                    {this.props.day.date ? (
                        <span>
                            <p>{this.props.day.date}</p>
                            <div>{this.props.day.workoutType.toUpperCase()}</div>
                        </span>
                    ) : (
                        <span>
                            <div>{this.props.month}/{parseInt(this.props.day) + 1}</div>
                            <div>Rest Day</div>
                        </span>
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
                            <div className="popupData">Muscle Groups: {this.props.day.muscleGroups}</div>
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