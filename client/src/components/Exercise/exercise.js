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
            rest: this.props.rest || "",
            notes: this.props.notes || "",
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
        this.props.setSuperset(this.state.id, this.state.superset);
        this.props.setSets(this.state.id, this.state.sets);
        this.props.setReps(this.state.id, this.state.reps);
        this.props.setRest(this.state.id, this.state.rest);
        this.props.setNotes(this.state.id, this.state.notes);
    }

    render() {
        return (
            <div className="input-group input-group-sm mb-1">
                <div className="input-group-prepend">
                    <span className="input-group-text">Exercise</span>
                </div>

                {/* NAME */}
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
                {/* WEIGHT */}
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
                {/* SUPERSET ID */}
                <input
                    autoComplete="off"
                    name="superset"
                    type="text"
                    className="form-control"
                    placeholder="Superset ID"
                    onChange={this.handleInputChange}
                    onBlur={this.updateParent}
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
                    onBlur={this.updateParent}
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
                    onBlur={this.updateParent}
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
                    onBlur={this.updateParent}
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
                    onBlur={this.updateParent}
                    value={this.state.notes}
                />
                {/* DELETE */}
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