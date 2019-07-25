import React, { Component } from "react";
import "./setItem.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

library.add(faSave);

class SetItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openWeightModal: false,
            openRestModal: false,
            openNotesModal: false,
            id: null,
            name: null,
            actualReps: null,
            weight: "",
            rest: "",
            notes: "",
            saved: false,
        }
    }

    componentDidMount = () => {
        this.setState({
            id: this.props.id,
            name: this.props.name,
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        }, () => {
            this.unsave();
        });
    }

    saveData = () => {
        if (this.state.actualReps !== null) {
            this.props.setActualReps(this.state.id, this.state.name, this.state.actualReps);
        }

        if (this.state.weight !== null) {
            this.props.setWeight(this.state.id, this.state.name, this.state.weight);
        }

        if (this.state.rest !== null) {
            this.props.setRest(this.state.id, this.state.name, this.state.rest);
        }

        if (this.state.notes !== null) {
            this.props.setNotes(this.state.id, this.state.name, this.state.notes);
        }

        this.save();
    }

    save = () => {
        this.setState({
            saved: true,
        });
    }

    unsave = () => {
        this.setState({
            saved: false,
        });
    }

    render() {
        return (
            <div className={`setItem`}>
                <a
                    className="exName"
                    href={`https://www.youtube.com/results?search_query=how+to+do+${this.props.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {this.props.name}
                </a>

                <div className="exReps">
                    {this.props.reps}
                </div>

                <div className={`exActual saved-${this.state.saved}`}>
                    {/* ACTUAL REPS */}
                    <input
                        autoComplete="off"
                        name="actualReps"
                        type="text"
                        className="form-control actualData"
                        placeholder="Reps"
                        onChange={this.handleInputChange}
                        value={this.state.actualReps}
                    />
                    {/* WEIGHT */}
                    <input
                        autoComplete="off"
                        name="weight"
                        type="text"
                        className="form-control actualData"
                        placeholder="Lbs."
                        onChange={this.handleInputChange}
                        value={this.state.weight}
                    />
                    {/* REST */}
                    <input
                        autoComplete="off"
                        name="rest"
                        type="text"
                        className="form-control actualData"
                        placeholder="Rest"
                        onChange={this.handleInputChange}
                        value={this.state.rest}
                    />
                    {/* NOTES */}
                    <input
                        autoComplete="off"
                        name="notes"
                        type="text"
                        className="form-control actualData"
                        placeholder="Notes"
                        onChange={this.handleInputChange}
                        value={this.state.notes}
                    />
                    
                </div>
                {/* SAVE */}
                <button
                        className="btn btn-outline-success btn-sm saveSetBtn saveBtn"
                        onClick={this.saveData}
                    >
                        <FontAwesomeIcon className="fa-2x faSave" icon={faSave} />
                    </button>
            </div>
        )
    }
}

export default SetItem;