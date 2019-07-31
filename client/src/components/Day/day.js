import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./day.css";

class Day extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: null,
        }
    }

    componentDidMount = () => {
        let type;
        let day = this.props.day;

        if (day.length > 2) {
            type = "multiple";
        }
        else if (day.length === 2) {
            type = day[1].workoutType;
        }

        this.setState({
            type: type,
        });
    }

    render() {
        return (
            <span>
                <Popup
                    trigger={
                        <div className={`day day-${this.state.type}`}></div>
                    }
                    on="hover"
                    position="top right"
                    closeOnDocumentClick
                    className="popup"
                >
                    {this.props.day.date ? (
                        <span>
                            <p>{`${this.props.month} ${parseInt(this.props.day[0])}, 2019`}</p>
                            <div>{this.props.day.workoutType.toUpperCase()}</div>
                        </span>
                    ) : (
                        <span>
                            <div>{`${this.props.month} ${parseInt(this.props.day[0])}, 2019`}</div>
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