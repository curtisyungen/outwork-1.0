import React, { Component } from "react";
import "./set.css";

class Set extends Component {
    render() {
        return (
            <div className="set">
                <p>{this.props.set[0].name} {this.props.set[0].reps}</p>
                <p>{this.props.set[1].name} {this.props.set[1].reps}</p>
                <p>{this.props.set[2].name} {this.props.set[2].reps}</p>
                <p>{this.props.set[3].name} {this.props.set[3].reps}</p>
                <p>{this.props.set[4].name} {this.props.set[4].reps}</p>
            </div>
        )
    }
}

export default Set;