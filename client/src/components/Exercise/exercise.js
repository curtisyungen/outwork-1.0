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
            errorDetected: false,
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        }, () => {
            this.spellCheck(value);
        });
    }

    spellCheck = (value) => {

        let errorDetected = false;
        let mistakes = 
            [
                "psuh", "plul", "chni", 
                "pushup", "pullup", "chinup", 
                "pul-up", "pul up", "pus-up", "pus up", 
                "puh-up", "puh up", "chn-up", "chn up",
                "push pu", "pull pu", "chin pu",
                "push-pu", "pull-pu", "chin-pu",
                "psh-up", "psh up", "pll-up" ,"pll up",
                "chi-up", "chi up", "pushu", "pullu", "chinu", 
                "_", "--", "-_", "=",
            ];

        for (var m in mistakes) {
            if (value.toLowerCase().indexOf(mistakes[m]) > -1) {
                errorDetected = true;
            }
        }
        
        this.setState({
            errorDetected: errorDetected,
        });
    }

    deleteExercise = () => {
        this.props.deleteExercise(this.state.id);
    }

    updateParent = () => {
        this.props.setName(this.props.id, this.state.name);
        this.props.setWeight(this.props.id, this.state.weight);
        this.props.setSuperset(this.props.id, this.state.superset);
        this.props.setSets(this.props.id, this.state.sets);
        this.props.setReps(this.props.id, this.state.reps);
        this.props.setRest(this.props.id, this.state.rest);
        this.props.setNotes(this.props.id, this.state.notes);
        this.props.errorDetected(this.state.errorDetected);
    }

    render() {
        return (
            <div className={`input-group input-group-sm mb-1 saved-${this.state.saved} error-${this.state.errorDetected}`}>
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
                            onBlur={this.updateParent}
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
                            onBlur={this.updateParent}
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
                            onBlur={this.updateParent}
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
                            onBlur={this.updateParent}
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
                            onBlur={this.updateParent}
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
                            onBlur={this.updateParent}
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
                            onBlur={this.updateParent}
                            value={this.state.notes}
                        />
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