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
                    {this.props.muscleGroup}
                </div>
                {this.props.muscleGroup}
            </div>
        )
    }
}

export default MuscleGroup;