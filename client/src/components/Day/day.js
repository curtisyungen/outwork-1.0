import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./day.css";

class Day extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: null,
            workoutType: null,
        }
    }

    componentDidMount = () => {
        this.getType();
        this.getWorkoutData();
    }

    getType = () => {
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

    getWorkoutData = () => {
        let day = this.props.day;
        let workoutType = [];

        if (day.length >= 2) {
            for (var i=1; i<day.length; i++) {
                workoutType.push(day[i].workoutType);
            }
        }

        this.setState({
            workoutType: workoutType,
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
                    {this.state.workoutType && this.state.workoutType.length > 0 ? (
                        <span>
                            <p>{`${this.props.month} ${parseInt(this.props.day[0])}, 2019`}</p>
                            {this.state.workoutType.map(type => (
                                <div>{type.toUpperCase()}</div>
                            ))}
                        </span>
                    ) : (
                        <span>
                            <div>{`${this.props.month} ${parseInt(this.props.day[0])}, 2019`}</div>
                            <div>Rest Day</div>
                        </span>
                    )}
                </Popup>
            </span>
        )
    }
}

export default Day;