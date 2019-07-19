import React, { Component } from "react";
// import "./exercise.css";

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
            name: this.props.name || "",
            weight: this.props.weight || "",
            superset: this.props.superset || "",
            sets: this.props.sets || "",
            reps: this.props.reps || "",
            notes: this.props.notes || "",
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

        console.log("Exericse", exercise);

        this.props.getExercise(exercise);
    }

    deleteExercise = () => {
        this.props.deleteExercise(this.state.id);
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        }, () => {
            this.sendExercise();
        });
    }

    render() {
        return (
            <div className="input-group input-group-sm mb-1">
                {/* NAME */}
                <input
                    autoComplete="off"
                    autoFocus
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
                    autoFocus
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
                    autoFocus
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
                    autoFocus
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
                    autoFocus
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
                    autoFocus
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
                    autoFocus
                    name="notes"
                    type="text"
                    className="form-control"
                    placeholder="Notes"
                    onChange={this.handleInputChange}
                    value={this.state.notes}
                />
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