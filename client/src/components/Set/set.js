import React, { Component } from "react";
import "./set.css";

class Set extends Component {
    render() {
        return (
            <div className="set">
                <div>
                    <span className="exName">{this.props.set[0].name}</span> 
                    <span className="exReps">{this.props.set[0].reps}</span>
                </div>

                <div>
                    <span className="exName">{this.props.set[1].name}</span> 
                    <span className="exReps">{this.props.set[1].reps}</span>
                </div>

                <div>
                    <span className="exName">{this.props.set[2].name}</span> 
                    <span className="exReps">{this.props.set[2].reps}</span>
                </div>

                <div>
                    <span className="exName">{this.props.set[3].name}</span> 
                    <span className="exReps">{this.props.set[3].reps}</span>
                </div>

                <div>
                    <span className="exName">{this.props.set[4].name}</span> 
                    <span className="exReps">{this.props.set[4].reps}</span>
                </div>
            </div>
        )
    }
}

export default Set;