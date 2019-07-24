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
                    position="top"
                    closeOnDocumentClick
                    className="popup"
                >
                    {this.props.day.date  ? (
                        <span>
                            <h4>{this.props.day.date}</h4>
                            <div>{this.props.day.workoutType.toUpperCase()}</div>
                            <div>{this.props.day.distance} Miles</div>
                            <div>Generator: {this.props.day.generator}</div>
                            <div>Muscle Groups: {this.props.day.muscleGroups}</div>
                        </span>
                    ) : (
                        <div>Rest Day</div>
                    )}
                </Popup>
            </span>         
        )
    }
}

export default Day;