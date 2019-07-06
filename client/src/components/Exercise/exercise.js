import React, { Component } from "react";
// import "./exercise.css";

class Exercise extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: "",
            weight: "",
            reps: "",
            rest: "",
        }
    }

    componentDidMount = () => {
        this.setState({
            id: this.props.id,
            name: this.props.name,
            weight: this.props.weight,
            reps: this.props.reps,
            rest: this.props.rest,
        });
    }

    deleteExercise = () => {
        this.props.deleteExercise(this.state.id);
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    updateParent = () => {
        this.props.setName(this.state.id, this.state.name);
        this.props.setWeight(this.state.id, this.state.weight);
        this.props.setReps(this.state.id, this.state.reps);
        this.props.setRest(this.state.id, this.state.rest);
    }

    render() {
        return (
            <div className="col-md-4 input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Exercise</span>
                </div>
                <input
                    autoComplete="off"
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Exercise Name"
                    onChange={this.handleInputChange}
                    onBlur={this.updateParent}
                    value={this.state.name}
                />
                <input
                    autoComplete="off"
                    name="weight"
                    type="text"
                    className="form-control"
                    placeholder="Weight (lbs.)"
                    onChange={this.handleInputChange}
                    onBlur={this.updateParent}
                    value={this.state.weight}
                />
                <input
                    autoComplete="off"
                    name="reps"
                    type="text"
                    className="form-control"
                    placeholder="Reps"
                    onChange={this.handleInputChange}
                    onBlur={this.updateParent}
                    value={this.state.reps}
                />
                <input
                    autoComplete="off"
                    name="rest"
                    type="text"
                    className="form-control"
                    placeholder="Rest"
                    onChange={this.handleInputChange}
                    onBlur={this.updateParent}
                    value={this.state.rest}
                />
                <button
                    className="btn btn-danger btn-sm"
                    onClick={this.deleteExercise}
                >
                    Delete
                </button>
            </div>
        )
    }
}

export default Exercise;