import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./day.css";

class Day extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: null,
            workoutTypes: null,
        }
    }

    componentDidMount = () => {
        this.getWorkoutData();
    }

    getWorkoutData = () => {
        let type;
        let day = this.props.day;

        // If day has multiple workouts, set type as multiple for color scheme
        if (day.length > 2) {
            type = "multiple";
        }
        // Otherwise, set type as the type of workout for that day
        else if (day.length === 2) {
            type = day[1].workoutType;
        }

        // Gather all workout types for the day to be shown in PopUp
        let workoutTypes = [];

        if (day.length >= 2) {
            for (var i=1; i<day.length; i++) {

                if (day[i].workoutType !== "lift") {
                    workoutTypes.push([day[i].workoutType, `${day[i].distance} miles`]);
                }
                else {
                    workoutTypes.push([day[i].workoutType, `${day[i].generator}`]);
                }
            }
        }

        this.setState({
            type: type,
            workoutTypes: workoutTypes,
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
                    {this.state.workoutTypes && this.state.workoutTypes.length > 0 ? (
                        <span>
                            <p>{`${this.props.month} ${parseInt(this.props.day[0])}, 2019`}</p>
                            {this.state.workoutTypes.map((type) => (
                                <div key={Math.random() * 100000}>
                                    <span>{type[0].toUpperCase()}:&nbsp;{type[1]}</span>
                                </div>
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