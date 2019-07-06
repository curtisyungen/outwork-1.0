import React, { Component } from "react";
// import Modal from "react-responsive-modal";
import "./run.css";

class Run extends Component {

    deleteRun = () => {
        this.props.deleteActivity("run", this.props.id);
        console.log(this.props.id);
    }

    render() {
        return (
            <span>
                <div className="card actCard">
                    <div className="card-body">
                        <h5 className="card-title mb-0">Run</h5>
                        <h6 className="card-subtitle text-muted mb-0">{this.props.date}</h6>
                        <div className="card-text">
                            <span>{this.props.duration}</span>
                            <span>{this.props.location}</span>
                            <span>{this.props.surface}</span>
                            <span>{this.props.weather}</span>
                        </div>
                        <div className="card-link" onClick={this.deleteRun}>Delete</div>
                    </div>


                </div>
            </span>
        )
    }
}

export default Run;