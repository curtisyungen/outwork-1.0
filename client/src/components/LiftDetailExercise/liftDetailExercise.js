import React, { Component } from "react";
import "./liftDetailExercise.css";

class LiftDetailExercise extends Component {
    render() {
        return (
            <tr className="liftDetailExercise">
                <td className="align-middle liftDetail">{this.props.name}</td>
                <td className="align-middle liftDetail">{this.props.weight}</td>
                <td className="align-middle liftDetail">{this.props.superset}</td>
                <td className="align-middle liftDetail">{this.props.sets}</td>
                <td className="align-middle liftDetail">{this.props.reps}</td>
                <td className="align-middle liftDetail">{this.props.rest}</td>
                <td className="align-middle liftDetail">{this.props.notes}</td>
            </tr>
        )
    }
}

export default LiftDetailExercise;