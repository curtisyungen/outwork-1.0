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
            saved: false,
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
        }, () => {
            this.checkSaved();
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        }, () => {
            this.setState({
                saved: false,
            });
        });
    }

    checkSaved = () => {
        if (this.props.name !== "") {
            this.setState({
                saved: true,
            });
        }
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

        this.setState({
            saved: true,
        });
    }

    deleteExercise = () => {
        this.props.deleteExercise(this.state.id);
    }

    render() {
        return (
            <div className={`input-group input-group-sm mb-1 saved-${this.state.saved}`}>
                {/* NAME */}
                <input
                    autoComplete="off"
                    name="name"
                    type="text"
                    className="form-control exerciseInput"
                    placeholder="Exercise"
                    onChange={this.handleInputChange}
                    value={this.state.name}
                />
                {/* WEIGHT */}
                <input
                    autoComplete="off"
                    name="weight"
                    type="text"
                    className="form-control exerciseInput"
                    placeholder="Lbs."
                    onChange={this.handleInputChange}
                    value={this.state.weight}
                />
                {/* SUPERSET ID */}
                <input
                    autoComplete="off"
                    name="superset"
                    type="text"
                    className="form-control exerciseInput"
                    placeholder="Superset ID"
                    onChange={this.handleInputChange}
                    value={this.state.superset}
                />
                {/* SETS */}
                <input
                    autoComplete="off"
                    name="sets"
                    type="text"
                    className="form-control exerciseInput"
                    placeholder="Sets"
                    onChange={this.handleInputChange}
                    value={this.state.sets}
                />
                {/* REPS */}
                <input
                    autoComplete="off"
                    name="reps"
                    type="text"
                    className="form-control exerciseInput"
                    placeholder="Reps"
                    onChange={this.handleInputChange}
                    value={this.state.reps}
                />
                {/* REST */}
                <input
                    autoComplete="off"
                    name="rest"
                    type="text"
                    className="form-control exerciseInput"
                    placeholder="Rest"
                    onChange={this.handleInputChange}
                    value={this.state.rest}
                />
                {/* NOTES */}
                <input
                    autoComplete="off"
                    name="notes"
                    type="text"
                    className="form-control exerciseInput"
                    placeholder="Notes"
                    onChange={this.handleInputChange}
                    value={this.state.notes}
                />
                {/* SAVE */}
                <button
                    className="btn btn-success btn-sm exerciseBtn"
                    onClick={this.sendExercise}
                >
                    Save
                </button>
                {/* DELETE */}
                <button
                    className="btn btn-danger btn-sm exerciseBtn"
                    onClick={this.deleteExercise}
                >
                    Delete
                </button>
            </div>
        )
    }
}

export default Exercise;