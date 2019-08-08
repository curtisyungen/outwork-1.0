import React, { Component } from "react";
import "./muscleGroup.css";

class MuscleGroup extends Component {

    toggleCheck = () => {
        this.props.updateMuscleGroups(this.props.muscleGroup);
    }

    render() {
        return (
            <div className="form-group muscleGroup">
                <div
                    className={`muscleGroupDiv checked-${this.props.checked}`}
                    onClick={this.toggleCheck}
                >
                </div>
                <div className="muscleGroupText">{this.props.muscleGroup}</div>
            </div>
        )
    }
}

export default MuscleGroup;