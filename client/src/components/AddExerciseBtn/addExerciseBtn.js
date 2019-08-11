import React, { Component } from "react";

class AddExerciseBtn extends Component {
    render() {
        return (
            <button 
                className="btn btn-outline-dark btn-sm addExerciseBtn" 
                onClick={this.props.addExercise.bind(null, this.props.name)}
            >
                {this.props.name}
            </button>
        )
    }
}

export default AddExerciseBtn;