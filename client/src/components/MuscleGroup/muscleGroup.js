import React, { Component } from "react";
import "./muscleGroup.css";

class MuscleGroup extends Component {

    toggleCheck = () => {
        this.props.updateMuscleGroups(this.props.muscleGroup);
    }

    render() {
        return (
            <div className="form-group muscleGroup">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    onChange={this.toggleCheck}
                    checked={this.props.checked}
                />
                {this.props.muscleGroup}
            </div>
        )
    }
}

export default MuscleGroup;