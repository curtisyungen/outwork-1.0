import React, { Component } from "react";
import "./liftDetailExercise.css";

class LiftDetailExercise extends Component {
    render() {
        return (
            <tr className="listDetailExercise">
                <td className="liftDetail">{this.props.name}</td>
                <td className="liftDetail">{this.props.reps}</td>
                <td className="liftDetail">{this.props.weight}</td>
                <td className="liftDetail">{this.props.rest}</td>
                <td className="liftDetail">{this.props.notes}</td>
            </tr>
        )
    }
}

export default LiftDetailExercise;