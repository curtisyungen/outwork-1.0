import React, { Component } from "react";
import "./run.css";

class Run extends Component {
    render() {
        return (
            <div class="card runCard">
                <div class="card-body">
                    <h5 class="card-title mb-0">{this.props.distance} miles</h5>
                    <h6 class="card-subtitle text-muted mb-0">{this.props.date}</h6>
                    <div class="card-text">
                        <span>{this.props.duration}</span>
                        <span>{this.props.location}</span>
                        <span>{this.props.surface}</span>
                        <span>{this.props.weather}</span>
                    </div>
                    <a href="#" class="card-link">Edit</a>
                    <a href="#" class="card-link">Delete</a>
                </div>
            </div>
        )
    }
}

export default Run;