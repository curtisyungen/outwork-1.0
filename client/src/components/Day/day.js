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
                        <div className={`day day-${this.props.type}`}></div>
                    }
                    on="hover"
                    position="top"
                    closeOnDocumentClick
                    className="popup"
                >
                    {this.props.day.date  ? (
                        <div>{this.props.day.date}</div>
                        <div>{this.props.day.workoutType}</div>
                        <div>{this.props.day.distance}</div>
                        <div>{this.props.day.generator}</div>
                    ) : (
                        <></>
                    )}
                </Popup>
            </span>         
        )
    }
}

export default Day;