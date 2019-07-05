import React, { Component } from "react";
import "./lift.css";

class Lift extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            openModal: false,
        }
    }

    deleteLift = () => {
        this.props.deleteActivity("lift", this.props.id);
    }

    render() {
        return (
            <div className="card actCard">
                <div className="card-body">
                    <h5 className="card-title mb-0">Lift</h5>
                    <h6 className="card-subtitle text-muted mb-0">{this.props.date}</h6>
                    <div className="card-text">
                        <span>{this.props.duration}</span>
                        <span>{this.props.location}</span>
                        <span>{this.props.sets}</span>
                        <span>{this.props.muscleGroups}</span>
                    </div>
                    <div className="card-link" onClick={this.deleteLift}>Delete</div>
                </div>
            </div>
        )
    }
}

export default Lift;