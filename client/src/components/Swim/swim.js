import React, { Component } from "react";
import "./swim.css";

class Swim extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openModal: false,
        }
    }

    deleteSwim = () => {
        this.props.deleteActivity("swim", this.props.id);
    }

    render() {
        return (
            <div className="card actCard">
                <div className="card-body">
                    <h5 className="card-title mb-0">Swim</h5>
                    <h6 className="card-subtitle text-muted mb-0">{this.props.date}</h6>
                    <div className="card-text">
                        <span>{this.props.duration}</span>
                        <span>{this.props.location}</span>
                        <span>{this.props.surface}</span>
                        <span>{this.props.weather}</span>
                    </div>
                    <div className="card-link" onClick={this.deleteSwim}>Delete</div>
                </div>
            </div>
        )
    }
}

export default Swim;