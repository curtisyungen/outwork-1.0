import React, { Component } from "react";
import "./exercise.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faSave, faTrashAlt);

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
                <div className="workoutBlock">
                    <div className="sect1">
                        {/* NAME */}
                        <input
                            autoComplete="off"
                            name="name"
                            type="text"
                            className="form-control exerciseInput-md"
                            placeholder="Exercise"
                            onChange={this.handleInputChange}
                            value={this.state.name}
                        />
                        {/* WEIGHT */}
                        <input
                            autoComplete="off"
                            name="weight"
                            type="text"
                            className="form-control exerciseInput-sm"
                            placeholder="Lbs."
                            onChange={this.handleInputChange}
                            value={this.state.weight}
                        />
                        {/* SUPERSET ID */}
                        <input
                            autoComplete="off"
                            name="superset"
                            type="text"
                            className="form-control exerciseInput-md"
                            placeholder="Superset ID"
                            onChange={this.handleInputChange}
                            value={this.state.superset}
                        />
                    </div>
                    <div className="sect2">
                        {/* SETS */}
                        <input
                            autoComplete="off"
                            name="sets"
                            type="text"
                            className="form-control exerciseInput-sm"
                            placeholder="Sets"
                            onChange={this.handleInputChange}
                            value={this.state.sets}
                        />
                        {/* REPS */}
                        <input
                            autoComplete="off"
                            name="reps"
                            type="text"
                            className="form-control exerciseInput-md"
                            placeholder="Reps or Time"
                            onChange={this.handleInputChange}
                            value={this.state.reps}
                        />
                        {/* REST */}
                        <input
                            autoComplete="off"
                            name="rest"
                            type="text"
                            className="form-control exerciseInput-md"
                            placeholder="Rest (Min.)"
                            onChange={this.handleInputChange}
                            value={this.state.rest}
                        />
                    </div>
                    <div className="sect3">
                        {/* NOTES */}
                        <input
                            autoComplete="off"
                            name="notes"
                            type="text"
                            className="form-control exerciseInput-md"
                            placeholder="Notes"
                            onChange={this.handleInputChange}
                            value={this.state.notes}
                        />

                        {/* SAVE */}
                        <button
                            className="btn btn-success btn-sm exerciseBtn saveBtn"
                            onClick={this.sendExercise}
                        >
                            <FontAwesomeIcon className="fa-2x faSave" icon={faSave} />
                </button>
                        {/* DELETE */}
                        <button
                            className="btn btn-danger btn-sm exerciseBtn"
                            onClick={this.deleteExercise}
                        >
                            <FontAwesomeIcon className="fa-2x faTrashAlt" icon={faTrashAlt} />
                </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Exercise;