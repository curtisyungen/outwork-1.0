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

        this.myRef = React.createRef();
    }

    componentDidMount = () => {
        this.getWorkoutData();
        this.refCallBack();
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
                if (day[i].workoutType === "lift") {
                    workoutTypes.push([day[i].workoutType, `${day[i].generator}`]);
                }
                else if (day[i].workoutType === "swim") {
                    workoutTypes.push([day[i].workoutType, `${day[i].distance} meters`]);
                }
                else {
                    workoutTypes.push([day[i].workoutType, `${day[i].distance} miles`]);
                }
            }
        }

        this.setState({
            type: type,
            workoutTypes: workoutTypes,
        });
    }

    refCallBack = () => {
        let screenWidth = this.props.screenWidth;
        let el = this.myRef.current;
        let objLeft = el.getBoundingClientRect().left;

        let position;
        if (objLeft >= screenWidth / 2) {
            position = "top right";
        }
        else {
            position = "top left";
        }

        this.setState({
            position: position,
        });
    };

    render() {
        return (
            <span ref={this.myRef}>
                <Popup
                    trigger={
                        <div className={`day day-${this.state.type}`}></div>
                    }
                    on="hover"
                    position={this.state.position}
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