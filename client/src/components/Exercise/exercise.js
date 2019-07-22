import React, { Component } from "react";
import "./exercise.css";

class Exercise extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: "",
            weight: "",
            superset: "",
            sets: "",
            reps: "",
            rest: "",
            notes: "",
        }
    }

    componentDidMount = () => {
        this.setState({
            id: this.props.id,
            name: this.props.name,
            weight: this.props.weight,
            superset: this.props.superset,
            sets: this.props.sets,
            reps: this.props.reps,
            rest: this.props.rest,
            notes: this.props.notes,
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    sendExercise = () => {
        let exercise = {
            id: this.props.id,
            name: this.state.name,
            weight: this.state.weight,
            superset: this.state.superset,
            sets: this.state.sets,
            reps: this.state.reps,
            rest: this.state.rest,
            notes: this.state.notes,
        }

        this.props.getExercise(exercise);
    }

    deleteExercise = () => {
        this.props.deleteExercise(this.state.id);
    }

    render() {
        return (
            <div className={`input-group input-group-sm mb-1 saved-${this.props.name !== ""}`}>
                {/* NAME */}
                <input
                    autoComplete="off"
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Exercise"
                    onChange={this.handleInputChange}
                    value={this.state.name}
                />
                {/* WEIGHT */}
                <input
                    autoComplete="off"
                    name="weight"
                    type="text"
                    className="form-control"
                    placeholder="Lbs."
                    onChange={this.handleInputChange}
                    value={this.state.weight}
                />
                {/* SUPERSET ID */}
                <input
                    autoComplete="off"
                    name="superset"
                    type="text"
                    className="form-control"
                    placeholder="Superset ID"
                    onChange={this.handleInputChange}
                    value={this.state.superset}
                />
                {/* SETS */}
                <input
                    autoComplete="off"
                    name="sets"
                    type="text"
                    className="form-control"
                    placeholder="Sets"
                    onChange={this.handleInputChange}
                    value={this.state.sets}
                />
                {/* REPS */}
                <input
                    autoComplete="off"
                    name="reps"
                    type="text"
                    className="form-control"
                    placeholder="Reps"
                    onChange={this.handleInputChange}
                    value={this.state.reps}
                />
                {/* REST */}
                <input
                    autoComplete="off"
                    name="rest"
                    type="text"
                    className="form-control"
                    placeholder="Rest"
                    onChange={this.handleInputChange}
                    value={this.state.rest}
                />
                {/* NOTES */}
                <input
                    autoComplete="off"
                    name="notes"
                    type="text"
                    className="form-control"
                    placeholder="Notes"
                    onChange={this.handleInputChange}
                    value={this.state.notes}
                />
                {/* SAVE */}
                <button
                    className="btn btn-success btn-sm"
                    onClick={this.sendExercise}
                >
                    O
                </button>
                {/* DELETE */}
                <button
                    className="btn btn-danger btn-sm"
                    onClick={this.deleteExercise}
                >
                    X
                </button>
            </div>
        )
    }
}

export default Exercise;